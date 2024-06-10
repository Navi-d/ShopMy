import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Products/Home.css";
import ProductCard from '../Products/ProductCard';

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [newVoucher, setNewVoucher] = useState('');

  const [vouchers, setVouchers] = useState([
    { id: 1, code: "VOUCHER1", discount: "10%", expiryDate: "2024-06-01" },
    { id: 2, code: "VOUCHER2", discount: "20%", expiryDate: "2024-06-15" },
    { id: 3, code: "VOUCHER3", discount: "15%", expiryDate: "2024-07-01" },
    { id: 4, code: "VOUCHER4", discount: "25%", expiryDate: "2024-07-15" }
  ]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);


  useEffect(() => {
    addVoucher();
  }, []);

  const checkVoucher = () => {

  }
  
  const addVoucher = async () => {
    try {
      // const localData = JSON.parse(localStorage.getItem('loggedInUser'));
      const userJSON = localStorage.getItem('loggedInUser');
      // Parse the JSON string to convert it into a JavaScript object
      const user = JSON.parse(userJSON);
      // Access the _id property of the object
      const userId = user._id;
      console.log("User id is " + userId);

      const loggedInUser = await axios.get(`http://localhost:3001/getUser/${userId}`)
      if (user) {
        console.log("Mohammed's user data is " + loggedInUser)
        setUserData(loggedInUser.data);
        // alert(loggedInUser.data.username)
      } else {
        // Redirect or handle not logged in case
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };


  useEffect(() => {
    fetchProfileData();
  }, []);


  const fetchProfileData = async () => {
    try {
      // const localData = JSON.parse(localStorage.getItem('loggedInUser'));
      const userJSON = localStorage.getItem('loggedInUser');
      // Parse the JSON string to convert it into a JavaScript object
      const user = JSON.parse(userJSON);
      // Access the _id property of the object
      const userId = user._id;
      console.log("User id is " + userId);

      const loggedInUser = await axios.get(`http://localhost:3001/getUser/${userId}`)
      if (user) {
        console.log("Mohammed's user data is " + loggedInUser)
        setUserData(loggedInUser.data);
        // alert(loggedInUser.data.username)
      } else {
        // Redirect or handle not logged in case
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };



  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const toggleEditMode = async () => {
    if (editMode) {
      try {
        const response = await axios.put('http://localhost:3001/users/', userData);
        console.log(response.data);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
    setEditMode(prevMode => !prevMode);
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSaveData = async () => {
    try {
      // const localData = JSON.parse(localStorage.getItem('loggedInUser'));
      const userJSON = localStorage.getItem('loggedInUser');
      // Parse the JSON string to convert it into a JavaScript object
      const user = JSON.parse(userJSON);
      // Access the _id property of the object
      const userId = user._id;
      console.log("User id is " + userId);

      const response = await axios.post(`http://localhost:3001/saveUser`, {userId, userData});
      // setUserData(response.data);
      // alert(loggedInUser.data.username)
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  }

  const handleAddVoucher = () => {
    if (newVoucher.trim() !== '') {
      const newVoucherObj = { id: vouchers.length + 1, code: newVoucher, discount: 'Unknown', expiryDate: "YYYY-MM-DD" }; // Add a placeholder expiry date
      setVouchers([...vouchers, newVoucherObj]);
      setNewVoucher('');
      setShowSuccessPopup(true);

      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 2000);
    }
  };

  const handleDeleteVoucher = (id) => {
    setVouchers(vouchers.filter(voucher => voucher.id !== id));
  };

  

  const renderProfileDetails = () => {
    return (
      <>
        <h4><img src="https://img.freepik.com/premium-vector/man-illustration_814363-190.jpg?w=1480" className="rounded-circle" alt="Profile" style={{ width: "50px", height: "50px" }} />  
        - Profile Details</h4>
        <div className="row">
          <div className="col-6 mb-3">
            <div className={`profile-detail-bubble bg-light p-3 shadow rounded-2 ${editMode ? 'edit-mode' : ''}`}>
              <p>Name: {editMode ? <input type="text" name="name" value={userData.username} onChange={handleInputChange} /> : userData.username}</p>
            </div>
          </div>
          <div className="col-6 mb-3">
            <div className={`profile-detail-bubble bg-light p-3 shadow rounded-2 ${editMode ? 'edit-mode' : ''}`}>
              <p>Email: {editMode ? <input type="email" name="email" value={userData.email} onChange={handleInputChange} /> : userData.email}</p>
            </div>
          </div>
          <div className="col-6 mb-3">
            <div className={`profile-detail-bubble bg-light p-3 shadow rounded-2 ${editMode ? 'edit-mode' : ''}`}>
              <p>Birthday: {editMode ? <input type="date" name="birthdate" value={userData.birthdate} onChange={handleInputChange} /> : userData.birthdate}</p>
            </div>
          </div>
          <div className="col-6 mb-3">
            <div className={`profile-detail-bubble bg-light p-3 shadow rounded-2 ${editMode ? 'edit-mode' : ''}`}>
              <p>Password: {editMode ? <input type="password" name="password" value={userData.password} onChange={handleInputChange} /> : "********"}</p>
            </div>
          </div>
        </div>
        {!editMode && (
          <button className="btn btn-primary me-5 mb-5" onClick={toggleEditMode}>Edit</button>
        )}
        {editMode && (
          <button className="btn btn-primary me-5 mb-5" onClick={ () => {
              handleSaveData();
              toggleEditMode();
            }
          }>Save Changes</button>
        )}
      </>
    );
  };
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);


  //Get Products
  useEffect(() => {
      const products = async (e) => {
          // e.preventDefault(); //don't refresh page
          try {
              const response = await axios.get('http://localhost:3001/getProducts');
              setProducts(response.data);
              setLoading(false);
              console.log('data is\n'+ response.data); // Assuming backend responds with user data
          } catch (error) {
          console.error(error);
          }
      }
     
      //call the method
      products();
    }, []);
   
  if(loading) {
      return (
          <div>Loading...</div>
      );
  }
  
  const renderWishlist = () => {
    const wishlistProducts = products.filter(product =>
      userData.wishlist.some(item => item.productId === product._id)
    );
  
    return (
      <>
        <h4><i className="fa fa-heart" /> My Wishlist</h4>
        {wishlistProducts.length > 0 ? (
          <div className="row">
            {wishlistProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p>No products in the wishlist</p>
        )}
      </>
    );
  };
  
  
  
  return (
    <div className="profile-wrapper home-wrapper-2" style={{ minHeight: "100vh", backgroundImage: "url(https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=960,h=640,fit=crop/YBg8Oqy2oQsXp8y5/building-an-ios-app-5-ALpb8Rpn27cGN4wM.png)" }}>
      <div className="container-xxl">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a className={`nav-link ${selectedOption === 'profile' ? 'active' : ''}`} onClick={() => handleOptionClick('profile')}><i class="fa fa-user"></i> Profile Details</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${selectedOption === 'vouchers' ? 'active' : ''}`} onClick={() => handleOptionClick('vouchers')}><i class="fa fa-ticket"></i> Vouchers</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${selectedOption === 'wishlist' ? 'active' : ''}`} onClick={() => handleOptionClick('wishlist')}><i className="fa fa-heart" /> Wishlist</a>
          </li>
        </ul>
        <div className="row">
          <div className="col-12">
                     <div className="profile-card bg-white shadow rounded-2 p-4 m-4">
             {/* Conditional rendering based on selectedOption */}
             {selectedOption === 'profile' && renderProfileDetails()}
             {selectedOption === 'wishlist' && renderWishlist()}
             {selectedOption === 'vouchers' && (
              <>
                <h4><i className="fa fa-ticket"></i> My Vouchers</h4>
                <div className="row">
                  <div className="col-md-6">
                    <input type="text" className="form-control mb-3" placeholder="Enter voucher code" value={newVoucher} onChange={(e) => setNewVoucher(e.target.value)} />
                    <button className="btn btn-success mb-3" onClick={handleAddVoucher}>Add Voucher</button>
                    {showSuccessPopup && (
                      <div className="alert alert-success" role="alert">
                        Voucher added successfully!
                      </div>
                    )}
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      {/* Render vouchers cards */}
                      {vouchers.map(voucher => (
                        <div key={voucher.id} className="col-md-4 mb-3">
                          <div className="voucher-card bg-white shadow rounded-2 p-3">
                            <h5>Voucher Code: {voucher.code}</h5>
                            <p>Discount: {voucher.discount}</p>
                            <p>Expiry Date: {voucher.expiryDate}</p>
                            <button className="btn btn-danger" onClick={() => handleDeleteVoucher(voucher.id)}>
                              <i className="fa fa-trash" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
};


export default Profile;
