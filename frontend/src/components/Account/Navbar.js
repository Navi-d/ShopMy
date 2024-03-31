import React from 'react'

function Navbar() {
  return (
    <div class="navbar navbar-expand-md navbar-dark bg-dark fixed-top" >
        <div class="container">
            <a href="#" class="navbar-brand">ShopMy</a>
            <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" aria-controls="nav" aria-label="Expand Navigation"><div class="navbar-toggler-icon"></div></button>
            <div class="collapse navbar-collapse" id="nav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a href="#" class="nav-link">Home</a>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">Profile</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar