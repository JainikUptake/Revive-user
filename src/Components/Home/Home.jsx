import React from 'react';
import {
    Button,
    Container,
    Col,
    Row,
  } from 'reactstrap';
import { BarChart3, CalendarCheck2, Flame, PlayCircle, Settings } from 'lucide-react';
import "./home.css"
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()
   return (
    <>
      {/* Body */}
      <Container fluid>
        <Row>
          <Col md="4" className="mb-4">
            <div className='d-flex flex-column justify-content-center align-items-center'>
           <CalendarCheck2 size={60}  color='skyblue'/>
            <Button color="info" block className="custom-button mt-2" size='lg' onClick={() =>  navigate("/subscriptionPlan")}>
              Subscription
            </Button>
            </div>
          </Col>
          <Col md="4" className="mb-4">
          <div className='d-flex flex-column justify-content-center align-items-center'>
          <BarChart3 size={60} color='blue'/>
            <Button color="primary" block className="custom-button mt-2" size='lg'  onClick={ () => navigate(`/statistics`)}>
              Statistics
            </Button>
            </div>
          </Col>
          <Col md="4" className="mb-4">
          <div className='d-flex flex-column justify-content-center align-items-center'>
          <PlayCircle size={60} color='green'/>
            <Button color="success" block className="custom-button mt-2" size='lg' onClick={ () => navigate("/subject")}>
              Play
            </Button>
            </div>
          </Col>
          <Col md="4" className="mb-4">
          <div className='d-flex flex-column justify-content-center align-items-center'>
          <Settings size={60}  color='orange'/>
            <Button color="warning" block className="custom-button mt-2" size='lg' onClick={() => navigate("/settings")}>
              Settings
            </Button>
            </div>
          </Col>
          <Col md="4" className="mb-4">
          <div className='d-flex flex-column justify-content-center align-items-center'>
          <Flame size={60} color='red'/>
            <Button color="danger" block className="custom-button mt-2" size='lg' onClick={() => navigate("/streak")}>
              Streaks
            </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
