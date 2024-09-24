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

        <Link  to="/login"><div id="login"> Log In</div></Link>

        <Link to="/signup"><div id="signup">Sign Up</div></Link>
          
      </div>
    </div>
  );
}

export default NavbarHome;
