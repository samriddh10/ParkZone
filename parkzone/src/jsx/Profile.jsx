import React, { useEffect, useState } from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import { jwtDecode } from "jwt-decode"; // Keep the import the same way you prefer
import axios from "axios";
import "./css/Profile.css";

function Profile() {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    dob: "",
    joinedOn: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          // Decode the token to extract role and email
          const decodedToken = jwtDecode(token);
          const role = decodedToken.role;  // Access the role from the decoded token
          const email = decodedToken.email;

          // Fetch user details from backend
          const response = await axios.get("http://localhost:5000/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { role, email },  // Send role and email in the request
          });

          const { name, dob, createdAt } = response.data;

          setUserDetails({
            name,
            email,
            role,
            dob: new Date(dob).toLocaleDateString(),
            joinedOn: new Date(createdAt).toLocaleDateString(),
          });
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <Header />
      <Navbar />
      <div
        className="profilepage"
        style={{
          backgroundImage: "url(/assets/car-parking-app.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="prof">
          <div>
            <img
              className="profile-image"
              src={process.env.PUBLIC_URL + "/assets/prof.png"}
              alt="profile"
            />
          </div>
          <div className="profile-details">
            <div className="profile-name">Name: {userDetails.name}</div>
            <div className="profile-email">Email: {userDetails.email}</div>
            <div className="profile-email">Role: {userDetails.role}</div>
            <div className="profile-email">Date of Birth: {userDetails.dob}</div>
            <div className="profile-email">Joined on: {userDetails.joinedOn}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
