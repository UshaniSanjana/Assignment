import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/signup", {
        name,
        username,
        email,
        password,
      });

      navigate("/");
    } catch (error) {
      alert("Admin Registration failed");
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
        <form>
          <p className="text-center fw-bold fs-4">SignUp</p>
          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              aria-describedby="emailHelp"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputUsername" className="form-label">
              UserName
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputUsername"
              aria-describedby="emailHelp"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-center gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSignUp}
            >
              SignUp
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleGoogleLogin}
            >
              SignUp with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
