import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import "./setting.css";
import { Settings } from "lucide-react";

const Setting = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <center>
        <h2>
          Settings
          <Settings />
        </h2>
      </center>
      <div className="d-flex flex-column">
        <Button
          className="mt-4"
          size="lg"
          color="primary"
          onClick={() => navigate("/settings/about")}
        >
          About
        </Button>
        <Button
          className="mt-4"
          size="lg"
          color="info"
          onClick={() => navigate("/settings/contact")}
        >
          Contact
        </Button>
        <Button
          className="mt-4"
          size="lg"
          color="warning"
          onClick={() => navigate("/settings/privacypolicy")}
        >
          Privacy Policy
        </Button>
        <Button
          className="mt-4"
          size="lg"
          color="dark"
          onClick={() => navigate("/settings/faq")}
        >
          Faq
        </Button>
        <Button
          className="mt-4"
          size="lg"
          color="danger"
          onClick={() => navigate("/settings/feedback")}
        >
          FeedBack
        </Button>
      </div>
    </Container>
  );
};

export default Setting;
