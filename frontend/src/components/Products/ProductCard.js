import React from 'react'
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

// //Star rating value
// let ratingValue = 3;
// let ratingEdit = false;
// let productLink = "/product";
// let productTitle = 'Ring Video Doorbell, Venetian Bronze with All-new Ring Indoor Cam';
// let productBrand = 'Amazon';
// let productPrice = '100.00';]

const addToCart = (productId) => {
    //Given the Product Id, add the product to cart. If needed you can pass the whole product information
    //But just for simplicity, pass id then axios(/getProduct/${productId}) to get product details
    return 0
};

const ProductCard = (props) => {
    const {_id, productBrand, productTitle, productLink,   productPrice, ratingValue} = props;
    const productId = _id;
    const ratingEdit = false; // Assuming ratingEdit should always be false
    
    //Inside bootstraprow component
  return (
    <div class="col" style={{"min-width": "250px", "max-width" : "312px"}}>
      <Link class='a' to={`/product/${_id}`}>
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
                    <Link to={productLink}>
                        <i class="fa fa-eye"></i>
                    </Link>

                    {
                        //Add to cart 
                        //Perhaps can change to button
                        //Cart Icon in Card view of product
                    }
                    <Link to={productLink}>
                        {addToCart(productId)}
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
