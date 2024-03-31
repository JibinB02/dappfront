import Navbar from "./components/Navbar";
import React, { useState } from 'react';
import {Routes,Route} from "react-router-dom"
import Signin from "./pages/Signin"
import Home from "./pages/Home"
import Profile from "./pages/profile"
import AdminSignin from "./pages/adminsignin"
import Admin from "./pages/admin"


const App = () => {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/Signin" element={<Signin/>} /> 
        <Route path="/profile" element={<Profile/>} />
        <Route path="/adminsignin" element={<AdminSignin/>} />
        <Route path="/admin" element={<Admin/>} />
        </Routes>        
      </div>
    </>
  );
};

export default App;
