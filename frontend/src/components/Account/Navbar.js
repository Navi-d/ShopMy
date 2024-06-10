import React, { useEffect, useState, useRef, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "../Products/search-bar.css"
import axios from 'axios';
import { GlobalContext } from '../Common/GlobalContext.js';


function Navbar() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('');
    const [searchFocus, setSearchFocus] = useState(false);
    // const { globalState, setGlobalState } = useContext(GlobalContext);
    
    //Get Products
    useEffect(() => {
        const products = async (e) => {
            // e.preventDefault(); //don't refresh page
            try {
                if (!query) {
                    // If query is empty, set products to an empty array
                    setProducts(null);
                    setLoading(false);
                    setSearchFocus(false);
                    return; // Exit the function early
                }
                
                const response = await axios.get(`http://localhost:3001/searchProduct/${query}`);
                setProducts(response.data);
                setLoading(false);
                console.log("final data is" + response.data);
            } catch (error) {
            console.error(error);
            }
        }
        
        //call the method
        products();
      }, [query]);


       
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const username = loggedInUser ? loggedInUser.username : '';
    const navigate = useNavigate();
    const location = useLocation();

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
                                    <input type="search" placeholder="Search your product" className="form-control" 
                                    onChange={(e) => {setQuery(e.target.value); setSearchFocus(true)}} 
                                    onFocus={(e) => {
                                        if(e.target.value !== '' && query !== '') {setSearchFocus(true)}
                                    }} 
                                    onBlur={(e) => { 
                                        if (e.target.value === '') { 
                                            setSearchFocus(false)
                                        } 
                                      }} 
                                    />

                                    <Link
                                        onClick={(e) => {
                                            setQuery(''); 
                                            if(location.pathname === '/browse')
                                                window.location.reload();}
                                            } 

                                        to={`/browse`}
                                        state={products}>

                                        <button className="btn bg-white" type="submit">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </Link>
                                    

                                    {//Add serach list}
                                    //Filter by product brand if clicked from search
                                            }
                                    
                                    <div class="search-list p-2 bg-white rounded shadow-sm" 
                                    id="search-list"
                                    style = {{
                                        display: searchFocus ? 'block' : 'none'
                                    }}>
                                        {
                                            products?.map((items) => {
                                                return <Link class="a"
                                                onClick={(e) => {
                                                    setQuery(`${items.productBrand}`); 
                                                    if(location.pathname === '/browse')
                                                        window.location.reload();}
                                                    } 

                                                to={`/browse`}
                                                state={products}>
                                                    <div key={items._id}>{items.productTitle}</div>
                                                </Link>
                                                
                                            })
                                            
                                        }
                                    </div>
                                </div>
                            </form>

                            
                        </div>
                        <div className="col-md-5 my-auto">
                            <ul className="nav justify-content-end">
                                {loggedInUser ? (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/cart">
                                                <i className="fa fa-shopping-cart"></i> Cart ({0})
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/wishlist">
                                                <i className="fa fa-heart"></i> Wishlist (0)
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fa fa-user"></i> {username}
                                            </a>
                                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <li><a class="dropdown-item" href="/profile"><i class="fa fa-user"></i> Profile</a></li>
                                                <li><a class="dropdown-item" href="/manageorders"><i class="fa fa-list"></i> My Orders</a></li>
                                                <li><a class="dropdown-item" href="/support"><i class="fa fa-headphones"></i> Support</a></li>
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
            <nav className="bottom-navbar navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand d-block d-sm-block d-md-none d-lg-none" href="#">
                        ShopMY
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
