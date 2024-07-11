import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <div className="container my-3">
        <div className="p-5 bg-dark text-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Welcome to React Project</h1>
            <p className="col-md-8 fs-4">
              Using a series of utilities, you can create this jumbotron, just
              like the one in previous versions of Bootstrap. Check out the
              examples below for how you can remix and restyle it to your
              liking.
            </p>
            {/* <button className="btn btn-primary btn-lg" type="button">
              Now Login
            </button> */}
             <Link className="btn btn-primary btn-lg" type="button" to="/login">Now Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
