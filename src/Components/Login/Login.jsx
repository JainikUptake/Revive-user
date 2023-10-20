import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import logo from "../assets/logo1024.png";
import { NavLink } from 'react-router-dom';
import { Baseurl } from '../url/BaseURL';

const Login = ({ handleLogin }) => {

  const [formData, setFormData] = useState({
    login_type: 'email', 
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${Baseurl}/login`, formData);
  
      if (response.status === 200) {
        setSuccessMessage('Login successful');
        setError('');
        // Pass the token to handleLogin
        handleLogin(response.data.token,response.data.data);
      }
    } catch (err) {
      setError('Login failed. Please check your input.');
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
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  name="login_type"
                  id="login_type"
                  value="email"
                  hidden // Hidden field with default value 'email'
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </FormGroup>

              <Button color="primary" type="submit" className="submit-button">
                Login
              </Button>
            </Form>
            {error && <p className="error-message">{error}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
            <p>
              <NavLink to="/loginOTP">Login with OTP</NavLink>
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

export default Login;
