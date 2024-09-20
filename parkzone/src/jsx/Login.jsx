import Header from "./Header";
import "./css/Login.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import React, { useState } from "react";
import axios from "axios"; // Import Axios for API requests

function Login() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [showDialog, setShowDialog] = useState(true);
  const [signUpType, setSignUpType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // For error handling

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

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const role = signUpType; // Either 'User' or 'Owner'

    try {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, role }),
        });

        const data = await response.json();

        if (response.ok) {
            // Store the JWT token and role in localStorage/sessionStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);

            // Redirect based on role
            if (data.role === "User") {
                navigate("/user-dashboard");
            } else if (data.role === "Owner") {
                navigate("/owner-dashboard");
            }
        } else {
            console.error("Login failed:", data.error);
        }
    } catch (error) {
        console.error("Error:", error);
    }
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
    </div>
  );
}

export default Login;
