import React, { useCallback, useEffect } from "react";
import Login from "../login/Login";
import { useNavigate } from "react-router-dom";

const Dashboard = ({
  currentUser,
  isAuthenticated,
  setIsAuthenticated = () => {},
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [currentUser, isAuthenticated, navigate]);
  if (!isAuthenticated) {
    return null;
  }
  const logout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_DEVELOPMENT_API}/logout`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
          credentials: "include",
        }
      );
      if (res.ok) {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      Welcome {currentUser}
      <button onClick={logout}>logout</button>
    </>
  );
};

export default Dashboard;
