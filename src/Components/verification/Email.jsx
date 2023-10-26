import React, { useEffect, useState } from "react";
import { Button, Container, Input, Spinner } from "reactstrap";
import "./otp.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

const Email = ({ handleLogin }) => {
  const [inOtpMode, setInOtpMode] = useState(false);
  const [email, setemail] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [next_btn_mode, setnext_btn_mode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleemailChange = (e) => {
    setemail(e.target.value);
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.email) {
      setemail(location.state.email);
      console.log(location.state);
    }
  }, [location]);

  const handleOtpChange = (index, value) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
  };

  const handleSendOtpRequest = () => {
    setLoading(true);

    const payload = {
      type: "email",
      value: email,
    };

    axios
      .post("http://127.0.0.1:8000/api/send/otp", payload)
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage("OTP Sent Successfully!");
          setErrorMessage("");
          setInOtpMode(true);
        } else {
          throw new Error("Failed to send OTP");
        }
      })
      .catch((error) => {
        setErrorMessage("Failed to send OTP. Please try again.");
        setSuccessMessage("");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleVerifyOtpRequest = () => {
    const otp = otpValues.join("");

    const payload = {
      type: "email",
      email: email,
      otp: otp,
    };

    axios
      .post("http://127.0.0.1:8000/api/verify/otp", payload)
      .then((response) => {
        if (response.status === 200) {
          setSuccessMessage("Email verified successfully");
          setErrorMessage("");
          handleLogin(response.data.token, response.data.data.id);
        } else {
          throw new Error("Failed to verify OTP");
        }
      })
      .catch((error) => {
        setErrorMessage("Failed to verify OTP. Please try again.");
        setSuccessMessage("");
        console.error(error);
      });
  };

  const navigate = useNavigate();

  return (
    <Container>
      <center>
        <h1 className="otp-heading">Enter OTP</h1>
        {inOtpMode ? (
          <>
            <strong className="otp-description">
              We've sent a one-time password to your{" "}
              <span className="text-danger">Email</span>
            </strong>
            <div className="otp-input-container pt-5">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  className="otp-input"
                  type="number"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                />
              ))}
            </div>
            <Button
              className="otp-submit-button mt-5 mb-3"
              onClick={handleVerifyOtpRequest}
              color="success"
            >
              Verify
            </Button>
          </>
        ) : next_btn_mode ? (
          <Button onClick={() => navigate("/verifyemail")}>Verify Email Now</Button>
        ) : (
          <>
            <strong className="otp-description">Your Email</strong>
            <Input
              type="email"
              className="mt-4"
              value={email}
              onChange={handleemailChange}
            />
            {loading ? (
              <Spinner />
            ) : (
              <Button
                className="otp-submit-button mt-5 mb-3"
                color="primary"
                onClick={handleSendOtpRequest}
              >
                Send OTP
              </Button>
            )}
          </>
        )}

        <p className="resend-otp">Resend OTP</p>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </center>
    </Container>
  );
};

export default Email;
