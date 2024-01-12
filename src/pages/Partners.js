import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setPartners } from '../redux/actions.js'; 
import partnersData from '../pages/Partners.json';

const PartnersCertificatesPage = () => {
  const dispatch = useDispatch();
  const partners = useSelector((state) => state.partners.partners);

  useEffect(() => {
    dispatch(setPartners(partnersData));
  }, [dispatch]);

  const certificates = [
    'https://vipaks.com/upload/resize_cache/iblock/381/ue38yqmu7ohjwjb4mcuf9ond9a8d23b1/1024_1024_0e403ea1332f4abb5c1f4e8b1f6bf4f36/SOKOL_IP_Svidetelstvo_na_tovarnyy_znak.jpg',
    'https://vipaks.com/upload/resize_cache/iblock/c9d/m0zrnxzu1yd399948dnl818285l12h3l/1024_1024_0e403ea1332f4abb5c1f4e8b1f6bf4f36/Sertifikat_ISO_9001.png',
  ];


  return (
    <Container className="mt-4">
      <h1>Наши партнеры</h1>
      <Row>
        {partners.map((partner) => (
          <Col key={partner.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Image src={partner.logo} alt={partner.name} fluid style={{ height: '150px', objectFit: 'contain' }}/>
                <Card.Title className="mt-3">{partner.name}</Card.Title>
                <Card.Text>{partner.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h1 className="mt-5">Сертификаты</h1>
      <Row>
        {certificates.map((certificate, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>Сертификат {index + 1}</Card.Title>
                <Card.Text>
                  <a href={certificate} target="_blank" rel="noreferrer">
                    Посмотреть сертификат
                  </a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PartnersCertificatesPage;
