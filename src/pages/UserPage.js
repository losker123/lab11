import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Image, Card, Form, Button,Modal  } from 'react-bootstrap';
import axios from 'axios';


const UserProfile = () => {

  const [User, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [tempImage, setTempImage] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const token = localStorage.getItem("token");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:5000/userProfile", {
          headers: {
            Authorization: token,
          },
        });
      
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const user = await response.json();
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...User, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };
  const handlePasswordChange = () => {
    
    setShowPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    
    setShowPasswordModal(false);
  };
  const handleConfirmPasswordChange = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/changepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          currentPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to change password");
      }

      setShowPasswordModal(false);
      localStorage.setItem("userData", JSON.stringify(User));
    } catch (error) {
      console.error(error);
    }
  };
  // const handleConfirmPasswordChange = async () => {
  //   console.log(User);
    
  //   if(oldPassword==User.password){
  //     User.password = newPassword;
  //     console.log(User.password);
  //     const response = await fetch(
  //       `http://localhost:5000/users/${User.id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `${token}`,
  //         },
  //         body: JSON.stringify({ User }),
  //       }
  //     );
  
  //     if (!response.ok) {
  //       throw new Error("Failed to update user data");
  //     }
  //   }
  //   else{
  //     alert("Введите правильно старый пароль");
  //   }
  //   setShowPasswordModal(false);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem("token");
      console.log(User);
      const response = await fetch(
        `http://localhost:5000/users/${User.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ User }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
  
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Container>
      <Row className="mt-5">
        <Col md={8}>
          <Card>
            <Card.Body>
              {!isEditing ? (
                <>
                  <Card.Title>
                    <h2>{User.name}</h2>
                  </Card.Title>
                  <Card.Text>{User.bio}</Card.Text>
                  <Card.Text>Email: {User.email}</Card.Text>
                  <Card.Text>Местоположение: {User.location}</Card.Text>
                  <Button variant="primary" onClick={handleEdit}>
                    Изменить
                  </Button>
                  <Button variant="secondary" onClick={handlePasswordChange}>
                    Изменить пароль
                  </Button>
                </>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="formName">
                    <Form.Label>Имя</Form.Label>
                    <Form.Control type="text" placeholder="Введите имя" name="name" value={User.name} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="formBio">
                    <Form.Label>Описание</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Введите описание" name="bio" value={User.bio} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Введите email" name="email" value={User.email} onChange={handleChange} />
                  </Form.Group>
                  <Form.Group controlId="formLocation">
                    <Form.Label>Местоположение</Form.Label>
                    <Form.Control type="text" placeholder="Введите местоположение" name="location" value={User.location} onChange={handleChange} />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Сохранить изменения
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

     <Modal show={showPasswordModal} onHide={handleClosePasswordModal}>
        <Modal.Header closeButton>
          <Modal.Title>Изменить пароль</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formOldPasswordModal">
            <Form.Label>Старый пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите старый пароль"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formNewPasswordModal">
            <Form.Label>Новый пароль</Form.Label>
            <Form.Control
              type="password"
              placeholder="Введите новый пароль"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePasswordModal}>
            Отмена
          </Button>
          <Button variant="primary" onClick={handleConfirmPasswordChange}>
            Сохранить
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserProfile;
