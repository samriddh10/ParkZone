import React from "react";
import Header from "./Header";
import NavbarHome from "./NavbarHome";
import "./css/Home.css";

function Home() {
  return (
    <div className="Home">
      <Header />
      <NavbarHome />
      <div className="homepage1">
        <h1>Rapidly Find Parking Slot for Your Vehicle</h1>
        <p>Find a parking spot near you</p>
      </div>
    </div>
  );
}

export default Home;
