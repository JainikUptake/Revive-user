import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import logo from "../assets/logo1024.png";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Baseurl } from '../url/BaseURL';
import "../Signup/signup.css"
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
      console.log(response,"from login")
      if (response.status === 200) {
        setSuccessMessage('Login successful');
        setError('');
        // Pass the token to handleLogin
        handleLogin(response.data.token,response.data.data.id);
      }
    } catch (err) {
      setError('Login failed. Please check your input.');
    }
  };

const navigate = useNavigate()
function navigateForgotPassword(){
  navigate(`/forgotpassword`, { state: { email: formData.email } });
}

  return (
    <Container>
      <Row className="mt-5">
        <Col sm="6">
          <div className="d-flex flex-column justify-content-center align-items-center mt-5">
            <img src={logo} alt="Logo" className="logo" />
            <h2 className="font-weight-bold">Steth Up</h2>
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
                  hidden
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
            <p className='mt-3'>
              <NavLink to="/loginOTP">Login with OTP</NavLink>
            </p>
            <p>
              Don't have an account? <NavLink to="/">Sign up</NavLink>
            </p>
            <p>
              <span  onClick={navigateForgotPassword}>Forgot Password?</span>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
