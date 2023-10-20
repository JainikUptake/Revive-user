import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "reactstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./case.css"; 
import { Baseurl } from "../url/BaseURL";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        padding: "15px",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        padding: "15px",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

const CaseDetail = () => {
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

  // Render a slider for case images or videos
  const renderImageSlider = () => {
    const caseGifs = caseDetails.case_gifs || [];
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    };

    return (
      <div className="slider-container">
        <Slider {...settings}>
          {caseGifs.map((gif, index) => (
            <div className="slider-item" key={index}>
              {gif.endsWith(".mp4") ? (
                <div className="video-container">
                  <video controls autoPlay loop>
                    <source src={gif} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div className="image-container">
                  <img src={gif} alt={`Case ${index}`} />
                </div>
              )}
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  return (
    <Container>
      <center>
        <h5>Case Details</h5>
      </center>
      {caseDetails && (
        <>
          {renderImageSlider()}
          <div className="d-flex justify-content-between ">
            <Button color="info" onClick={() => navigate(`/cases/${id}`)}>
              Back to Cases
            </Button>
            <Button
              color="danger"
              onClick={() => navigate(`/case/description/${id}`)}
            >
              Skip
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default CaseDetail;
