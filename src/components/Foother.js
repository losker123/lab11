import React from 'react';
import '../styles/Foother.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-media">
          <h3>Мы в социальных сетях:</h3>
          <ul>
            <li><a href="https://www.facebook.com/example/">Facebook</a></li>
            <li><a href="https://www.twitter.com/example/">Twitter</a></li>
            <li><a href="https://www.instagram.com/example/">Instagram</a></li>
          </ul>
        </div>
        <div className="contact-info">
          <h3>Контактная информация:</h3>
          <p>Телефон: +375445751423</p>
          <p>Email: example@example.com</p>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2024 IsakSystem. Все права защищены.</p>
      </div>
    </footer>
  );
}

export default Footer;
