import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmployeeListing from './EmployeeListing';
import EmployeeCreate from './EmployeeCreate';
import  EmployeeEdit from './EmployeeEdit'
import img from './crud.gif'

const MainAppFile = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EmployeeListing />} />
        <Route path="/create" element={<EmployeeCreate />} />
        <Route path="/edit/:empid" element={<EmployeeEdit />} />
        {/* <Route path="*" element={<h1>404 - Page Not Found</h1>} /> */}
   
      </Routes>
      <footer>
        <img src={img} alt="img for crud" />
      </footer>
    </BrowserRouter>
  );
};

export default MainAppFile;
