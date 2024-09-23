import React from "react";
import ProtectedRoute from "./jsx/auth/ProtectedRoutes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./jsx/Home";
import Login from "./jsx/Login";
import Signup from "./jsx/Signup";
import Logout from "./jsx/Logout";
import ChangePassword from "./jsx/ChangePassword";
import Profile from "./jsx/Profile";
import Dashboard from "./jsx/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>}/>
        <Route path="/changepassword" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>}/>

      </Routes>
    </Router>
  );
}

export default App;
