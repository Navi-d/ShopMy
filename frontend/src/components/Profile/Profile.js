import React from 'react'
import "../Products/Home.css";

const Profile = () => {
  return (
    <div class="profile-wrapper home-wrapper-2">
        <div class="container-xxl"> 
            <div class="row">
                <div class="col-3">
                    <div class="profile-side-menu m-4">
                        <div class="d-flex gap-10">
                           <i class="fa fa-user fa-3x" />

                           <div class="div">
                                <h5>Navid Razavi</h5> 
                                <h6 class="text-secondary">
                                    <i class="fa fa-pencil pe-2" />
                                    Edit Profile
                                </h6>
                           </div>
                            
                        </div>
                        
                        <div class="my-account-card">
                            <h5><i class="fa fa-user-o pe-2" />My Account</h5>
                        </div>

                        <h5><i class="fa fa-ticket pe-2" />My Vouchers</h5>
                        <h5><i class="fa fa-heart-o pe-2" />My Wishlist</h5>
                    </div>
                </div>

                <div class="col-9">
                    <div class="profile-card bg-white shadow rounded-2 p-4 m-4">
                        <h4>This is Title of Profile Card</h4>
                        <h6 class="text-secondary">Some data</h6>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile