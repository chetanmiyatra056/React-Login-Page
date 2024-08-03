import React from "react";
import Header from "../Components/Header";

function Lists() {

  return (
    <>
      <Header />
      <div className="container my-5">
        <h1>All Lists Show</h1>

        <table className="table table-striped table-dark table-bordered table-hover my-3 ">
          <thead>
            <tr>
              <th scope="col">Sr No.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Country</th>
              <th scope="col">State</th>
              <th scope="col">City</th>
              <th scope="col">Hobbies</th>
              <th scope="col">Gender</th>
              <th scope="col">Date</th>
              <th scope="col">Type</th>
            </tr>
          </thead>
          <tbody>
           
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Lists;
