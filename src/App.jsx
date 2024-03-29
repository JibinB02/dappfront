import Navbar from "./components/Navbar";
import React, { useState } from 'react';
import {Routes,Route} from "react-router-dom"
import Signin from "./pages/Signin"
import Home from "./pages/Home"
import Profile from "./pages/profile"
import AdminSignin from "./pages/adminsignin"
import Admin from "./pages/admin"


const App = () => {
  const [user, setUser] = useState({ name: '', aadhar: '' });
  const [admin,setAdmin]  = useState({admin:'',adminid:''});
  return (
    <>
      <Navbar user ={user} admin = {admin}/>
      <div className="max-w-7xl mx-auto pt-20 px-6">
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/Signin" element={<Signin setUser={setUser} />} /> 
        <Route path="/profile" element={<Profile user={user} />} />
        <Route path="/adminsignin" element={<AdminSignin setAdmin = {setAdmin} />} />
        <Route path="/admin" element={<Admin admin={admin} />} />
        </Routes>        
      </div>
    </>
  );
};

export default App;
