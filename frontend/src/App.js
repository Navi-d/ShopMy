import React from 'react';
import Navbar from "./components/Account/Navbar";
import Signup from "./components/Account/Signup";
import Login from "./components/Account/Login";
import PasswordResetRequest from "./components/Account/PasswordResetRequest";
import PasswordReset from "./components/Account/PasswordReset";
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import OurStore from "./components/Products/OurStore"
import Product from "./components/Products/HomePage"
import SingleProduct from "./components/Products/SingleProduct"
import Profile from "./components/Profile/Profile"
import Layout from "./components/Common/Layout"
import Checkout from "./components/Checkout/Checkout"
import PaymentProcessing from "./components/Checkout/PaymentProcessing"
import Support from "./components/Support/Support"
import Cart from "./components/Cart/Cart"
import ManageOrder from './components/ManageOrder/manageorder.js';
import TrackOrderPage from './components/ManageOrder/trackorder.js';
import Faq from './components/Support/Faq.js';
import ContactUs from './components/Support/ContactUs.js';
import ContactChatbot from './components/Support/ContactChatbot.js';
import Wishlist from './components/Profile/Wishlist';



function App() {
  const AppContent = () => {
    const location = useLocation();

    const hideNavbarPaths = ['/login', '/signup', '/resetPassword', '/'];

    const hideNavbar = hideNavbarPaths.includes(location.pathname);
    let order = 1;

    return (
      <div className="App">
        {!hideNavbar && <Navbar />}
        <div className="content ">
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/resetPassword" element={<PasswordResetRequest />} />
            <Route path="/resetPassword/:token" element={<PasswordReset />} />
            
            <Route path="/" element={<Layout />}>
              <Route path="/home" element={<Product />} />
              <Route path="/browse" element={<OurStore />} />
              <Route path="/product" element={<SingleProduct />} />
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