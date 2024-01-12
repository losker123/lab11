import React, { useState, useEffect } from 'react';
import '../styles/Questions.css'; 
import { useSelector, useDispatch } from 'react-redux';
import { setQuestions } from '../redux/actions.js'; 
import QuestionsData from '../pages/Questions.json'
const Questions = () => {
  const dispatch = useDispatch();
  const questionsData = useSelector((state) => state.questions.questions);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  useEffect(() => {
    dispatch(setQuestions(QuestionsData));
  }, [dispatch]);

  const handleQuestionClick = (index) => {
    if (selectedQuestion === index) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(index);
    }
  };

  return (
    <div className="questions-container">
      <h1>Вопросы</h1>
      <ul className="questions-list">
        {questionsData.map((question, index) => (
          <li key={index}>
            <button onClick={() => handleQuestionClick(index)}>
              {question.question}
            </button>
            {selectedQuestion === index && (
              <div className="answer">
                <p>{question.answer}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
