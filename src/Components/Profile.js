import React, { useEffect, useState } from "react";
import Header from "./Header";
import { apiLaravel } from "../Utils/Apiurl";
import { useNavigate } from "react-router-dom";

function Profile() {
  let user = JSON.parse(localStorage.getItem("user-info"));

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [countries, setCountries] = useState([]);
  const [countriesid, setCountriesid] = useState("0");

  const [states, setStates] = useState([]);
  const [statesid, setStatesid] = useState("0");

  const [cities, setCities] = useState([]);
  const [citiesid, setCitiesid] = useState("0");

  const fetchCountries = async () => {
    const rescountry = await apiLaravel("/countries");
    setCountries(await rescountry);
  };

  const handleCountryChange = async (e) => {
    setStates([]);
    setStatesid("0");
    setCities([]);
    const getcountriesid = e.target.value;
    setCountriesid(getcountriesid);

    const resstate = await fetch(
      `http://127.0.0.1:8000/api/states/${getcountriesid}`
    );
    const reset = await resstate.json();
    setStates(reset);
  };

  const handleStateChange = async (e) => {
    setCitiesid("0");
    const getstatesid = e.target.value;
    setStatesid(getstatesid);

    const rescity = await fetch(
      `http://127.0.0.1:8000/api/cities/${getstatesid}`
    );
    const reset = await rescity.json();
    setCities(reset);
  };

  const handleCityChange = (e) => {
    const getcitiesid = e.target.value;
    setCitiesid(getcitiesid);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  async function update() {
    let item = {
      name,
      email,
      countriesid,
      statesid,
      citiesid,
    };
    let response = await apiLaravel(`/update/${user && user.id}`, {
      method: "POST",
      body: JSON.stringify(item),
    });

    if (response.status === false) {
      setErrors(response.error);
      setMessage(response.message);
    } else {
      setErrors({});
      setMessage("User updated successfully.");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }

  function reset() {
    setName("");
    setEmail("");
    // setPassword("");
    // setConfirm_password("");
    // setErrors({});
    setMessage("");
    setCountriesid("0");
    setStates([]);
    setStatesid("0");
    setCities([]);
    setCitiesid("0");
  }

  return (
    <>
      <Header />
      {message && <div className="alert alert-info">{message}</div>}
      <div className="container my-5">
        <h1>Profile Form</h1>

        <form>
          {/* <input type="hidden" name="id" id="id" value={user && user.id} /> */}

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={user.name}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              name="email"
              id="email"
              value={user && user.email}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <select
              className="form-control"
              name="countries"
              id="countries"
              onChange={(e) => handleCountryChange(e)}
            >
              <option value={user && user.countries}>
                {user && user.countries}
              </option>
              <option value="0">Select Country</option>
              {countries.map((getcon, index) => (
                <option key={index} value={getcon.countries_id}>
                  {getcon.countries_name}
                </option>
              ))}
            </select>
            {errors.countries && (
              <div className="text-danger">{errors.countries}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="state" className="form-label">
              State
            </label>
            <select
              className="form-control"
              name="states"
              id="states"
              onChange={(e) => handleStateChange(e)}
            >
              <option value={user && user.states}>{user && user.states}</option>
              <option value="0">Select State</option>
              {states.map((getstate, index) => (
                <option key={index} value={getstate.states_id}>
                  {getstate.states_name}
                </option>
              ))}
            </select>
            {errors.states && (
              <div className="text-danger">{errors.states}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <select
              className="form-control"
              name="cities"
              id="cities"
              onChange={(e) => handleCityChange(e)}
            >
              <option value={user && user.cities}>{user && user.cities}</option>
              <option value="0">Select City</option>
              {cities.map((getcities, index) => (
                <option key={index} value={getcities.cities_id}>
                  {getcities.cities_name}
                </option>
              ))}
            </select>
            {errors.cities && (
              <div className="text-danger">{errors.cities}</div>
            )}
          </div>

          <button
            type="button"
            onClick={update}
            className="btn btn-primary me-2"
          >
            Update
          </button>

          <button type="button" onClick={reset} className="btn btn-danger">
            Reset
          </button>
        </form>
      </div>
    </>
  );
}

export default Profile;
