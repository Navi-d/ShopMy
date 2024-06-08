import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

// //Star rating value
// let ratingValue = 3;
// let ratingEdit = false;
// let productLink = "/product";
// let productTitle = 'Ring Video Doorbell, Venetian Bronze with All-new Ring Indoor Cam';
// let productBrand = 'Amazon';
// let productPrice = '100.00';]
//posting data


const ProductCard = (props) => {
    const {_id, productBrand, productTitle, productLink,   productPrice, ratingValue} = props;
    const productId = _id;
    const ratingEdit = false; // Assuming ratingEdit should always be false
    const [addedToWishlist, setAddedToWishlist] = useState(false);
    const [wishlist, setWishlist] = useState([]);

    const userJSON = localStorage.getItem('loggedInUser');
    // Parse the JSON string to convert it into a JavaScript object
    const user = JSON.parse(userJSON);
    // Access the _id property of the object
    const userId = user._id;
    console.log(user)

    const addToWishlist= async (e) => {
        // e.preventDefault(); //don't refresh page
        try {
            const response = await axios.post('http://localhost:3001/addToWishlist', {userId, productId});
            console.log('data added to wishlist: '+ response.data); // Assuming backend responds with user data
    
        } catch (error) {
            console.error(error);
        }
    };

    const removeWishlist= async (e) => {
        // e.preventDefault(); //don't refresh page
        try {
            const response = await axios.post('http://localhost:3001/removeFromWishlist', {userId, productId});
            console.log('data remove to wishlist: '+ response.data); // Assuming backend responds with user data
    
        } catch (error) {
            console.error(error);
        }
    };


    const addToCart= async (e) => {
        // e.preventDefault(); //don't refresh page
        const one = 1;
        try {
            const response = await axios.post('http://localhost:3001/addToCart', {userId, productId, one});
            console.log('data added to cart: '+ response.data); // Assuming backend responds with user data
    
        } catch (error) {
            console.error(error);
        }
    };
    
    
    
    //Inside bootstraprow component
  return (
    <div class="col" style={{"min-width": "250px", "max-width" : "312px"}}>
      <Link class='a' to={`/product/${_id}`}>
        <div class="product-card position-relative my-2">
            <div class="wishlist-icon position-absolute align-items-right">
                <Link onClick={() => {
                    if(addedToWishlist) {
                        removeWishlist();
                    } else
                        addToWishlist(); 
                    setAddedToWishlist(!addedToWishlist)
                    }}>
                    {
                        addedToWishlist ? <i class="fa fa-heart"></i> : <i class="fa fa-heart-o"></i>
                    }
                    
                </Link>
            </div>

            <div class="product-image">
                <img 
                class="img-fluid rounded-3"
                src="https://m.media-amazon.com/images/I/51L70T4ehHL._SX425_.jpg" 
                alt="prod Img"/>

                <img 
                class="img-fluid rounded-3"
                src="https://m.media-amazon.com/images/I/51KfTljedfL._SX425_.jpg"
                alt="prod Img" />

            </div>
            {/*  */}
            <div class="product-details py-3">
                <h6 class="brand">{productBrand}</h6>
                <h5 class="product-title">
                    {productTitle}
                </h5>
                <ReactStars
                    count={5}
                    size ={24}
                    value={ratingValue}
                    edit= {ratingEdit}
                    activeColor='#ffd700' />

                <p class="price">RM{productPrice}</p>
                
            </div>

            <div class="action-bar position-absolute">
                <div class="d-flex flex-column gap-15">
                    <Link to={`/product/${_id}`} >
                        <i class="fa fa-eye"></i>
                    </Link>

                    {
                        //Add to cart 
                        //Perhaps can change to button
                        //Cart Icon in Card view of product
                    }
                    <Link >
                        <i onClick={() => addToCart()}class="fa fa-cart-plus"></i>
                    </Link>
                </div>
            </div>
        </div>
    
      </Link>
      
    </div>
  )
}

export default ProductCard
