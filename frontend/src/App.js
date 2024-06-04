import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Account/Navbar";
import Signup from "./components/Account/Signup";
import Login from "./components/Account/Login";
import PasswordResetRequest from "./components/Account/PasswordResetRequest";
import PasswordReset from "./components/Account/PasswordReset";

function App() {
  const AppContent = () => {
    const location = useLocation();

    // List of paths where the Navbar should be hidden
    const hideNavbarPaths = [
      /^\/login$/,
      /^\/signup$/,
      /^\/resetPassword$/,
      /^\/resetPassword\/.+$/, // Regex to match /resetPassword/:token
      /^\/$/ // Root path
    ];

    // Check if the current path matches any of the hideNavbarPaths
    const hideNavbar = hideNavbarPaths.some(path => path.test(location.pathname));

    return (
      <div className="App">
        {!hideNavbar && <Navbar />}
        <div className="content">
          <Routes>
            {/* <Route path="/" element={<Signup />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resetPassword" element={<PasswordResetRequest />} />
            <Route path="/resetPassword/:token" element={<PasswordReset />} />
<<<<<<< HEAD
=======
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Product />} />
              <Route path="/browse" element={<OurStore />} />
              <Route path={`/product/:productId`} element={<SingleProduct />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/Wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<PaymentProcessing/>} />
              <Route path="/cart" element={<Cart />} />
              
              <Route path="/support" element={<Support />}></Route>
              <Route path="/support/FAQ" element={<Faq />} />
              <Route path="/support/ContactUs" element={<ContactUs />} />
              <Route path="/support/Contactchatbot" element={<ContactChatbot />} />

              <Route path="/manageorders" element={<ManageOrder />} />
              <Route path={`/track-order/:orderId`} element={<TrackOrderPage/>} />
            </Route>
>>>>>>> 8de9aec165486f536382fe466ac0a59b9155a93e
          </Routes>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;