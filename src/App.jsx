import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Signup from "./components/signup/Signup";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Verification from "./components/verification/Verification";
import Navbar from "./components/nav/Navbar";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    const auth = async () => {
      const res = await fetch(`${import.meta.env.VITE_API}/isauthenticated`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setCurrentUser(data.user.userName);
      setIsAuthenticated(true);
    };
    auth();
  }, [isAuthenticated, currentUser]);

  return (
    <div>
      <Navbar
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              currentUser={currentUser}
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/signup"
          element={<Signup isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/login"
          element={
            <Login
              setCurrentUser={setCurrentUser}
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/verification"
          element={<Verification isAuthenticated={isAuthenticated} />}
        />
      </Routes>
    </div>
  );
};

export default App;
