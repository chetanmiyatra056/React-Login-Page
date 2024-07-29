import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div style={{ marginBottom: "60px" }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            React Project
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>

              {localStorage.getItem("user-info") ? (
                <>
                  {/* With Login */}

                  <li className="nav-item">
                    <Link className="nav-link active" to="/welcome">
                      Welcome
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link active" to="/profile">
                      Profile
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link active" to="/password">
                      Password
                    </Link>
                  </li>

                </>
              ) : (
                <>
                  {/* With out Login */}

                  <li className="nav-item">
                    <Link className="nav-link active" to="/register">
                      Register
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link active" to="/login">
                      Login
                    </Link>
                  </li>
                  
                </>
              )}
            </ul>

            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}