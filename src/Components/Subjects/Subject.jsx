import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { Baseurl } from "../url/BaseURL";

const Subject = () => {
  const [subjects, setSubjects] = useState([]);

  async function getAllSubjects() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage.");
      return;
    }
    try {
      const response = await axios.get(`${Baseurl}/subjects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Filter subjects with status 1
      const filteredSubjects = response.data.data.filter(
        (subject) => subject.status === 1
      );

      setSubjects(filteredSubjects);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllSubjects();
  }, []);

  const navigate = useNavigate();
  function handleTopics(id) {
    navigate(`/topic/${id}`);
  }

  return (
    <Container>
      <center><h3>Select Subject</h3></center>
      <div className="d-flex flex-column">
        {subjects.map((subject) => (
          <Button
            color="primary"
            onClick={() => handleTopics(subject.id)}
            className="mt-4"
            key={subject.id}
          >
            {subject.subject_name}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default Subject;
