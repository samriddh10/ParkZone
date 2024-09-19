import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

function Home() {
  return (
    <div>
        <Header />
        <Navbar />
        <h1>Welcome to ParkZone</h1>
        <p>Find a parking spot near you</p>
    </div>
  )
}

export default Home;