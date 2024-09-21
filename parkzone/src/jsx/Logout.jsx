import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Logout.css"; // Similar CSS like your Login component
import Header from "./Header"; // Importing Header for consistency
import Navbar from "./Navbar"; // Include Navbar for navigation

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the local storage to remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Navigate to login page after logging out
    navigate("/");
  };

  const handleCancel = () => {
    // Navigate back to the home page or previous page
    navigate("/home");
  };

  return (
    <div className="logout-container">
      <Header /> {/* Display the header */}
      <Navbar /> {/* Display the navigation bar */}
      
      <div
        className="logout"
        style={{
          backgroundImage: "url(/assets/car-parking-app.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="logout-box">
          <h2>Are you sure you want to log out?</h2>
          <div className="logout-buttons">
            {/* Log out button */}
            <button className="logout-button" onClick={handleLogout}>
              Yes, Log Out
            </button>
            {/* Cancel button */}
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logout;
