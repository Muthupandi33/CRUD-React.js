import React, { useState } from "react";
import "./CreateModule.css";
import { useNavigate } from "react-router-dom";

const EmployeeCreate = () => {
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = { name, phone, email };

    // Send POST request to create a new user
    fetch("https://678a4dcbdd587da7ac299255.mockapi.io/api/users/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("New Employee Added:", data);
        alert("User added successfully!");

        // Navigate back to the employee list
        navigate("/");

        // Optional: Refetch the users data after adding a new user
        fetchUsers();
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        alert("There was an error adding the user.");
      });
  };

  const fetchUsers = () => {
    fetch("https://678a4dcbdd587da7ac299255.mockapi.io/api/users/user")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Users:", data);
        // Optionally update the state if you have a Users state here
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Create Employee</h1>
      </div>

      <form className="formBlock" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="ENTER USER NAME"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="ENTER USER EMAIL"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder="ENTER USER PHONE"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="ADD USER" />
        </div>
      </form>
    </>
  );
};

export default EmployeeCreate;