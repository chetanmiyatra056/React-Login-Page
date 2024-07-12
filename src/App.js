import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Welcome from "./Components/Welcome";
// import Users from "./Users.js";
import React from "react";

function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route
            exact
            path="/"
            element={
              <React.Fragment>
                <Home /> 
              </React.Fragment>
            }
          />

          <Route exact path="/register" element={<Register />} />

          <Route exact path="/login" element={<Login />} />

          <Route exact path="/welcome" element={<Welcome />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
