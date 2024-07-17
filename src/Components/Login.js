import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/welcome");
    }
  });

  const validateForm = () => {
    let formErrors = {};

    if (!email.trim()) {
      formErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email address is invalid";
    }

    if (!password) {
      formErrors.password = "Password is required";
    } else if (password.length < 4) {
      formErrors.password = "Password must be at least 4 characters";
    }

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  async function login() {
    if (!validateForm()) {
      return;
    }

    console.warn(email, password);
    let item = { email, password };

    let response = await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    let result = await response.json();

    if (result.status === false) {
      setErrors(result.error);
      setMessage(result.message);
    } else {
      setErrors({});
      setMessage("User logged in successfully.");
      setTimeout(() => {
        localStorage.setItem("user-info", JSON.stringify(result.data));
        navigate("/welcome");
      }, 1000);
    }
  }

  function reset() {
    setEmail("");
    setPassword("");
    setErrors({});
    setMessage("");
  }

  return (
    <div>
      <Header />
      {message && <div className="alert alert-info">{message}</div>}
      <div className="container my-5">
        <h1>Login Form</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}
          </div>

          <button
            type="button"
            onClick={login}
            className="btn btn-primary me-2"
          >
            Sign In
          </button>

          <button type="button" onClick={reset} className="btn btn-danger">
            Reset
          </button>

          <p className="mt-2">
            You can not Account Now you can first{" "}
            <Link className="link" to="/register">
              Sing Up
            </Link>{" "}
            your self
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
