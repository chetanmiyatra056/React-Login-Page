import React from "react";
import { Link } from "react-router-dom";
// import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <>
      <div className="container my-5">
        <h1>Register Form</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm_password" className="form-label">
              Confirm Password
            </label>
            <input
              type="text"
              className="form-control"
              id="confirm_password"
            />
          </div>
          <button type="submit" className="btn btn-primary me-2">
            Sign Up
          </button>
          <button type="reset" className="btn btn-danger">
            Reset
          </button>
          <p className="mt-2">
            You already Register Now you can{" "}
            <Link className="link" to="/login">
              Sing In
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
