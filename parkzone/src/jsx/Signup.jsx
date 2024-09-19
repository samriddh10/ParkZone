import Header from "./Header";
import "./css/Signup.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Signup() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignupClick = () => {
    navigate("/"); // Navigate to the signup route
  };

  return (
    <div>
      <Header />

      <div 
        className="signup"
        style={{
          backgroundImage: "url(/assets/car-parking-app.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        
        >
        <form id="login-form">
          <div className="top">
            <div className="logo">ParkZone</div>
            <div>
              <input
                className="userid"
                type="Name"
                placeholder="Name"
                id="name"
              />
            </div>
            <div>
              <input
                className="userid"
                type="date"
                placeholder="Date of Birth"
                id="dob"
              />
            </div>
            <div>
              <input
                className="userid"
                type="phone"
                placeholder="Conatact Number"
                id="phone"
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
              />
              Male
              <input
                className="gender"             
                type="radio"
                name="gender"
                value="female"
                id="female"
              />
              Female
              <input
                className="gender"
                type="radio"
                name="gender"
                value="female"
                id="other"
              />
              Other
            </div>

            <div>
              <input
                className="userid"
                type="email"
                placeholder="Email"
                id="email"
              />
            </div>
            <div>
              <input
                className="userid"
                type="password"
                placeholder="Password"
                id="password"
                required
              />
            </div>
            <div>
              <button className="login-button" type="submit">
                Signup
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
  );
}

export default Signup;
