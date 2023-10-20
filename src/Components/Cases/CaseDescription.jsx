import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Modal, ModalBody, ModalHeader } from "reactstrap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Baseurl } from "../url/BaseURL";

const CaseDescription = () => {
  const [caseDetails, setCaseDetails] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const [streak, setStreak] = useState()
  const user_id = localStorage.getItem("userData")
  const token= localStorage.getItem("token")
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  useEffect(() => {
    const getStreaks = async () => {
      try {
        const response = await axios.get(`${Baseurl}/get/lifeline/${user_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setStreak(response.data.data);
      } catch (error) {
        console.error('Error fetching streak:', error);
      }
    };

    getStreaks()
  },[])

  console.log(streak)

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

 
  function handleToQuiz(){
    if (streak.lifeline < 1) {
      setModal(true)
    }else{
      navigate(`/quiz/${id}`)
    }
  }
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
                  <img src={description?.case_desc_image} alt="case_image" />
                  <h5>{description.case_desc_title}</h5>
                  <p>{description.case_desc_description}</p>
                </TabPanel>
              ))}
          </Tabs>
          <div className="d-flex justify-content-between">
            <Button color="info" onClick={() => navigate(`/cases/${id}`)}>
              Back to Cases
            </Button>
            
            <Button color="warning" onClick={handleToQuiz}>
              Skip & Start Quiz
            </Button>
          </div>
        </div>
      )}
      {/* modal */}
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>You don't have enough lifeline to play the quiz </ModalHeader>
      </Modal>
    </Container>
  );
};

export default CaseDescription;
