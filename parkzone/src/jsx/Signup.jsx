import Header from "./Header";
import "./css/Signup.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(true);
  const [signUpType, setSignUpType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    gender: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { id, value, type } = e.target;
    if (type === "radio") {
      setFormData({
        ...formData,
        gender: value,
      });
    } else {
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiEndpoint =
        signUpType === "User"
          ? "http://localhost:5000/signup/user"
          : "http://localhost:5000/signup/owner";

      const response = await axios.post(apiEndpoint, formData);
      alert(response.data.message);
      navigate("/"); // Navigate after successful signup
    } catch (error) {
      console.error("Error registering!", error);
      alert(
        "Error registering! " + (error.response?.data?.error || "Unknown error")
      );
    }
  };

  const handleSignupClick = () => {
    navigate("/"); // Navigate to login
  };
  const handleUserClick = () => {
    setSignUpType("User");
    setShowDialog(false); // Close dialog
  };

  const handleOwnerClick = () => {
    setSignUpType("Owner");
    setShowDialog(false); // Close dialog
  };

  return (
    <div>
      <Header />

      {showDialog && (
        <div className="dialog">
          <h2>Sign In as:</h2>
          <button className="dialog-button" onClick={handleUserClick}>
            User
          </button>
          <button className="dialog-button" onClick={handleOwnerClick}>
            Owner
          </button>
        </div>
      )}
      <div className={showDialog ? "blurred-background" : ""}>
        <div
          className="signup"
          style={{
            backgroundImage: "url(/assets/car-parking-app.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <form id="login-form" onSubmit={handleSubmit}>
            <div className="top">
              <div className="signup-type">
                {signUpType === "User"
                  ? "User SignUp"
                  : signUpType === "Owner"
                  ? "Owner SignUp"
                  : ""}
              </div>
              <div className="logo">ParkZone</div>
              <div>
                <input
                  className="userid"
                  type="text"
                  placeholder="Name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  className="userid"
                  type="date"
                  placeholder="Date of Birth"
                  id="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  className="userid"
                  type="tel"
                  placeholder="Contact Number"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="userid">
                Gender
                <input
                  className="gender"
                  type="radio"
                  name="gender"
                  value="male"
                  id="male"
                  onChange={handleInputChange}
                />
                Male
                <input
                  className="gender"
                  type="radio"
                  name="gender"
                  value="female"
                  id="female"
                  onChange={handleInputChange}
                />
                Female
                <input
                  className="gender"
                  type="radio"
                  name="gender"
                  value="other"
                  id="other"
                  onChange={handleInputChange}
                />
                Other
              </div>

              <div>
                <input
                  className="userid"
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <input
                  className="userid"
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <button className="login-button" type="submit">
                  Sign Up
                </button>
              </div>
            </div>
            <div className="middle">
              <div className="signup-box">
                Already have an account?
                <div className="signup-button" onClick={handleSignupClick}>
                  Login
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
