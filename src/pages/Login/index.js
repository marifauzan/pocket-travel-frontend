import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import { useNavigate, Link } from "react-router-dom";
import bgLogin from "../../assets/login_background.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const dataFormUser = {
      email: email,
      password: password,
    };

    try {
      const dataUser = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        dataFormUser
      );
      const { user_id, name, email } = dataUser.data.user;
      const { token } = dataUser.data;
      const payload = {
        user_id: user_id,
        name: name,
        email: email,
        token: token,
      };

      dispatch(
        login({
          user_id,
          name,
          email,
          token,
        })
      );

      localStorage.setItem("user", JSON.stringify(payload));
      navigate("/");
    } catch (err) {
      setError("Login failed. Incorrect email or password.");
    }
  };

  return (
    <div className="bg-white grid grid-cols-2">
      <div className="mx-36 flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-5">Login</h1>
        <form onSubmit={handleSubmitForm}>
          <p className="text-sm mb-5">
            Welcome to Pocket Travel! Enter your username and password in the
            fields below to log in.
          </p>
          <input
            id="email-address"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="appearance-none rounded-2xl relative block w-full px-3 py-2 mb-5 border border-black placeholder-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Email address"
          />
          <input
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="appearance-none rounded-2xl relative block w-full px-3 py-2 border border-black placeholder-gray-300 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Password"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full items-center px-4 py-2 mt-5 border border-transparent rounded-2xl shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        <p className="mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 hover:text-indigo-800"
          >
            Create an account
          </Link>
        </p>
      </div>
      <img className="h-screen" src={bgLogin} alt="" />
    </div>
  );
}
