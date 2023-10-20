// SubscriptionDetail.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Card, CardBody, CardTitle, CardText, Button } from "reactstrap";
import { Baseurl } from "../url/BaseURL";
// import "./SubscriptionDetail.css"; // Import your custom CSS file

const SubscriptionDetail = () => {
  const [planDetail, setPlanDetail] = useState();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);

  const handleSubscriptionCreation = async () => {
    const token = localStorage.getItem("token");
    const userInfo = JSON.parse(localStorage.getItem('userData'));
    const user_id = userInfo.id;
  
    if (!token || !user_id) {
      console.error("Token or UserID not found in localStorage.");
      return;
    }
  
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/create/subscription/user',
        {
          user_id,
          subscription_id: id
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 200) {
        console.log('Subscription created successfully');
        // showModal('Subscription created successfully');
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
      // showModal('Error creating subscription. Please try again later.');
    }
  };
  

useEffect(() => {
  async function fetchSubscriptions() {
    const userInfo = JSON.parse(localStorage.getItem('userData'));
    const user_id = userInfo.id
    const token = localStorage.getItem("token");
    if (!token || !user_id) {
      console.error("Token or UserID not found in localStorage.");
      return;
    }

    try {
      const response = await axios.get(
        `${Baseurl}/subscriptionWithUser/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.data.user);
      setSubscriptions(response.data.data.subscriptions);
    } catch (error) {
      console.log(error);
    }
  }

  fetchSubscriptions();
}, []);


  async function getPlan() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage.");
      return;
    }
    try {
      const response = await axios.get(
        `${Baseurl}/subscription/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPlanDetail(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPlan();
  }, [id]);

  const handlePayment = async () => {

    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token not found in localStorage.");
        return;
    }

    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/create-payment-session',
            {
                amount: planDetail?.price,
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.status === 200 && response.data.checkoutUrl) {
            window.location.href = response.data.checkoutUrl; 
            handleSubscriptionCreation()
        } else {
            console.error('Failed to create a payment session');
        }

    } catch (error) {
        console.error('Error creating payment session:', error);
    }
};

  return (
    <Container>
      <center>  <h5 className="my-4">Subscription Details</h5></center>
      {planDetail && (
        <Card className="subscription-card">
          <CardBody>
            <CardTitle tag="h5" className="subscription-title">
              {planDetail.subscriptionName}
            </CardTitle>
            <CardText>
              <strong>Price:</strong> ${planDetail.price}
            </CardText>
            <CardText>
              <strong>Duration:</strong> {planDetail.slug} months
            </CardText>
            <CardText>
              <strong>Description:</strong> {planDetail.discription}
            </CardText>
            <CardText>
              <strong>Lifeline:</strong> {planDetail.lifeline} days
            </CardText>
            {subscriptions.some(sub => sub.subscription_id === planDetail.id) ? (
            <span className="fw-bold text-success">Current Subscription Running</span>
          ) : (
            <Button color="success" onClick={handlePayment}>
              <strong>Buy</strong>
            </Button>
          )}
          </CardBody>
        </Card>
      )}
    </Container>
  );
};

export default SubscriptionDetail;
