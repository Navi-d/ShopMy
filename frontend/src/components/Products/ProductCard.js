import React from 'react'
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

//Star rating value
let ratingValue = 3;
let ratingEdit = false;
let productLink = "/product";

const ProductCard = () => {
    //Inside bootstraprow component
  return (
    <div class="col" style={{"min-width": "250px", "max-width" : "312px"}}>
      <Link class='a' to={productLink}>
        <div class="product-card position-relative my-2">
            <div class="wishlist-icon position-absolute align-items-right">
                <Link>
                    <i class="fa fa-heart-o"></i>
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
                <h6 class="brand">Amazon</h6>
                <h5 class="product-title">
                    Ring Video Doorbell, Venetian Bronze with All-new Ring Indoor Cam
                </h5>
                <ReactStars
                    count={5}
                    size ={24}
                    value={ratingValue}
                    edit= {ratingEdit}
                    activeColor='#ffd700' />

                <p class="price">RM100.00</p>
                
            </div>

            <div class="action-bar position-absolute">
                <div class="d-flex flex-column gap-15">
                    <Link to={productLink}>
                        <i class="fa fa-eye"></i>
                    </Link>

                    <Link to={productLink}>
                        <i class="fa fa-cart-plus"></i>
                    </Link>
                </div>
            </div>
        </div>
    
      </Link>
      
    </div>
  )
}

export default ProductCard
