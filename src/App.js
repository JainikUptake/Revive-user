// Import necessary dependencies and components
import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import AppRoutes from "./routes";
import AppNavbar from "./Components/Navbar/Navbar";
import { Baseurl } from "./Components/url/BaseURL";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const handleLogin = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  const handleLogoutClick = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found in localStorage.");
        return;
      }

      const response = await axios.post(
        `${Baseurl}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        setIsLoggedIn(false);
      }
    } catch (err) {
      console.error("Logout failed.", err);
    }
  };

  return (
    <div>
      {/* header */}
      <AppNavbar
        isLoggedIn={isLoggedIn}
        handleLogoutClick={handleLogoutClick}
      />

      {/* Routes */}
      <AppRoutes
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogoutClick={handleLogoutClick}
      />
    </div>
  );
}

export default App;
