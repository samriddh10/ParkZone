import React, { useState } from "react";
import axios from "axios";
import "./css/ChangePassword.css";
import Header from "./Header";
import Navbar from "./Navbar";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Get token from localStorage
      const response = await axios.post(
        "http://localhost:5000/change-password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add "Bearer " prefix
          },
        }
      );
      alert("Password changed successfully!");
    } catch (error) {
      console.error("Error response:", error.response); // Log the full error response
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <Navbar />
      <form onSubmit={handleChangePassword}>
        
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Old Password"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
        />
        <button type="submit">Change Password</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default ChangePassword;
