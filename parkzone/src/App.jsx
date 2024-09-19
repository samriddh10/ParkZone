import React from 'react';
import Home from './jsx/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './jsx/Login';
import Signup from './jsx/Signup';


function App() {
  return (
    <Router>
      <Routes>
        {/* Define the Login route as the default page */}
        <Route path="/" element={<Login />} />
        {/* Define the Home route */}
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element ={<Signup/>}/>
      </Routes>
    </Router>
  );
}

export default App;


