import React from "react";
import Header from "./Header";
import NavbarHome from "./NavbarHome";
import "./css/Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="Home">
      <Header />
      <NavbarHome />
      <div className="homepage1">
        <h1>Rapidly Find Parking Spot for<br></br> Your Vehicle Near You</h1>
        
        <p>Find a parking spot near you</p>
        <div className="div2">
          <Link to="/dashboard">
            <button className="getstarted">Get Started</button>
          </Link>
          <input id="search" type="search" placeholder="Quick Search" />
        </div>
      </div>
    </div>
  );
}

export default Home;
