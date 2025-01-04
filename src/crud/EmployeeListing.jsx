import React, { useEffect, useState } from 'react'
// import obj from './users.json'
import './global.css'
import { Link, useNavigate } from 'react-router-dom'
// import MainAppFile from './MainAppFile'


const EmployeeListing = () => {



    let navigate=useNavigate();

    const[Users,setUsers] = useState([])

    useEffect(() => {
        fetch("http://localhost:3000/user")
          .then(res => res.json()) // First, parse the response as JSON
          .then(data => {

        //    console.log(data);
           
            setUsers(data);
            
          })
          .catch(err => console.log(err)); // Catch and log any errors
      }, []);

      // delete User
  const removeUser = (id)=>{
    fetch("http://localhost:3000/user/"+id,{
         method:"DELETE"
    }).then(res=> console.log("DATA DELETED SUCCESSFULLY"))
    .catch(err => console.log("SOME ERROR WHILE DELETING USER")
    )
  };
  // FOR EDITING
  const loadEdit = (id) => {
    console.log("Navigating to edit with id:", id); // Add this line
    navigate("/edit/" + id);
  };
  
  return (
    <div>
        <div>
        <Link to="/create" className="data1">
          ADD USER
        </Link>
        </div>
       
        <h1 style={{textAlign:'center'}} >Employee List </h1>
         
        <table border="2" style={{width:"90%", border:"2px solid blue", backgroundColor:"bisque"}} >
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
            
                    {Users.map(user => (
                        <tr key={user.id}  >
                            <td className='details' >{user.id}</td>
                            <td className='details' >{user.name}</td>
                            <td className='details' >{user.email}</td>
                            <td className='details' >{user.phone}</td>
                            <td>
                            <Link className='data1' to={`/edit/${user.id}`} onClick={()=> loadEdit(user.id)} >Edit</Link>
                            <Link className='data2' onClick={()=> removeUser(user.id)} >Delete</Link>
                            </td>
                        </tr>
                    ))}
 
        </tbody>
        
        </table>



    </div>
  )
}

export default EmployeeListing