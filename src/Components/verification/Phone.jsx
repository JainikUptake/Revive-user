import React, { useEffect, useState } from "react";
import { Button, Container, Input } from "reactstrap";
import "./otp.css";
import { useLocation, useNavigate } from "react-router-dom";

const Phone = () => {
  const [inOtpMode, setInOtpMode] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [next_btn_mode, setnext_btn_mode] = useState(false);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const location = useLocation();

 

  useEffect(() => {
    if (location.state && location.state.phone) {
      console.log(location.state)
      setPhoneNumber(location.state.phone);
    }
  }, [location]);

  const handleOtpChange = (index, value) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);
  };

  const handleSendOtpRequest = () => {
    const payload = {
      type: "phone",
      value: phoneNumber,
    };

    fetch("http://127.0.0.1:8000/api/send/otp", {
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

  const handleVerifyOtpRequest = () => {
    // Combine the OTP values to create the complete OTP
    const otp = otpValues.join("");

    // Define the request payload
    const payload = {
      type: "phone",
      phone: phoneNumber,
      otp: otp,
    };

    fetch("http://127.0.0.1:8000/api/verify/otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage("Otp verified successfully");
          setErrorMessage("");
          setInOtpMode(false)
          setnext_btn_mode(true)
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

  function navigateEmail() {
    navigate(`/verifyemail`, { state: { email: location?.state?.email } });
  }
  return (
    <Container>
      <center>
        <h1 className="otp-heading">Enter OTP</h1>
        {inOtpMode ? (
          <>
            <strong className="otp-description">
              We've sent a one-time password to your Phone
              <span className="text-danger">phone</span>
            </strong>
            <div className="otp-input-container pt-5">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  className="otp-input"
                  type="text"
                  maxLength="1"
                  value={value}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                />
              ))}
            </div>
            <Button
              className="otp-submit-button mt-5 mb-3"
              onClick={handleVerifyOtpRequest}
            >
              Verify
            </Button>
          </>
        ) : next_btn_mode ? (
          <Button onClick={navigateEmail} >Verify Email Now</Button>
        ) : (
          <>
            <strong className="otp-description">
              Enter your phone number:
            </strong>
            <Input
              type="number"
              className="mt-4"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
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
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </center>
    </Container>
  );
};

export default Phone;
