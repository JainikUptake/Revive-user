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
import "./signup.css";
import logo from "../assets/logo1024.png";
import { NavLink } from "react-router-dom";
import { Baseurl } from "../url/BaseURL";

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
    state: "",
    city: "",
    name_of_college: "",
    current_year: "",
    perparing_for: "",
    interested_field: "",
    birth_date: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation (you can add more checks)
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      // Make a POST request to the registration API
      const response = await axios.post(
        `${Baseurl}/register`,
        formData
      );

      // Handle the API response
      if (response.status === 200) {
        setSuccessMessage("Registration successful");
        setError("");
      }
    } catch (err) {
      setError("Registration failed. Please check your input.");
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
            <h2>Registration</h2>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="First Name"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Last Name"
                  onChange={handleChange}
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
              <FormGroup>
                <Input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="state"
                  id="state"
                  onChange={handleChange}
                >
                  <option selected>Select State</option>
                  <option value="1">Gujarat</option>
                  <option value="2">Punjab</option>
                </select>
              </FormGroup>
              <FormGroup>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  name="city"
                  id="city"
                  onChange={handleChange}
                >
                  <option selected>Select City</option>
                  <option value="1">Abohar</option>
                  <option value="27">Amritsar</option>
                  <option value="8">Ahmedabad</option>
                  <option value="393">Rajkot</option>
                  <option value="450">Surat</option>
                </select>
              </FormGroup>
              <FormGroup>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={handleChange}
                  name="name_of_college"
                  id="name_of_college"
                >
                  <option selected>name_of_college</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </FormGroup>
              <FormGroup>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={handleChange}
                  name="current_year"
                  id="current_year"
                >
                  <option selected>Select Current Year</option>
                  <option value="1st year">1st year </option>
                  <option value="2nd year">2nd year </option>
                  <option value="3rd year">3rd year </option>
                  <option value="final Year">final Year </option>
                  <option value="intern">intern</option>
                  <option value="post inter">post inter</option>
                </select>
              </FormGroup>
              <FormGroup>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={handleChange}
                  name="perparing_for"
                  id="perparing_for"
                >
                  <option selected>Select Preparing For</option>
                  <option value="NEET/NEXT">NEET/NEXT </option>
                  <option value="FMGE">FMGE </option>
                  <option value="USMLE">USMLE </option>
                  <option value="PLAB">PLAB </option>
                  <option value="other">other</option>
                </select>
              </FormGroup>
              <FormGroup>
              <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={handleChange}
                  name="interested_field"
                  id="interested_field"
                >
                  <option selected>Select interested_field</option>
                  <option value="Anatomy">Anatomy</option>
                  <option value="Physiology">Physiology </option>
                  <option value="Biochemistry">Biochemistry </option>
                  <option value="Microbiology">Microbiology </option>
                </select>
              
              </FormGroup>
              <FormGroup>
                <Input
                  type="date"
                  name="birth_date"
                  id="birth_date"
                  placeholder="Birth Date"
                  onChange={handleChange}
                />
              </FormGroup>
              <Button color="primary" type="submit" className="submit-button">
                Register
              </Button>
            </Form>

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

export default Signup;
