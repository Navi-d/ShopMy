// App.js
import React from 'react';
import Navbar from "./components/Account/Navbar";
import Signup from "./components/Account/Signup";
import Login from "./components/Account/Login";
import PasswordResetRequest from "./components/Account/PasswordResetRequest";
import PasswordReset from "./components/Account/PasswordReset";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Support from './components/Support/Support';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resetPassword" element={<PasswordResetRequest />} />
            <Route path="/resetPassword/:token" element={<PasswordReset />} />
            <Route path="/support" element={<Support/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
