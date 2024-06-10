import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const username = loggedInUser ? loggedInUser.username : '';
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('loggedInUser');
        // Reset the navigation stack to only have the login page
        navigate('/login', { replace: true });
    };

    return (
        <div className="main-navbar shadow-sm sticky-top">
            <div className="top-navbar">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
                            <h5 className="brand-name">ShopMY</h5>
                        </div>
                        <div className="col-md-5 my-auto">
                            <form role="search">
                                <div className="input-group">
                                    <input type="search" placeholder="Search your product" className="form-control" />
                                    <button className="btn bg-white" type="submit">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-5 my-auto">
                            <ul className="nav justify-content-end">
                                {loggedInUser ? (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#">
                                                <i className="fa fa-shopping-cart"></i> Cart (0)
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/profile">
                                                <i className="fa fa-heart"></i> Wishlist (0)
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fa fa-user"></i> {username}
                                            </a>
                                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <Link className="dropdown-item" to="/profile"><i className="fa fa-user"></i> Profile</Link>
                                                <li><a className="dropdown-item" href="#"><i className="fa fa-list"></i> My Orders</a></li>
                                                <Link className="dropdown-item" to="/profile"><i className="fa fa-heart"></i> My Wishlist</Link>
                                                <li><a className="dropdown-item" href="#"><i className="fa fa-shopping-cart"></i> My Cart</a></li>
                                                <li><button className="dropdown-item" onClick={handleSignOut}><i className="fa fa-sign-out"></i> Sign out</button></li>
                                            </ul>
                                        </li>
                                    </>
                                ) : (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            <i className="fa fa-sign-in"></i> Sign in
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand d-block d-sm-block d-md-none d-lg-none" href="#">
                        Funda Ecom
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="/home">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">All Categories</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">New Arrivals</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Featured Products</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Electronics</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Fashions</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Accessories</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Appliances</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;