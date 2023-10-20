import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { Baseurl } from "../url/BaseURL";

const Topic = () => {
  const [topics, settopics] = useState();
  const { id } = useParams();

  async function getTopic() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage.");
      return;
    }
    try {
      const response = await axios.get(
        `${Baseurl}/topics/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      settopics(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTopic();
  }, [id]);

  

  const navigate = useNavigate()

  function handleCases(id){
    navigate(`/cases/${id}`)
  }
  return (
    <Container>
      <h5>Select Topics</h5>
      <div className="d-flex flex-column">
        {topics?.map((topics) => (
          <Button color="info" className="mt-4" key={topics.id}  onClick={() => handleCases(topics.id)}>
            {topics.topic_name}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default Topic;
