import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import axios from "axios";
import { Baseurl } from "../url/BaseURL";

const FeedBack = () => {
  const [username, setUsername] = useState("");
  const [feedback, setFeedback] = useState("");
  const [modal, setModal] = useState(false);
  const userData = localStorage.getItem("userData");
  const token = localStorage.getItem("token");


  async function getUser() {
    if (!token) {
      console.error("Token not found in localStorage.");
      return;
    }

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/get/user/${userData}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response?.status === 200) {
        setUsername(response?.data?.data[0].first_name + " " + response?.data?.data[0].last_name);
      }else{
        setUsername("failed to fetch username")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);




  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage.");
        return;
      }

      const response = await axios.post(
        `${Baseurl}/feedback`,
        {
          user_name: username,
          message: feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toggleModal();
        setFeedback("");
      }
    } catch (err) {
      console.error("Feedback submission failed.", err);
    }
  };

  return (
    <Container>
      <center>
        <Label for="exampleText" size="lg">
          Feedback
        </Label>
      </center>
      <FormGroup>
        <Label for="exampleText">Username : {username}</Label>
        <Input
          id="exampleText"
          name="text"
          type="textarea"
          onChange={(e) => setFeedback(e.target.value)}
          value={feedback}
        />
      </FormGroup>
      <Button color="success" onClick={handleSubmit}>
        Submit
      </Button>

      {/* Success Modal */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Feedback Submitted</ModalHeader>
        <ModalBody>Your feedback has been successfully submitted.</ModalBody>
      </Modal>
    </Container>
  );
};

export default FeedBack;
