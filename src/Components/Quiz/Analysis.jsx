import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { Baseurl } from "../url/BaseURL";

const Analysis = () => {
  const [analysisData, setAnalysisData] = useState([]);
  const { id } = useParams();

  async function getAnalysis() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage.");
      return;
    }
    try {
      const response = await axios.get(`${Baseurl}/quiz/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAnalysisData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAnalysis();
  }, [id]);

  const navigate = useNavigate();

  function handleMain() {
    navigate(`/home`);
  }

  return (
    <Container>
      <center>
        <h2 className="fw-bold">Analysis</h2>
      </center>
      <div className="d-flex flex-column">
        {analysisData.map((analysis, index) => (
          <div key={analysis.id}>
            <h4 className="fw-bold">
              {index + 1}. {analysis.question}
            </h4>
            {analysis.options.map((answer) => (
              <p
                key={answer.answer}
                style={answer.correct_ans === 1 ? { background: "green" } : {}}
              >
                {answer.answer}
              </p>
            ))}
            <p className="mt-4">
              <span className="fw-bold">Analysis : </span>
              {analysis.analysis}
            </p>
            <hr />
          </div>
        ))}
        <Button color="primary" onClick={handleMain}>
          Back to main{" "}
        </Button>
      </div>
    </Container>
  );
};

export default Analysis;
