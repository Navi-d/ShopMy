import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Products/Home.css";
import ProductCard from '../Products/ProductCard';
import { format } from 'date-fns';


const Profile = () => {
  const [selectedOption, setSelectedOption] = useState('wishlist');
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({});
  const [newVoucher, setNewVoucher] = useState('');
  const [vouchers, setVouchers] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {
    fetchProfileData();
    fetchUserVouchers();
  }, []);

  const fetchProfileData = async () => {
    try {
      const userJSON = localStorage.getItem('loggedInUser');
      const user = JSON.parse(userJSON);
      const userId = user._id;

      const loggedInUser = await axios.get(`http://localhost:3001/getUser/${userId}`);
      if (user) {
        setUserData(loggedInUser.data);
      } else {
        // Redirect or handle not logged in case
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  const fetchUserVouchers = async () => {
    try {
      const userJSON = localStorage.getItem('loggedInUser');
      const user = JSON.parse(userJSON);
      const userId = user._id;

      const response = await axios.get(`http://localhost:3001/getUserVouchers/${userId}`);
      console.log(response.data);

      setVouchers(response.data);
    } catch (error) {
      console.error('Error fetching user vouchers:', error);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const toggleEditMode = async () => {
    if (editMode) {
      try {
        const response = await axios.put('http://localhost:3001/users/', userData);
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

      const response = await axios.post(`http://localhost:3001/saveUser`, {userId, userData});
      // setUserData(response.data);
      // alert(loggedInUser.data.username)
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  }

  const handleAddVoucher = async () => {
    if (newVoucher.trim() !== '') {
      try {
        const userJSON = localStorage.getItem('loggedInUser');
        const user = JSON.parse(userJSON);
        const userId = user._id;

        // Check if the voucher exists in the database
        const voucherResponse = await axios.get(`http://localhost:3001/api/vouchers/checkVoucher/${newVoucher}`);
          
        if (voucherResponse.data.exists) {
          // Add the voucher to the user's vouchers
          const addVoucherResponse = await axios.post(`http://localhost:3001/addVoucher`, { userId, voucherId: voucherResponse.data.voucher._id });
          if (addVoucherResponse.status === 200) {
            setShowSuccessPopup(true);
            fetchUserVouchers(); // Fetch updated vouchers
            setNewVoucher('');

            setTimeout(() => {
              setShowSuccessPopup(false);
            }, 2000);
          } else {
            setShowErrorPopup(true);
            setTimeout(() => {
              setShowErrorPopup(false);
            }, 2000);
          }
        } else {
          setShowErrorPopup(true);
          setTimeout(() => {
            setShowErrorPopup(false);
          }, 2000);
        }
      } catch (error) {
        console.log('Error adding voucher:', error);
        
      }
    }
  };

  const handleDeleteVoucher = async (voucherId) => {
    try {
      console.log(voucherId);
      const userJSON = localStorage.getItem('loggedInUser');
      const user = JSON.parse(userJSON);
      const userId = user._id;

      const response = await axios.post(`http://localhost:3001/removeVoucher`, { userId, voucherId });
      console.log(response)
      if (response.status === 200) {
        fetchUserVouchers(); // Fetch updated vouchers
      }
    } catch (error) {
      console.error('Error deleting voucher:', error);
    }
  };

  

  const renderProfileDetails = () => {
    return (
      <>
        <h4><img src="https://img.freepik.com/premium-vector/man-illustration_814363-190.jpg?w=1480" className="rounded-circle" alt="Profile" style={{ width: "50px", height: "50px" }} />  
        - Profile Details</h4>
        <div className="row">
          <div className="col-6 mb-3">
            <div className={`profile-detail-bubble bg-light p-3 shadow rounded-2 ${editMode ? 'edit-mode' : ''}`}>
              <p>Name: {editMode ? <input type="text" name="username" value={userData.username} onChange={handleInputChange} /> : userData.username}</p>
            </div>
          </div>
          <div className="col-6 mb-3">
            <div className={`profile-detail-bubble bg-light p-3 shadow rounded-2 ${editMode ? 'edit-mode' : ''}`}>
              <p>Email: {editMode ? <input type="email" name="email" value={userData.email} onChange={handleInputChange} /> : userData.email}</p>
            </div>
          </div>
          <div className="col-6 mb-3">
          <div className={`profile-detail-bubble bg-light p-3 shadow rounded-2 ${editMode ? 'edit-mode' : ''}`}>
            <p>Birthdate: 
                {editMode ? (
                  <input 
                    type="date" 
                    name="birthdate" 
                    value={userData.birthdate ? userData.birthdate.split('T')[0] : ''} 
                    onChange={handleInputChange} 
                  />
                ) : (
                  userData.birthdate ? userData.birthdate.split('T')[0] : ''
                )}</p>
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
              // console.log('data is\n'+ response.data); // Assuming backend responds with user data
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
  if (!userData.wishlist || !Array.isArray(userData.wishlist)) {
    return <p>No wishlist data available</p>;
  }

  const wishlistProducts = products.filter(product =>
    userData.wishlist.some(item => item.productId === product._id)
  );

  return (
    <>
      <h4><i className="fa fa-heart" /> My Wishlist</h4>
      {wishlistProducts.length > 0 ? (
        <div className="row">
          {wishlistProducts.map((item) => (
            <ProductCard key={item._id} {...item} />
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
                        <div key={voucher._id} className="col-md-4 mb-3">
                          <div className="voucher-card bg-white shadow rounded-2 p-3">
                            <h5>Voucher Code: {voucher.voucherId.code}</h5>
                            <p>Discount: {voucher.voucherId.discount}</p>
                            <p>Expiry Date: {format(new Date(voucher.voucherId.expiryDate), 'MMMM dd, yyyy')}</p>
                            <button className="btn btn-danger" onClick={() => handleDeleteVoucher(voucher._id)}>
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
