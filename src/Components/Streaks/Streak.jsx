import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container } from 'reactstrap';
import "./streak.css"
import { Baseurl } from '../url/BaseURL';
const Streak = () => {
  const [streak, setStreak] = useState();
  const [timer, setTimer] = useState(0);

  const userData = JSON.parse(localStorage.getItem('userData'));
  const id = userData.id;
  const token = localStorage.getItem('token');

  useEffect(() => {
    getStreaks();
  }, []);

  useEffect(() => {

    const savedTimer = localStorage.getItem('streakTimer');
    if (savedTimer) {
      setTimer(parseInt(savedTimer));
    }
  }, []);

  const getStreaks = async () => {
    try {
      const response = await axios.get(`${Baseurl}/get/lifeline/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStreak(response.data.data);
    } catch (error) {
      console.error('Error fetching streak:', error);
    }
  };

  const handleClaimStreak = async () => {
    try {
      if (timer <= 0) {
        // Make the API call to claim the streak
        const response = await axios.put(`${Baseurl}/claim/${id}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.status) {
          // If the API call is successful, reset the timer
          setTimer(24 * 60 * 60); // 24 hours in seconds
          // Save the updated timer value to localStorage
          localStorage.setItem('streakTimer', String(24 * 60 * 60));
          getStreaks();
        }
      }
    } catch (error) {
      console.error('Error claiming streak:', error);
    }
  };

  useEffect(() => {
    // Start the timer countdown
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
        // Update the timer value in localStorage
        localStorage.setItem('streakTimer', String(timer - 1));
      }
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes}:${remainingSeconds}`;
  };

  return (
    <Container className="streak-container">
      <center>
        <h2 className="streak-heading fw-bold">🔥 Streak 🔥</h2>
      </center>
      <div className="streak-info">
        <div>
          <span className="streak-label">Your Total Lifeline:</span>
          <span className="streak-value">{streak?.lifeline}</span>
        </div>
        <p className="streak-description">1 Streak = 1 Lifeline</p>
        <Button
          color="success"
          onClick={handleClaimStreak}
          disabled={timer > 0}
          className="claim-button"
        >
          {timer > 0 ? `Claim in ${formatTime(timer)}` : 'Claim Streak'}
        </Button>
      </div>
    </Container>
  );
};

export default Streak;
