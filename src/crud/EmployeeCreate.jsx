import React, { useState } from 'react'
import './CreateModule.css'
import { useNavigate } from 'react-router-dom';

const EmployeeCreate = () => {

     let navigate=useNavigate();

   const[name,setName]= useState("");
   const[email,setEmail]= useState("");
   const[phone,setPhone]= useState("");
  
   let handleSubmit=(e)=>{
    e.preventDefault();
    let payload ={name,phone,email};
    fetch("http://localhost:3000/user/",
      {
        method:"POST",
        body:JSON.stringify(payload)
      }
    ).then(res=>{
      navigate("/");

    })
   };



  return (
    <>
      
      <div>
        
      <h1 style={{textAlign:'center'}}>Create Employee</h1>

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
        <input type="submit" value="ADD USER" />
      </div>

    </form>
    </>
  )
}

export default EmployeeCreate