import React, { useEffect, useState } from "react";
import "./global.css";
import { Link, useNavigate } from "react-router-dom";

const EmployeeListing = () => {
  let navigate = useNavigate();

  const [Users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("https://678a4dcbdd587da7ac299255.mockapi.io/api/users/user")
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data && Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Unexpected data format:", data);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Error fetching users: " + error.message);
        console.error("Error fetching users:", error);
      });
  };

  const removeUser = (id) => {
    if (window.confirm(`Are you sure you want to delete the user with ID: ${id}?`)) {
      // Send DELETE request to the API
      fetch(`https://678a4dcbdd587da7ac299255.mockapi.io/api/users/user/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            // Remove the user from local state if deletion was successful
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            console.log(`User with id ${id} removed from API and local state`);
          } else {
            throw new Error("Failed to delete user");
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
          alert("There was an error deleting the user.");
        });
    }
  };

  const loadEdit = (id) => {
    navigate("/edit/" + id);
  };

  return (
    <div>
      <div>
        <Link to="/create" className="data1">
          ADD USER
        </Link>
      </div>
      <h1 style={{ textAlign: "center" }}>Employee List</h1>
      {error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : isLoading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      ) : (
        <table
          border="2"
          style={{
            width: "90%",
            border: "2px solid blue",
            backgroundColor: "bisque",
          }}
        >
          <thead>
            <tr>
              <th>S.NO</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {Users.length > 0 ? (
              Users.map((user) => (
                <tr key={user.id}>
                  <td className="details">{user.id}</td>
                  <td className="details">{user.name}</td>
                  <td className="details">{user.email}</td>
                  <td className="details">{user.phone}</td>
                  <td>
                    <button className="data1" onClick={() => loadEdit(user.id)}>
                      Edit
                    </button>
                    <button
                      className="data2"
                      onClick={() => removeUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeListing;