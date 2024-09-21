import Header from "./Header";
import "./css/Login.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios"; // Import Axios for API requests

function Login() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [showDialog, setShowDialog] = useState(true);
  const [signUpType, setSignUpType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // For error handling
  const [showPopup, setShowPopup] = useState(false); // State for controlling the popup visibility

  const handleSignupClick = () => {
    navigate("/signup"); // Navigate to the signup route
  };

  const handleUserClick = () => {
    setSignUpType("User");
    setShowDialog(false); // Close dialog
  };

  const handleOwnerClick = () => {
    setSignUpType("Owner");
    setShowDialog(false); // Close dialog
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
        role: signUpType,
      });

      const data = response.data;

      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        if (data.role === "User") {
          navigate("/home");
        } else if (data.role === "Owner") {
          navigate("/home");
        }
      } else {
        setError(data.error); // Set error in state to display it
        triggerPopup(); // Show the popup
      }
    } catch (error) {
      
      triggerPopup(); // Show the popup
    }
  };

  // Function to trigger the popup and hide it after 5 seconds
  const triggerPopup = () => {
    setShowPopup(true); // Show the popup
    setTimeout(() => {
      setShowPopup(false); // Hide the popup after 5 seconds
    }, 5000);
  };

  return (
    <div>
      <Header />
      {showDialog && (
        <div className="dialog">
          <h2>Log In as:</h2>
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
          className="login"
          style={{
            backgroundImage: "url(/assets/car-parking-app.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <form id="login-form" onSubmit={handleLogin}>
            <div className="top">
              <div className="signup-type">
                {signUpType === "User"
                  ? "User Log In"
                  : signUpType === "Owner"
                  ? "Owner Log In"
                  : ""}
              </div>
              <div className="logo">ParkZone</div>
              <div>
                <input
                  className="userid"
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Bind email state
                  required
                />
              </div>
              <div>
                <input
                  className="userid"
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Bind password state
                  required
                />
              </div>
              {error && <div className="error-message">{error}</div>} {/* Show error */}
              <div>
                <button className="login-button" type="submit">
                  Login
                </button>
              </div>
              <div className="forgot-password">Forgot password?</div>
            </div>
            <div className="middle">
              <div className="signup">
                Don't have an account?
                <div className="signup-button" onClick={handleSignupClick}>
                  Sign In
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Pop-up message that appears when login fails */}
      {showPopup && (
        <div className="popup">
          <p>Wrong password. Please try again.</p>
        </div>
      )}
    </div>
  );
}

export default Login;
