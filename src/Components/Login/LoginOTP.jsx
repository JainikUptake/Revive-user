import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import logo from "../assets/logo1024.png";
import { NavLink } from "react-router-dom";
import { Baseurl } from "../url/BaseURL";

const LoginOTP = ({ handleLogin }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Baseurl}/login`, {
        login_type: "phone",
        phone: phone,
      });

      if (response.status === 200) {
        setOtpSent(true);
        setError("");
      }
    } catch (err) {
      setError("Failed to send OTP. Please check your phone number.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${Baseurl}/login`, {
        login_type: "phone",
        phone: phone,
        otp: otp,
      });

      if (response.status === 200) {
        setSuccessMessage("Login successful");
        setError("");
        handleLogin(response.data.token,response.data.data);
      }
    } catch (err) {
      setError("OTP verification failed. Please check the OTP.");
    }
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col sm="6">
          <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <img src={logo} alt="Logo" className="logo" />
          </div>
        </Col>
        <Col sm="6" className="registration-form-container">
          <div className="registration-form-inner">
            <h2>Login With OTP</h2>

            {otpSent ? (
              <Form onSubmit={handleVerifyOtp}>
                <FormGroup>
                  <Input
                    type="text"
                    name="otp"
                    id="otp"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                  />
                </FormGroup>
                <Button
                  color="primary"
                  type="submit"
                  className="submit-button"
                >
                  Verify OTP
                </Button>
              </Form>
            ) : (
              <Form onSubmit={handleSendOtp}>
                <FormGroup>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </FormGroup>
                <Button
                  color="primary"
                  type="submit"
                  className="submit-button"
                >
                  Send OTP
                </Button>
              </Form>
            )}

            {error && <p className="error-message">{error}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            <p>
              Already have an account? <NavLink to="/login">Login</NavLink>
            </p>
            <p>
              <a href="/forgot-password">Forgot Password?</a>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginOTP;
