import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Login = ({ setIsAuthenticated = () => {}, isAuthenticated }) => {
  const navigate = useNavigate();
  isAuthenticated && navigate("/");
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const { userName, password } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(false);
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200) {
        setIsAuthenticated(true);
        toast.success(data.message);
        navigate("/");
      } else if (res.status === 400) {
        toast.error(data.message);
      } else if (res.status === 402) {
        toast.error(data.message);
      } else if (res.status === 404) {
        toast.error(data.message);
      } else {
        toast.error("Internal server error");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block mb-1">
              userName
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
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
              required
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {isLoading ? "loading..." : "Login"}
          </button>
        </form>
        <p className="text-center mt-5">Don't have an account?</p>
        <Link to={"/signup"}>
          <p className="text-center underline text-blue-500 hover:text-blue-600">
            Register
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
