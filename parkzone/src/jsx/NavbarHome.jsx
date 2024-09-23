import React from "react";
import { Link } from 'react-router-dom';
import "./css/NavbarHome.css";

function NavbarHome() {
  

  

  return (
    <div className="navbarhome">
      <div className="nav">
        <div><Link to="/">Home</Link></div>
        
        <div><Link to="">About Us</Link></div>
        <div><Link to="">Contact Support</Link></div>
        
      </div>
      <div className="profile">

        <div id="login"> <Link  to="/login">Log In</Link></div>

        <div id="signup"><Link to="/signup">Sign Up</Link></div>
          
      </div>
    </div>
  );
}

export default NavbarHome;
