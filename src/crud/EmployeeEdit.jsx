import React, { useEffect, useState } from 'react';
import './CreateModule.css';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeEdit = () => {
  const { empid } = useParams();
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // Fetch the user data by empid using the mock API
    fetch(`https://678a4dcbdd587da7ac299255.mockapi.io/api/users/user/${empid}`)
      .then(res => res.json())
      .then(data => {
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, [empid]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Payload with the updated data
    let payload = { name, email, phone };

    // PUT request to update the user
    fetch(`https://678a4dcbdd587da7ac299255.mockapi.io/api/users/user/${empid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        console.log("Updated user data:", data);
        navigate("/"); // Navigate back to the employee listing page
      })
      .catch(error => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: 'center' }}>Update Employee</h1>
      </div>

      <form className='formBlock' onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder='ENTER USER NAME'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder='ENTER USER MAIL'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="tel"
            placeholder='ENTER USER PHONE'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <input type="submit" value="UPDATE USER" />
        </div>
      </form>
    </>
  );
}

export default EmployeeEdit;
