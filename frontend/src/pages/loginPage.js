import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Invalid username or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      window.open("http://localhost:5000/api/auth/google", "_self");
    } catch (error) {
      alert("Google login failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-success">
      <div
        className="p-4 border rounded shadow bg-white"
        style={{ width: "350px" }}
      >
        <form className="px-4 py-3" onSubmit={handleLogin}>
          <p className="text-center fw-bold fs-4">SignIn</p>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-left gap-3">
            <button type="submit" className="btn btn-primary">
              SignIn
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleGoogleLogin}
            >
              SignIn with Google
            </button>
          </div>

          <div className="dropdown-divider"></div>
          <a className="dropdown-item mt-2" href="/signup">
            New around here? <strong>SignUp</strong>
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
