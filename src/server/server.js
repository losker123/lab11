const express = require('express');
const cors = require('cors');

const sequelize = require("./db");

const { Installations, Reviews, Person, User } = require("./models");
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  // Проверка токена
  jwt.verify(token, '123', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = decoded;
    next();
  });
};
app.post('/reviews', authenticateUser, async (req, res) => {
  try {
    const { text, rating } = req.body;
    const newReview = await Reviews.create({ text, rating });
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/reviews', async (req, res) => {
  try {
    const allReviews = await Reviews.findAll();
    res.status(200).json(allReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/reviews/:id', async (req, res) => {
  try {
    const review = await Reviews.findByPk(req.params.id);
    if (!review) {
      res.status(404).json({ error: 'Review not found' });
    } else {
      res.status(200).json(review);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/reviews/:id', authenticateUser, async (req, res) => {
  try {
    const review = await Reviews.findByPk(req.params.id);
    if (!review) {
      res.status(404).json({ error: 'Review not found' });
    } else {
      const { text, rating } = req.body.newReview;
      await review.update({ text, rating });
      res.status(200).json(review);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/reviews/:id', authenticateUser, async (req, res) => {
  try {
    const review = await Reviews.findByPk(req.params.id);
    if (!review) {
      res.status(404).json({ error: 'Review not found' });
    } else {
      await review.destroy();
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/persons', async (req, res) => {
  try {
    const persons = await Person.findAll();
    res.json(persons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/persons/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const person = await Person.findByPk(id);
    if (person) {
      res.json(person);
    } else {
      res.status(404).json({ message: 'Person not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/persons', async (req, res) => {
  const { years_of_experience, full_name, contact_information, photo } = req.body;
  try {
    const newPerson = await Person.create({
      years_of_experience,
      full_name,
      contact_information,
      photo,
    });
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/persons/:id', async (req, res) => {
  const { id } = req.params;
  const { years_of_experience, full_name, contact_information, photo } = req.body.PersonId;
  try {
    const person = await Person.findByPk(id);
    if (person) {
      await person.update({
        years_of_experience,
        full_name,
        contact_information,
        photo,
      });
      res.json(person);
    } else {
      res.status(404).json({ message: 'Person not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/persons/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const person = await Person.findByPk(id);
    if (person) {
      await person.destroy();
      res.json({ message: 'Person deleted successfully' });
    } else {
      res.status(404).json({ message: 'Person not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/installations', async (req, res) => {
  try {
    const installations = await Installations.findAll({
      include: [{ model: Person }],
    });
    res.json(installations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/installations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const installation = await Installations.findByPk(id);
    if (installation) {
      res.json(installation);
    } else {
      res.status(404).json({ message: 'Installation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/installations', async (req, res) => {
  const { operation_type, system_type, date_time, address } = req.body.newInstallation;
  const { PersonId } = req.body;
  try {
    const newInstallation = await Installations.create({
      operation_type,
      system_type,
      date_time,
      address,
      PersonId
    });
    res.status(201).json(newInstallation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/installations/:id', async (req, res) => {
  const { id } = req.params;
  const { operation_type, system_type, date_time, address } = req.body.editedInstallation;
  console.log(operation_type);
  try {
    const installation = await Installations.findByPk(id);
    if (installation) {
      await installation.update({
        operation_type,
        system_type,
        date_time,
        address,
      });
      res.json(installation);
    } else {
      res.status(404).json({ message: 'Installation not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.get("/userProfile", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, "123");

    const user = await User.findOne({ where: { id: decodedToken.userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.delete('/installations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const installation = await Installations.findByPk(id);
    if (installation) {
      await installation.destroy();
      res.json({ message: 'Installation deleted successfully' });
    } else {
      res.status(404).json({ message: 'Installation not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    const token = jwt.sign({ userId: user.id, name: user.name, email: user.email }, '123', { expiresIn: '1h' });

    if (user && user.password === password) {
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single user by ID

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, bio, location, password } = req.body.User;
  console.log(password);
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.update({
        name, bio, email, password, location
      });
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/changepassword", async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, "123");

    const user = await User.findOne({ where: { id: decodedToken.userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (currentPassword !== user.password) {
      return res.status(401).json({ error: "Invalid current password." });
    }

    await User.update(
      { password: newPassword },
      { where: { id: decodedToken.userId } }
    );

    res.json({ message: "Password changed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};


start();


