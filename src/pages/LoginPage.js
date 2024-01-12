import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setUsers, clearUser } from '../redux/actions';
const LoginPage = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');



  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const handleAction = async () => {
    
    if (isLogin) {
        const response = await fetch('http://127.0.0.1:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          dispatch(setUsers(name, email,bio,location));
          window.location.reload();
        } else {
          alert('Please enter the correct username or password');
        }
    } else {
      
      if (name.trim() === '' || !isValidEmail(email) || password.trim() === '' || bio.trim() === '' || location.trim() === '') {
       

        alert('Please fill in all fields with valid data');
      } else {
        setIsLogin(true);
        const newLogin = {name,bio,email,password,location};
        const response = await fetch("http://127.0.0.1:5000/users", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(newLogin),
    });
    };

      
      
    }
  };

  const toggleView = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2 className="mb-4">{isLogin ? 'Login' : 'Register'}</h2>
          <Form>
            {!isLogin && (
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-3"
                />
              </Form.Group>
            )}
            {!isLogin && (
              <>
                <Form.Group controlId="formBasicBio">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="mb-3"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mb-3"
                  />
                </Form.Group>
              </>
            )}
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-3"
              />
            </Form.Group>

            

            <Button variant="primary" onClick={handleAction} className="mr-2">
              {isLogin ? 'Login' : 'Register'}
            </Button>
            <Button variant="secondary" onClick={toggleView}>
              {isLogin ? 'Register' : 'Login'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
