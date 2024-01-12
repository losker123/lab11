import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Badge, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setReviews } from '../redux/actions';
import reviewsData from '../pages/Reviews.json';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ReviewsListPage = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetchData();
  }, []);

  const [isAddingReview, setIsAddingReview] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(1);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editedReviewText, setEditedReviewText] = useState('');
  const [editedReviewRating, setEditedReviewRating] = useState(1);
  const [nextId, setNextId] = useState(4);
  const handleDelete = async (id) => {
    if (id) {
      const response = await axios(
        `http://localhost:5000/reviews/${id}`,
        {
          method: "DELETE",
          headers:{
            'Authorization': `${token}`,
          }
        }
      );
      dispatch({ type: "DELETE_EMPLOYEE", payload: id });
    }
    const updatedReviews = reviews.filter((review) => review.id !== id);
    dispatch(setReviews(updatedReviews));
  };
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/reviews");
      const jsonData = await response.json();
      dispatch(setReviews(jsonData));
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };
  const handleEdit = async (id) => {

    const reviewToEdit = reviews.find((review) => review.id === id);

    setEditingReviewId(id);
    setEditedReviewText(reviewToEdit.text);
    setEditedReviewRating(reviewToEdit.rating);

  };

  const handleUpdate = async () => {
    if (editingReviewId) {
      const newReview = { text: editedReviewText, rating: editedReviewRating };
      const response = await axios(
        `http://localhost:5000/reviews/${editingReviewId}`,
        {
          method: "PUT",  
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${token}`,
          },
          body: JSON.stringify({ newReview }),
        }
      )
    };
    const updatedReviews = reviews.map((review) => {
      if (review.id === editingReviewId) {
        return {
          ...review,
          text: editedReviewText,
          rating: editedReviewRating,
        };
      }
      return review;
    });

    dispatch(setReviews(updatedReviews));
    setEditingReviewId(null);
    setEditedReviewText('');
    setEditedReviewRating(1);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditedReviewText('');
    setEditedReviewRating(1);
  };

  const handleAddReview = () => {
    setIsAddingReview(true);
  };

  const handleSaveReview = async () => {
    const newReview = {
      id: nextId,
      text: newReviewText,
      rating: newReviewRating,
    };

    const response = await axios("http://127.0.0.1:5000/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${token}`
      },
      body: JSON.stringify(newReview),
    });
    setReviews([...reviews, newReview]);
    setNextId(nextId + 1);
    setNewReviewText('');
    setNewReviewRating(1);
    setIsAddingReview(false);
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Отзывы о системе</h2>
      <ListGroup>
        {reviews.map((review) => (
          <ListGroup.Item key={review.id} className="mb-3">
            {editingReviewId === review.id ? (
              <div>
                <Form.Group className="mb-3" controlId="editedReviewText">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editedReviewText}
                    onChange={(e) => setEditedReviewText(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="editedReviewRating">
                  <Form.Control
                    as="select"
                    value={editedReviewRating}
                    onChange={(e) => setEditedReviewRating(parseInt(e.target.value))}
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleUpdate}>
                  Сохранить
                </Button>
                <Button variant="secondary" onClick={handleCancelEdit} className="ms-2">
                  Отменить
                </Button>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <div>

                  <p>{review.text}</p>
                  <Badge bg="info">Оценка: {review.rating}/5</Badge>
                </div>
                <div>
                  <Button variant="warning" onClick={() => handleEdit(review.id)}>
                    Изменить
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(review.id)} className="ms-2">
                    Удалить
                  </Button>
                </div>
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {!isAddingReview ? (
        <Button variant="primary" onClick={handleAddReview} className="mt-3">
          Добавить отзыв
        </Button>
      ) : (
        <div className="mt-3">
          <h3>Добавить новый отзыв</h3>
          <Form>
            <Form.Group className="mb-3" controlId="newReviewText">
              <Form.Control
                as="textarea"
                rows={3}
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="newReviewRating">
              <Form.Control
                as="select"
                value={newReviewRating}
                onChange={(e) => setNewReviewRating(parseInt(e.target.value))}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleSaveReview}>
              Сохранить отзыв
            </Button>
            <Button variant="secondary" onClick={() => setIsAddingReview(false)} className="ms-2">
              Отменить
            </Button>
          </Form>
          
        </div>
        
      )}
      <ToastContainer></ToastContainer>
    </Container>
  );
};

export default ReviewsListPage;
