import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

//Star rating value
// let ratingValue = 3;
let ratingEdit = false;
// let productLink = "/home";



const SpecialProduct = (props) => {
    const {_id, productBrand, productTitle, productLink, productImages,  productPrice, discount, ratingValue, stockCurrent, stockMax, specialProduct} = props;

    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);
    const productId = _id;
    const userJSON = localStorage.getItem('loggedInUser');
    // Parse the JSON string to convert it into a JavaScript object
    const user = JSON.parse(userJSON);
    // Access the _id property of the object
    const userId = (user != null) ? user._id : null;
    console.log(user)

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
            alert('product added to cart')  
        } catch (error) {
            console.error(error);
        }
    };

  return (
    <div class="col-6 mb-3">
    <Link class='a' to={`/product/${_id}`}>
      <div class="special-product-card bg-grey shadow-sm ">
            <div class="d-flex justify-content-between p-3">
                <div>
                    <img class="product-image img-fluid shadow-sm rouded-3"
                    src={productLink} alt="watch alt" />
                </div>

                <div class="special-product-content px-5 w-100">
                    <h6 class="brand">{productBrand}</h6>
                    <h5 class="product-title">{productTitle}</h5>
                    <ReactStars
                    count={5}
                    size ={24}
                    value={ratingValue}
                    edit= {ratingEdit}
                    activeColor='#ffd700' />
                    <p class="price">
                        <span class="red-p">RM{productPrice-discount}</span>
                        &nbsp;
                        {(discount > 0) ? <strike>RM{productPrice}</strike> : null}
                    </p>
                    
                    <div class="discount-till mb-5">
                        <p>Quantity: </p>
                        <div class="progress">
                            <div class="progress-bar"
                            role="progressBar"
                            style={{width: `${(stockCurrent/stockMax)*100}%`}}
                            aria-valuenow="25"
                            aria-valuemin='0'
                            aria-valuemax='100'
                            ></div>
                        </div>

                        
                    </div>
                    
                    <button class="button button-sm" onClick={addToCart}
                    style={{
                        position: 'relative'
                    }}>
                        {/* <i class="fa fa-cart-plus fa-3x fa-pull-left position-absolute"></i> */}
                        Add to Cart
                    </button>
                </div>

                
            </div>
      </div>
    </Link>
    </div>
  )
}

export default SpecialProduct
