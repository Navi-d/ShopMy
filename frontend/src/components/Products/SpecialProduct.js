import React from 'react'
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

//Star rating value
let ratingValue = 3;
let ratingEdit = false;
let productLink = "/home";

const SpecialProduct = () => {
  return (
    <div class="col-6 mb-3">
      <div class="special-product-card bg-grey shadow-sm ">
            <div class="d-flex justify-content-between p-3">
                <div>
                    <img class="product-image img-fluid shadow-sm rouded-3"
                    src="Products/images/amazon-ring.jpg" alt="watch alt" />
                </div>

                <div class="special-product-content px-5 w-100">
                    <h6 class="brand">Havels</h6>
                    <h5 class="product-title">Samsung Galaxy S24</h5>
                    <ReactStars
                    count={5}
                    size ={24}
                    value={ratingValue}
                    edit= {ratingEdit}
                    activeColor='#ffd700' />
                    <p class="price">
                        <span class="red-p">RM100.00</span>
                        &nbsp;
                        <strike>RM200</strike>
                    </p>
                    
                    <div class="discount-till mb-5">
                        <p>Quantity: </p>
                        <div class="progress">
                            <div class="progress-bar"
                            role="progressBar"
                            style={{width: "25%"}}
                            aria-valuenow="25"
                            aria-valuemin='0'
                            aria-valuemax='100'
                            ></div>
                        </div>

                        
                    </div>
                    
                    <Link class="button button-sm">
                        {/* <i class="fa fa-cart-plus fa-3x fa-pull-left position-absolute"></i> */}
                        Add to Cart
                    </Link>
                </div>

                
            </div>
      </div>
    </div>
  )
}

export default SpecialProduct
