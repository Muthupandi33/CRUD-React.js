import React, { useEffect, useState } from 'react'
import './CreateModule.css'
import { useNavigate, useParams } from 'react-router-dom';





const EmployeeEdit = () => {

  const {empid}=useParams();
  
  let navigate=useNavigate();

  

  const[name,setName]= useState("");
  const[email,setEmail]= useState("");
  const[phone,setPhone]= useState("");
  useEffect(()=>{
    fetch("http://localhost:3000/user/"+empid).then(res=>{
      res.json().then(data=>{
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      })
  
     }) 
  },[empid]);
 
  let handleSubmit=(e)=>{
    e.preventDefault();
    let payload ={name,email,phone};
    fetch("http://localhost:3000/user/"+empid,
      {
        method:"PUT",
        body:JSON.stringify(payload)
      }
    ).then(res=>{
      navigate("/");

    })
   };

  return (
    <>
    <div>
        
    <h1 style={{textAlign:'center'}}>Update Employee</h1>

    </div>

  <form className='formBlock' action="" onSubmit={handleSubmit}>
    <div>
      <input type="text" placeholder='ENTER USER NAME'
        value={name}
        onChange={(e)=>setName(e.target.value)}
      
      />
    </div>
    <div>
      <input type="email" placeholder='ENTER USER MAIL'
       value={email}
       onChange={(e)=>setEmail(e.target.value)}
     
      />
    </div>
    <div>
      <input type="tel" placeholder='ENTER USER PHONE' 
       value={phone}
       onChange={(e)=>setPhone(e.target.value)}
     

      />
    </div>
    <div>
      <input type="submit" value="UPDATE USER" />
    </div>

  </form>
  </>
  )
}

export default EmployeeEdit