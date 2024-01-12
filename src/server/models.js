const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Reviews = sequelize.define("Reviews", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
});
const Person = sequelize.define('Person', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  years_of_experience: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_information: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: false,
});

const Installations = sequelize.define('Installations', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  operation_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  system_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_time: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  bio: {
    type: DataTypes.TEXT,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  location: {
    type: DataTypes.STRING,
  },
});
Installations.belongsTo(Person, { onDelete: 'CASCADE' });
Person.hasMany(Installations, { onDelete: 'CASCADE' });
module.exports = { Reviews, Person, Installations,User};