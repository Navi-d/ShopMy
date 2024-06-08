import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

//Star rating value
// let ratingValue = 3;
let ratingEdit = false;
// let productLink = "/home";

const addToCart = (productId) => {
    //Given the Product Id, add the product to cart. If needed you can pass the whole product information
    //But just for simplicity, pass id then axios(/getProduct/${productId}) to get product details
    return 0
};

const SpecialProduct = (props) => {
    const {_id, productBrand, productTitle, productLink,   productPrice, discount, ratingValue, stockCurrent, stockMax, specialProduct} = props;

    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);


  return (
    <div class="col-6 mb-3">
    <Link class='a' to={`/product/${_id}`}>
      <div class="special-product-card bg-grey shadow-sm ">
            <div class="d-flex justify-content-between p-3">
                <div>
                    <img class="product-image img-fluid shadow-sm rouded-3"
                    src="Products/images/amazon-ring.jpg" alt="watch alt" />
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
                        <span class="red-p">RM{productPrice}</span>
                        &nbsp;
                        <strike>RM{productPrice-discount}</strike>
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
                    
                    <Link class="button button-sm" onClick={addToCart()}>
                        {/* <i class="fa fa-cart-plus fa-3x fa-pull-left position-absolute"></i> */}
                        Add to Cart
                    </Link>
                </div>

                
            </div>
      </div>
    </Link>
    </div>
  )
}

export default SpecialProduct
