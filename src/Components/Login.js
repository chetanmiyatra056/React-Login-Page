import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate("/welcome");
    }
  });

  async function login(){
    console.warn(email,password)
    let item = {email,password}

    let result = await fetch("http://127.0.0.1:8000/api/login",{
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });
    result = await result.json();
    localStorage.setItem("user-info",JSON.stringify(result))
    navigate("/welcome");
  }

  return (
    <div>
      <Header />
      <div className="container my-5">
        <h1>Login Form</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
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
          </div>

          <button type="button" onClick={login} className="btn btn-primary me-2">
            Sign In
          </button>

          <button type="reset" className="btn btn-danger">
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
