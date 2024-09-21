import React from "react";
import { Link } from 'react-router-dom';
import "./css/Navbar.css";

function Navbar() {
  

  

  return (
    <div className="navbar">
      <div className="nav">
        <div><Link to="/home">Home</Link></div>
        
        <div><Link to="">Home</Link></div>
        
      </div>
      <div className="profile">
        <div id="two">
          <img 
          src={process.env.PUBLIC_URL + "/assets/prof.png"}
          alt="profile"
          className="profile-image"/>
        </div>
        <div id='tooltip'> 

            <Link to="/profile">Profile</Link>
            <Link to="/changepassword">Change Password</Link>
            <Link to ="/logout">Logout</Link>
            
            
          </div>
      </div>
    </div>
  );
}

export default Navbar;
