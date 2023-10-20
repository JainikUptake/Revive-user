import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "reactstrap";
import CustomModal from "./CustomModal"; // Import your custom modal
import "./quiz.css";
import { Baseurl } from "../url/BaseURL";

const Quiz = () => {
  // State to manage the current quiz and user data
  const [streak, setStreak] = useState();
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [is_correct, setis_correct] = useState();

  // Get the user and quiz IDs from the route parameters
  const { id } = useParams();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userid = userData.id;
  const token = localStorage.getItem("token");

  // State to track wrong answers, correctly selected options, and modal visibility
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [incorrectlySelected, setIncorrectlySelected] = useState([]);
  const [correctlySelected, setCorrectlySelected] = useState([]);
  const [isWrongAnswerModalOpen, setIsWrongAnswerModalOpen] = useState(false);
  const [in_Exp_mode, setin_Exp_mode] = useState(false);
  const [totalQuestion, settotalQuestion] = useState()


  // Fetch the user's streak from the API
  async function fetchStreak() {
    try {
      const response = await axios.get(
        `${Baseurl}/get/lifeline/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response.data, "hey");
      setStreak(response.data.data);
    } catch (error) {
      console.error("Error fetching streak: ", error);
    }
  }

  // Fetch the quiz data when the component mounts
  useEffect(() => {
    async function fetchQuizData() {
      try {
        const response = await axios.get(
          `${Baseurl}/quiz/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuizData(response.data.data);
        settotalQuestion(response.data.data.length)
      } catch (error) {
        console.error("Error fetching quiz data: ", error);
      }
    }

    fetchQuizData();
    fetchStreak();
  }, [id]);

  // Function to toggle the wrong answer modal
  const toggleWrongAnswerModal = () => {
    setIsWrongAnswerModalOpen(!isWrongAnswerModalOpen);
  };

  // Function to handle option selection
  const handleOptionSelect = (optionIndex) => {
    // Determine if the selected option is correct
    setis_correct(
      quizData[currentQuestion].options[optionIndex].correct_ans === 1
    );

    // Create new arrays to track correctly and incorrectly selected options
    const newIncorrectlySelected = [...incorrectlySelected];
    const newCorrectlySelected = [...correctlySelected];

    if (!is_correct) {
      // If the selected option is incorrect, highlight it in blue
      newIncorrectlySelected.push(optionIndex);
    } else {
      // If the selected option is correct, highlight it in green and unhighlight previous selections
      newCorrectlySelected.push(optionIndex);
      newIncorrectlySelected.splice(0, newIncorrectlySelected.length);
    }

    setSelectedOption(optionIndex);

    if (!is_correct) {
      setWrongAnswers(wrongAnswers + 1);
    }

    setCorrectlySelected(newCorrectlySelected);
    setIncorrectlySelected(newIncorrectlySelected);
  };

  // Function to handle submitting an answer
  const handleSubmitAnswer = async () => {
    if (!is_correct) {
      console.log("if not correct");
      // Reduce the user's lifeline
      try {
        await axios.put(
          `${Baseurl}/lifeline/reduce/${userid}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchStreak();
      } catch (error) {
        console.error("Error reducing lifeline: ", error);
      }

      // Display the wrong answer modal
      toggleWrongAnswerModal();
    } else {
      setin_Exp_mode(true);
    }
  };

  // Function to handle moving to the next question
  const handleNextQuestion = async () => {
    // Clear the selected option 
    setSelectedOption(null);
    setin_Exp_mode(false); // Exit explanation mode


    // Check if the selected option is correct
    if (
      selectedOption !== null &&
      quizData[currentQuestion].options[selectedOption].correct_ans === 1
    ) {
      setScore(score + 1);
    } else {
      if (selectedOption !== null) {
        try {
          // Reduce the user's lifeline
          await axios.put(
            `${Baseurl}/lifeline/reduce/${userid}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // Fetch to updated streak
          fetchStreak();
        } catch (error) {
          console.error("Error reducing lifeline: ", error);
        }
      }


  
    }

    // Move to the next question if available, else mark the quiz as completed
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };


  const navigate = useNavigate();

  const postScoreToAPI = async () => {
    try {

      const data = {
        user_id: userid,
        quiz_id: id,
        score: score,
        is_completed: 1,
        total_question : totalQuestion
      };

      await axios.post(`${Baseurl}/result`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error posting score to the API: ", error);
    }
  };

  // Function to handle quiz completion
  const handleQuizCompletion = () => {
    // Post the score to the API
    postScoreToAPI();

    // Navigate to the analysis page
    navigate(`/analysis/${id}`);

  };

  function QuitGame(){
    navigate(`/case/description/${id}`);
    setScore(0) 
        setIncorrectlySelected([]);
      setCorrectlySelected([]);
  }
  return (
    <>
      {in_Exp_mode ? (
        <Container>
          <h3 className="mb-4 fw-bold">Explanation:</h3>
          <p className="mb-4">{quizData[currentQuestion].explanation}</p>
          <center>
            <Button color="info" onClick={handleNextQuestion}>
              Next Question
            </Button>
          </center>
        </Container>
      ) : (
        <div className="quiz-container">
          {/* Quit button */}
          <Button color="danger" onClick={QuitGame}>Quit</Button>

          {/* Display the user's lifeline streak */}
          <h2 className="streak-heading fw-bold text-center">
            🔥 Lifeline 🔥 : {streak?.lifeline}
          </h2>

          {/* Note about wrong answers and reducing streak */}
          <h6 className="text-center text-danger">
            Note: Every wrong answer will reduce 1 streak
          </h6>

          {/* Check if there is quiz data available and the current question is within bounds */}
          {quizData.length > 0 &&
            currentQuestion < quizData.length &&
            (!quizCompleted ?  (
              <div>
                {/* Display the current question number */}
                <h2 className="quiz-question">
                  Question {currentQuestion + 1}:
                </h2>

                {/* Display the question text */}
                <p>{quizData[currentQuestion].question}</p>

                <div className="quiz-options">
                  {/* Map through the answer options and render them */}
                  {quizData[currentQuestion].options.map((option, index) => (
                    <div
                      key={index}
                      style={{
                        // Apply styles based on selected and correct/incorrect options
                        backgroundColor:
                          selectedOption === index ? "blue" : null,
                        color: selectedOption === index ? "#fff" : "",
                        border:
                          selectedOption === index ? "none" : "1px solid #ccc",
                      }}
                      className="quiz-option"
                    >
                      <label>
                        {/* Radio button input for option selection */}
                        <input
                          type="radio"
                          name="options"
                          value={index}
                          checked={selectedOption === index}
                          onChange={() => handleOptionSelect(index)}
                        />
                        {option.answer}
                      </label>
                    </div>
                  ))}
                </div>

                {selectedOption !== null && !quizCompleted && (
                  <div className="button-container">
                    <button
                      className="quiz-button"
                      onClick={handleSubmitAnswer}
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
            ): null)}

          {quizCompleted && (
            <div className="quiz-completed">
              <h2>Quiz Completed!</h2>
              <p className="quiz-score">
                Your Score: {score} / {quizData.length}
              </p>

              <Button onClick={handleQuizCompletion}>
                Show Analysis and Submit Results
              </Button>
            </div>
          )}

          <CustomModal
            isOpen={isWrongAnswerModalOpen}
            toggle={toggleWrongAnswerModal}
            title="Wrong Answer"
            message="You selected the wrong answer. 😞 Your lifeline has been reduced by 1."
          />
        </div>
      )}
    </>
  );
};

export default Quiz;
