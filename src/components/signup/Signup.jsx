import React, { useState } from "react";
import toast from "react-hot-toast";
import Verification from "../verification/Verification";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  isAuthenticated && navigate("/");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    emailAddress: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    emailAddress,
    userName,
    password,
    confirmPassword,
  } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(false);
    e.preventDefault();
    setIsLoading(true);
    if (
      !firstName ||
      !lastName ||
      !gender ||
      !dateOfBirth ||
      !emailAddress ||
      !userName ||
      !password ||
      !confirmPassword
    ) {
      toast.error("All fields are");
      setIsLoading(false);
    } else {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/registration`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            gender,
            dateOfBirth,
            emailAddress,
            userName,
            password,
            confirmPassword,
          }),
          credentials: "include",
        });
        const data = await res.json();

        if (res.status === 200) {
          navigate("/verification", { state: data.emailAddress });
          setFormData({
            firstName: "",
            lastName: "",
            gender: "",
            dateOfBirth: "",
            emailAddress: "",
            userName: "",
            password: "",
            confirmPassword: "",
          });
          toast.success(
            "User is registered successfully,Please verify your email"
          );
        } else if (res.status === 401) {
          toast.error(data.message);
        } else if (res.status === 402) {
          toast.error(data.message);
        } else if (res.status === 403) {
          toast.error(data.message);
        } else {
          toast.error("Internal server error");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-1">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="dob" className="block mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="emailAddress" className="block mb-1">
                emailAddress
              </label>
              <input
                type="emailAddress"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="username" className="block mb-1">
                userName
              </label>
              <input
                type="text"
                id="username"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
             disabled={isLoading}
              type="submit"
              className="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 active:bg-blue-700"
            >
              {isLoading ? "loading..." : "Sign Up"}
            </button>
          </form>
          <Link to={"/verification"}>
            <p className="text-center bg-green-600 hover:bg-green-700 active:bg-green-600 px-3 py-2 text-white mt-2">
              verfiy your code
            </p>
          </Link>
          <p className="text-center mt-5">Already have an account?</p>
          <Link to={"/login"}>
            <p className="text-center underline text-blue-500 hover:text-blue-600">
              Login
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
