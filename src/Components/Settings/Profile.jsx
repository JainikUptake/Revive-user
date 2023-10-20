import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

const Profile = () => {
  const token = localStorage.getItem("token");
  const user_id = localStorage.getItem("userData");
  const [userInfo, setUserInfo] = useState();

  async function getUser() {
    if (!token) {
      console.error("Token not found in localStorage.");
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/get/user/${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserInfo(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container>
      <center>
        <h4>Profile</h4>
        <hr />
      </center>
      {userInfo && (
        <Row>
          <Col md="6">
            <h6>
              <strong>Name:</strong> {userInfo[0]?.first_name} {userInfo[0]?.last_name}
            </h6>
            <h6>
              <strong>Email:</strong> {userInfo[0]?.email}
            </h6>
            <h6>
              <strong>Phone:</strong> {userInfo[0]?.phone}
            </h6>
            <h6>
              <strong>State:</strong> {userInfo[0]?.state}
            </h6>
            <h6>
              <strong>City:</strong> {userInfo[0]?.city}
            </h6>
          </Col>
          <Col md="6">
            <h6>
              <strong>Birth Date:</strong> {userInfo[0]?.birth_date}
            </h6>
            <h6>
              <strong>Current Year:</strong> {userInfo[0]?.current_year}
            </h6>
            <h6>
              <strong>Preparing For:</strong> {userInfo[0]?.perparing_for}
            </h6>
            <h6>
              <strong>Interested Field:</strong> {userInfo[0]?.interested_field}
            </h6>
            <h6>
              <strong>Lifeline:</strong> {userInfo[0]?.lifeline}
            </h6>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Profile;
