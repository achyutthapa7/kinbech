import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Verification = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  isAuthenticated && navigate("/");

  const location = useLocation();
  const emailAddress = location.state;
  const [enteredCode, setEnteredCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setEnteredCode(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    setIsLoading(false);
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_DEVELOPMENT_API}/verification`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ verificationCode: enteredCode }),
          credentials: "include",
        }
      );
      const data = await res.json();

      if (res.status === 200) {
        toast.success("user is verified");
        navigate("/login");
      }
      if (res.status === 201) {
        setError(data.message);
      } else if (res.status === 400) {
        setError(data.message);
        toast.error(data.message);
        navigate("/signup");
      } else if (res.status === 401) {
        setError(data.message);
      } else if (res.status === 403) {
        setError(data.message);
      } else if (res.status === 404) {
        setError(data.message);
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
        <h2 className="text-2xl font-bold mb-4 text-center">Verification</h2>
        <p className="mb-4">
          We have sent a six-digit verification code to:{" "}
          <strong>{emailAddress}</strong>. Please verify your email address.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="verificationCode" className="block mb-1">
              Verification Code
            </label>
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              value={enteredCode}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600 active:bg-blue-700"
          >
            {isLoading ? "loading..." : "Verify"}
          </button>
        </form>
        <Link to={"/signup"}>
          <p className="text-center mt-5 underline text-blue-500 hover:text-blue-600">
            Register Here
          </p>
        </Link>

        <p className="text-center mt-3 text-red-900">
          Rememeber verification code expires in 5 minutes
        </p>
      </div>
    </div>
  );
};

export default Verification;
