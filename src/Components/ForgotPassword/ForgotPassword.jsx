import React, { useEffect, useState } from "react";
import { Button, Container, Input } from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [inOtpMode, setInOtpMode] = useState(false);
  const [inPasswordMode, setInPasswordMode] = useState(false);
  const [email, setEmail] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleOtpChange = (index, value) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
    
    // Check if all OTP fields are filled
    if (!newOtpValues.includes("")) {
      setInPasswordMode(true);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSendOtpRequest = () => {
    const payload = {
      email: email,
    };

    fetch("http://127.0.0.1:8000/api/reset/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
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
      });
  };

  const navigate = useNavigate()
  const handleVerifyOtpRequest = () => {
    const otp = otpValues.join("");
    const payload = {
      email: email,
      otp: otp,
      password: password
    };

    fetch("http://127.0.0.1:8000/api/set/password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage("Email verified successfully");
          setErrorMessage("");
        navigate("/login")
        } else {
          throw  Error("Failed to verify OTP");
        }
      })
      .catch((error) => {
        setErrorMessage("Failed to verify OTP. Please try again.");
        setSuccessMessage("");
        console.error(error);
      });
  };



  return (
    <Container>
      <center>
        <h1 className="otp-heading">Reset Password</h1>
        {inOtpMode ? (
          <>
            <strong className="otp-description">
              We've sent a one-time password to your Email
              <span className="text-danger">phone</span>
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
            {inPasswordMode ? (
              <>
                <Input
                  type="password"
                  className="mt-4"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter your new password"
                />
                <Button
                  className="otp-submit-button mt-5 mb-3"
                  onClick={handleVerifyOtpRequest}
                >
                  Change Password
                </Button>
              </>
            ) : null}
          </>
        ) : (
          <>
            <strong className="otp-description">
              <h1 className="otp-heading">Your Email</h1>
            </strong>
            <Input
              type="email"
              className="mt-4"
              value={email}
              onChange={handleEmailChange}
            />
            <Button
              className="otp-submit-button mt-5 mb-3"
              onClick={handleSendOtpRequest}
            >
              Send OTP
            </Button>
          </>
        )}
        <p className="resend-otp">Resend OTP</p>
        {successMessage && (
          <p className="success-message">{successMessage}</p>
        )}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </center>
    </Container>
  );
};

export default ForgotPassword;
