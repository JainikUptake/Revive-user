import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "reactstrap";
import { Baseurl } from "../url/BaseURL";

const Case = () => {
  const [cases, setcases] = useState();
  const { id } = useParams();

  async function getCases() {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found in localStorage.");
      return;
    }
    try {
      const response = await axios.get(
        `${Baseurl}/cases/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

     
      setcases(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCases();
  }, [id]);

  //   console.log(cases,"topcis")
  
  const navigate = useNavigate()

  function handleCaseDetail(id){
    navigate(`/caseDetail/${id}`)
  }
  return (
    <Container>
      <h5>Select cases </h5>
      <div className="d-flex flex-column">
        {cases?.map((cases) => (
          <Button color="info" className="mt-4" key={cases.case_id}  onClick={() => handleCaseDetail(cases.case_id)}>
            {cases.case_name}
          </Button>
        ))}
      </div>
    </Container>
  );
};

export default Case;
