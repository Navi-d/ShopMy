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
    //window.location.reload();
    const {_id, productBrand, productTitle, productLink, productImages,  productPrice, discount, ratingValue} = props;
    const productId = _id;
    const ratingEdit = false; // Assuming ratingEdit should always be false
    const [addedToWishlist, setAddedToWishlist] = useState(false);
    const [wishlist, setWishlist] = useState([]);
    const location = useLocation();

    const userJSON = localStorage.getItem('loggedInUser');
    // Parse the JSON string to convert it into a JavaScript object
    const user = JSON.parse(userJSON);
    // Access the _id property of the object
    const userId = (user != null) ? user._id : null;
    console.log(user)

    const addToWishlist= async (e) => {
        // e.preventDefault(); //don't refresh page
        try {
            if(user == null) {
                alert("Sign In to continue");
                return;
            }
            const response = await axios.post('http://localhost:3001/api/wishlist/addToWishlist', {userId, productId});
            console.log('data added to wishlist: '+ response.data); // Assuming backend responds with user data
            setAddedToWishlist(!addedToWishlist)
        } catch (error) {
            alert('error')
            console.error(error);
        }
    };

    const removeWishlist= async (e) => {
        // e.preventDefault(); //don't refresh page
        if(user == null) {
            alert("SignIn to continue");
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/wishlist/removeFromWishlist', {userId, productId});
            console.log('data remove to wishlist: '+ response.data); // Assuming backend responds with user data
    
        } catch (error) {
            console.error(error);
        }
    };


    const addToCart= async (e) => {
        // e.preventDefault(); //don't refresh page
        if(user == null) {
            alert("SignIn to continue");
            return;
        }

        const one = 1;
        try {
            const response = await axios.post('http://localhost:3001/api/cart/addToCart', {userId, productId, one});
            console.log('data added to cart: '+ response.data); // Assuming backend responds with user data
    
        } catch (error) {
            console.error(error);
        }
    };
    
        
    
    

    //Inside bootstraprow component
  return (
    <div class="col" style={{"min-width": "250px", "max-width" : "312px"}}>
      <Link class='a' 
      to={`/product/${_id}`} 
      onClick={e => {
        
      }}>

        <div class="product-card position-relative my-2">
            <div class="wishlist-icon position-absolute align-items-right">
                <Link onClick={() => {
                    if(addedToWishlist) {
                        removeWishlist();
                    } else
                        addToWishlist(); 
                    }}>
                    {
                        addedToWishlist ? <i class="fa fa-heart"></i> : <i class="fa fa-heart-o"></i>
                    }
                    
                </Link>
            </div>

            <div class="product-image mx-2">
                <img 
                class="img-fluid rounded-3"
                src={productLink} 
                alt="prod Img"/>

                <img 
                class="img-fluid rounded-3"
                src={(productImages != null) ? productImages[1] : null}
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

                {/* <p class="price">RM{productPrice-discount}</p> */}
                <p class="price">
                    <span class="red-p">RM{productPrice-discount}</span>
                    &nbsp;
                    {(discount > 0) ? <strike>RM{productPrice}</strike> : null}
                </p>
                
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
