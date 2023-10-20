import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Container } from "reactstrap";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Baseurl } from "../url/BaseURL";

const Statistics = () => {
  const [statisticsData, setStatisticsData] = useState(null);
  const token = localStorage.getItem("token");

  const userData = JSON.parse(localStorage.getItem("userData"));
  const id = userData.id;

  useEffect(() => {
    axios
      .get(`${Baseurl}/statistics/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setStatisticsData(data);
      })
      .catch((error) => {
        console.error("Error fetching statistics: ", error);
      });
  }, []);

  // Define custom colors for the pie chart blocks
  const COLORS = ["green", "red"];

  // Calculate the percentage and ratio
  const totalQuestions = statisticsData?.correct_answer + statisticsData?.wrong_answer;
  const correctAnswerPercentage = ((statisticsData?.correct_answer / totalQuestions) * 100).toFixed(2);
  const wrongAnswerPercentage = ((statisticsData?.wrong_answer / totalQuestions) * 100).toFixed(2);
  const answerRatio = `${statisticsData?.correct_answer}:${statisticsData?.wrong_answer}`;

  return (
    <Container className="statistics-container">
      <center>
        <h1>Game Statistics</h1>
      </center>
      <hr />
      <Row>
        <Col sm="6">
          <div className="d-flex mt-3 flex-column">
            <h5>
              Total Quizzes:
              <span className="text-warning fw-bold">
                {statisticsData?.total_quizzes}
              </span>
            </h5>
            <h5>
              Total Quizzes Completed:{" "}
              <span className="text-primary fw-bold">
                {statisticsData?.total_quizzes_completed}
              </span>
            </h5>
            <h5>
              Average Score:{" "}
              <span className="text-info fw-bold">
                {" "}
                {statisticsData?.average_score}
              </span>
            </h5>
            <h5>
              Total Questions Attempted:{" "}
              <span className="text-primary fw-bold">
                {" "}
                {statisticsData?.total_questions_attempted}
              </span>
            </h5>
            <hr />
            <h5>
              Correct Answers:{" "}
              <span className="text-success fw-bold">
                {statisticsData?.correct_answer}
              </span>
            </h5>
            <h5>
              Wrong Answers:{" "}
              <span className="text-danger fw-bold">
                {statisticsData?.wrong_answer}{" "}
              </span>
            </h5>
          </div>
        </Col>

        <Col sm="6">
          {statisticsData && (
            <div className="statistics-content">
              <div className="pie-chart-container">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={[
                        {
                          name: "Correct Answers",
                          value: statisticsData.correct_answer,
                        },
                        {
                          name: "Wrong Answers",
                          value: statisticsData.wrong_answer,
                        },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    >
                      {[
                        {
                          name: "Correct Answers",
                          value: statisticsData.correct_answer,
                        },
                        {
                          name: "Wrong Answers",
                          value: statisticsData.wrong_answer,
                        },
                      ].map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              
                <div className="d-flex flex-column align-items-center">
                <h6>Correct : <span className="text-success fw-bold"> {correctAnswerPercentage}% </span></h6>
                <h6>Wrong: <span className="text-danger fw-bold">{wrongAnswerPercentage}%</span> </h6>
                <h6>Ratio: <span className="text-primary fw-bold">{answerRatio}</span></h6>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Statistics;
