import axios from "axios";
import { ChevronRightCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Container, Row } from "reactstrap";
import "./subscription.css"; 
import { Baseurl } from "../url/BaseURL";

const SubscriptionPlan = () => {
  const [plans, setPlans] = useState([]);

  async function getAllplans() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage.");
      return;
    }
    try {
      const response = await axios.get(
        `${Baseurl}/get/subscriptions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Filter plans with status 1
      const filteredplans = response.data.data.filter(
        (plan) => plan.status === 1
      );

      setPlans(filteredplans);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllplans();
  }, []);

  const navigate = useNavigate();
  function handleDetailPlan(id) {
    navigate(`/subscriptionDetail/${id}`);
  }

  return (
    <Container>
      <center>
        <h5 className="mb-5">Subscription Plans</h5>
      </center>
      <Row>
        {plans.map((plan) => (
          <Col lg="3" key={plan.id}>
            <Card className="custom-card my-2">
              <CardHeader className="custom-card-header">
                {plan.subscriptionName}
              </CardHeader>
              <CardBody className="custom-card-body">
                <CardTitle tag="h5">Price: ${plan.price}</CardTitle>
                <CardText className="custom-card-text">
                  Duration: {plan.slug} days
                </CardText>
                <CardText className="custom-card-text">
                  Lifeline: {plan.lifeline} days
                </CardText>
                <CardText className="custom-card-text">
                  Details: {plan.discription}
                </CardText>
                <Button
                color="success"
                  onClick={() => handleDetailPlan(plan.id)}
                  className="custom-button"
                >
                  <ChevronRightCircle /> View Details
                </Button>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SubscriptionPlan;
