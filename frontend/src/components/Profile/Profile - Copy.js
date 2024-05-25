import React, { useState } from 'react';
import "../Products/Home.css";
import ProductCard from '../Products/ProductCard';

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: "User Name",
    email: "user@example.com",
    birthday: "January 1, 1990",
    password: "********"
  });
  
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const toggleEditMode = () => {
    setEditMode(prevMode => !prevMode);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const renderProfileDetails = () => {
    return (
      <>
        <div class="d-flex justify-content-between align-items-center">
          <h4 className='mb-4'><i className="fa fa-user" /> Profile Details</h4>
          <div className="d-flex gap-10 mb-4 align-items-center">
            <div>
              <h6 className="edit text-secondary" onClick={toggleEditMode}>
                <i className="fa fa-pencil pe-1" />
                Edit Profile
              </h6>
            </div>
          </div>
        </div>
        

        <div className="row">
          <div className="col-6 mb-3">
            <div className="profile-detail-bubble bg-light text-secondary  p-3 shadow-sm rounded-2">
              <p>Name: {editMode ? 
                  <input type="text" className="form-content" name="name" value={userData.name} onChange={handleInputChange} /> : userData.name}
              </p>
            </div>
          </div>
          <div className="col-6 mb-3">
            <div className="profile-detail-bubble text-secondary bg-light p-3 shadow-sm rounded-2">
              <p>Email: {editMode ? <input type="text" name="email" value={userData.email} onChange={handleInputChange} /> : userData.email}</p>
            </div>
          </div>
          <div className="col-6 mb-3">
            <div className="profile-detail-bubble bg-light text-secondary  p-3 shadow-sm rounded-2">
              <p>Birthday: {editMode ? <input type="text" name="birthday" value={userData.birthday} onChange={handleInputChange} /> : userData.birthday}</p>
            </div>
          </div>
          <div className="col-6 mb-3">
            <div className="profile-detail-bubble bg-light text-secondary  p-3 shadow-sm rounded-2">
              <p>Password: 
                 {editMode ? <input type="password" name="password" value={userData.password} onChange={handleInputChange} /> : "********"}</p>
            </div>
          </div>
        </div>
        {editMode && (
          <button className="btn btn-dark" onClick={toggleEditMode}>Save Changes</button>
        )}
      </>
    );
  };

  const vouchers = [
    { id: 1, code: "VOUCHER1", discount: "10%" },
    { id: 2, code: "VOUCHER2", discount: "20%" },
    { id: 3, code: "VOUCHER3", discount: "15%" },
    { id: 4, code: "VOUCHER4", discount: "25%" }
  ];

  return (
    <div className="profile-wrapper home-wrapper-2">
      <div className="container-xxl"> 
        <div className="row">
          <div className="col-3">
            <div className="profile-side-menu m-4">
              <div className="d-flex gap-10 align-items-center">
                <div>
                  <img src="https://i.pinimg.com/736x/c0/74/9b/c0749b7cc401421662ae901ec8f9f660.jpg" className="rounded-circle" alt="Profile" style={{ width: "50px", height: "50px" }} />
                </div>
                <div>
                  <h5>{userData.name}</h5> 
                  <h6 className="text-secondary" onClick={toggleEditMode}>
                    <i className="fa fa-pencil pe-1" />
                    Edit Profile
                  </h6>
                </div>
              </div>
              
              <div className="my-account-card mt-3">
                <h6 onClick={() => handleOptionClick('profile')}>
                  <i className="fa fa-user pe-1" /> Profile Details
                </h6>
              </div>

              <h6 className='mt-3' onClick={() => handleOptionClick('vouchers')}>
                <i className="fa fa-solid fa-ticket pe-1"></i>My Vouchers
              </h6>
              <h6 className='mt-3' onClick={() => handleOptionClick('wishlist')}>
                <i className="fa fa-heart pe-1">  </i>
                  My Wishlist
              </h6>
            </div>
          </div>

          <div className="col-9">
            <div className="profile-card bg-white shadow rounded-2 p-4 m-4">
              {selectedOption === 'profile' && renderProfileDetails()}

              {selectedOption === 'vouchers' && (
                <>
                  <h4><i className="fa fa-solid fa-ticket mb-4"></i> My Vouchers</h4>
                  <div className="row">
                    {vouchers.map(voucher => (
                      <div key={voucher.id} className="col-6 mb-3">
                        <div className="voucher-card bg-white shadow-sm rounded-2 p-3">
                          <h5>Voucher Code: {voucher.code}</h5>
                          <p>Discount: {voucher.discount}</p>
                          <p className="small font-blue text-decoration-underline">T&amp;C</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {selectedOption === 'wishlist' && (
                <>
                  <h4 className='mb-4'><i className="fa fa-heart"></i> My Wishlist</h4>
                  <div className="row">
                      <ProductCard />
                      <ProductCard />
                      <ProductCard /> 
                      <ProductCard />
                      <ProductCard />
                      <ProductCard />
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
