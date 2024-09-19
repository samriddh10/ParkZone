
import Header from "./Header";
import "./css/Login.css";
import { useNavigate } from 'react-router-dom';  // Import useNavigate



function Login() {
    const navigate = useNavigate();  // Initialize useNavigate

    const handleSignupClick = () => {
        navigate('/signup');  // Navigate to the signup route
    };

  return (
    <div>
      <Header />
      
      <div 
        className="login"

        style={{ 
            backgroundImage: 'url(/assets/car-parking-app.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            
            }}   
        >
            
        <form id="login-form" >
          <div className="top">
            <div className="logo">ParkZone</div>
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
                    Login
                </button>
            </div>
            <div className="forgot-password">Forgot password?</div>
          </div>
          <div className="middle">
            <div className="signup">
              Don't have an account?
              <div className="signup-button"
                    onClick={handleSignupClick}
              >
                Sign In
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;


