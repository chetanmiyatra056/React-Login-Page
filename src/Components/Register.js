import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Link } from 'react-router-dom'

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  saveUser = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://127.0.0.1:8000/api/insert",
      this.state
    );

    if (res.data.status === 200) {
      console.log(res.data.message);

      this.setState({
        name: "",
        email: "",
        password: "",
        confirm_password: "",
      });
    }
  };

  render() {
    return (
      <>
        <div className="container my-5">
          <h1>Register Form</h1>
          <form onSubmit={this.saveUser}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                onChange={this.handleInput}
                value={this.state.name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                onChange={this.handleInput}
                value={this.state.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                id="password"
                onChange={this.handleInput}
                value={this.state.password}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="confirm_password" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                name="confirm_password"
                id="confirm_password"
                onChange={this.handleInput}
                value={this.state.confirm_password}
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
}

export default Register;

