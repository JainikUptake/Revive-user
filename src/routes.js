import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import LoginOTP from "./Components/Login/LoginOTP";
import Home from "./Components/Home/Home";
import Subject from "./Components/Subjects/Subject";
import Topic from "./Components/Topics/Topic";
import SubscriptionPlan from "./Components/Subscription/SubscriptionPlan";
import SubscriptionDetail from "./Components/Subscription/SubscriptionDetail";
import Setting from "./Components/Settings/Setting";
import About from "./Components/Settings/About";
import Contact from "./Components/Settings/Contact";
import Faq from "./Components/Settings/Faq";
import FeedBack from "./Components/Settings/FeedBack";
import PP from "./Components/Settings/PP";
import Case from "./Components/Cases/Case";
import CaseDetail from "./Components/Cases/CaseDetail";
import CaseDescription from "./Components/Cases/CaseDescription";
import Quiz from "./Components/Quiz/Quiz";
import Streak from "./Components/Streaks/Streak";
import Analysis from "./Components/Quiz/Analysis";
import Statistics from "./Components/Statistics/Statistics";

function AppRoutes({ isLoggedIn, handleLogin }) {
  const routes = [
    {
      path: "/",
      element: isLoggedIn ? <Navigate to="/home" /> : <Signup />,
    },
    {
      path: "/login",
      element: isLoggedIn ? <Navigate to="/home" /> : <Login handleLogin={handleLogin} />,
    },
    {
      path: "/loginOTP",
      element: isLoggedIn ? <Navigate to="/home" /> : <LoginOTP handleLogin={handleLogin} />,
    },
    {
      path: "/home",
      element: isLoggedIn ? <Home /> : <Navigate to="/login" />,
    },
    {
      path: "/settings",
      element: isLoggedIn ? <Setting /> : <Navigate to="/login" />,
    },
    {
      path: "/settings/about",
      element: isLoggedIn ? <About /> : <Navigate to="/login" />,
    },
    {
      path: "/settings/contact",
      element: isLoggedIn ? <Contact /> : <Navigate to="/login" />,
    },
    {
      path: "/settings/faq",
      element: isLoggedIn ? <Faq /> : <Navigate to="/login" />,
    },
    {
      path: "/settings/feedback",
      element: isLoggedIn ? <FeedBack /> : <Navigate to="/login" />,
    },
    {
      path: "/settings/privacypolicy",
      element: isLoggedIn ? <PP /> : <Navigate to="/login" />,
    },
    {
      path: "/subscriptionPlan",
      element: isLoggedIn ? <SubscriptionPlan /> : <Navigate to="/login" />,
    },
    {
      path: "/subscriptionDetail/:id",
      element: isLoggedIn ? <SubscriptionDetail /> : <Navigate to="/login" />,
    },
    {
      path: "/subject",
      element: isLoggedIn ? <Subject /> : <Navigate to="/login" />,
    },
    {
      path: "/topic/:id",
      element: isLoggedIn ? <Topic /> : <Navigate to="/login" />,
    },
    {
      path: "/cases/:id",
      element: isLoggedIn ? <Case /> : <Navigate to="/login" />,
    },
    {
      path: "/caseDetail/:id",
      element: isLoggedIn ? <CaseDetail /> : <Navigate to="/login" />,
    },
    {
      path: "/case/description/:id",
      element: isLoggedIn ? <CaseDescription /> : <Navigate to="/login" />,
    },
    {
      path: "/quiz/:id",
      element: isLoggedIn ? <Quiz /> : <Navigate to="/login" />,
    },
    {
      path: "/analysis/:id",
      element: isLoggedIn ? <Analysis /> : <Navigate to="/login" />,
    },
    {
      path: "/streak",
      element: isLoggedIn ? <Streak /> : <Navigate to="/login" />,
    },
    {
      path: "/statistics",
      element: isLoggedIn ? <Statistics /> : <Navigate to="/login" />,
    },
  ];

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default AppRoutes;
