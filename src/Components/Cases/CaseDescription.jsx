import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Baseurl } from "../url/BaseURL";

const CaseDescription = () => {
  const [caseDetails, setCaseDetails] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  async function getCaseDetails() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage.");
      return;
    }

    try {
      const response = await axios.get(`${Baseurl}/caseWithDetail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCaseDetails(response.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCaseDetails();
  }, [id]);

  return (
    <Container>
      <center>
        <h5>Case Description</h5>
      </center>
      {caseDetails && (
        <div>
          <h2>{caseDetails.case_name}</h2>
          <Tabs>
            <TabList>
              {caseDetails.case_descriptions &&
                caseDetails.case_descriptions.map((description, index) => (
                  <Tab key={index}>{description.case_desc_title}</Tab>
                ))}
            </TabList>
            {caseDetails.case_descriptions &&
              caseDetails.case_descriptions.map((description, index) => (
                <TabPanel key={index}>
                  <h5>{description.case_desc_title}</h5>
                  <p>{description.case_desc_description}</p>
                </TabPanel>
              ))}
          </Tabs>
          <div className="d-flex justify-content-between">
            <Button color="info" onClick={() => navigate(`/cases/${id}`)}>
              Back to Cases
            </Button>
            <Button color="warning" onClick={() => navigate(`/quiz/${id}`)}>
              Skip & Start Quiz
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CaseDescription;
