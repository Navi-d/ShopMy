import React from 'react';
import ReactStars from 'react-rating-stars-component';
import {Link} from 'react-router-dom';
import ProductCard from './ProductCard';

//Star rating value
let ratingValue = 3;
let ratingEdit = false;


const SingleProduct = () => {
  return (
    <div class="main-product-wrapper py-5 home-wrapper-2">
        <div class="container-xxl">

            <div class="main-product-page">
                <div class="main-product-card bg-white m-4 p-4 rounded-3 shadow-sm">
                    <div class="row">
                        <div class="col-md-auto ">
                            <div class="image-contiainer rounded-2 shadow-sm">
                                <img 
                                class="img-fluid rounded-3"
                                src="https://m.media-amazon.com/images/I/51KfTljedfL._SX425_.jpg"
                                alt="prod Img" />

                            </div>

                        </div>


                        <div class="col">
                            <div class="main-product-details mx-2">
                                <small >Amazon</small>
                                <h5>Ring Video Doorbell, Venetian Bronze with All-new Ring Indoor Cam</h5>
                                <hr />
                                <h5>Price:<span class="h4"> RM100.00</span></h5>
                                
                                {/* Rating & Review*/}
                                <div class="d-flex justify-content-start align-items-center gap-10">
                                    <span><strong>3</strong></span>
                                    <ReactStars
                                        count={5}
                                        size ={24}
                                        value={ratingValue}
                                        edit= {ratingEdit}
                                        activeColor='#ffd700' />
                                    <span>549 Ratings</span>
                                </div>
                                <Link class='a a-modern'><small>Write a review</small></Link>
                                <hr />
                                
                                {/* Product Meta Data */}
                                <table class="table">
                                    <tr>
                                        <td><label>Type :</label></td>
                                        <td> <small> Smart Device</small></td>
                                    </tr>
                                    <tr>
                                        <td><label>Brand :</label></td>
                                        <td><small>Havells</small></td>
                                    </tr>
                                    <tr>
                                        <td><label>Categories : </label></td>
                                        <td><small> airpods headphones laptops electronics</small></td>
                                    </tr>
                                    <tr>
                                        <td><label>Tags : </label></td>
                                        <td><small>headphones laptop mobile amazon</small></td>
                                    </tr>
                                    <tr>
                                        <td><label>SKU :</label></td>
                                        <td><small> SKU027</small></td>
                                    </tr>
                                    <tr>
                                        <td><label>Availabiliy : </label></td>
                                        <td><small>541 in Stock</small></td>
                                    </tr>
                                    <tr>
                                        <td><label>Size :</label></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td><label>Color :</label></td>
                                        <td><span class="color-circle bg-danger rounded-5 px-3 mx-2"></span>
                                        <span class="color-circle bg-black rounded-5 px-3 mx-2"></span>
                                        <span class="color-circle bg-primary rounded-5 px-3 mx-2"></span></td>
                                    </tr>
                                </table>

                                <hr/> 
                                <Link class='a a-modern report-product'>
                                    <i class="fa fa-flag-o text-danger"></i>
                                    <span class="text-danger"> Report an issue with this product or seller</span>
                                </Link>

                                {/* <div class="d-flex justify-content-start gap-15">
                                    <Link class='a'>
                                        <small><i class="fa fa-heart-o"></i> Add to wishlist</small>
                                    </Link>
                                    {/* <h6><i class="fa fa-heart-o"></i> Add to compare</h6> */}

                                <br />
                                <div class="prod-terms"></div>
                                
                                {/* Payment Methods */}
                                {/* <div class="home-wrapper-2 rounded-2 p-2">
                                    <h6 class="center mb-3">Payment methods</h6>
                                    <div class="d-flex gap-10 justify-content-evenly">
                                        <i class="fa fa-cc-visa"></i>
                                        <i class="fa fa-cc-mastercard"></i>
                                        <i class="fa fa-cc-amex"></i>
                                        <i class="fa fa-paypal"></i>
                                    </div>
                                </div> */}
                                
                            </div>
                            

                        </div>

                        <div class="col-3">
                            <div class="buy-card rounded-3 shadow-sm p-3 m-3">
                                <label>Price:</label>
                                <span class="h5"> RM100.00</span>

                                <p>
                                    <br/>
                                    <span>RM10 Shipping fees.</span>

                                    <span> Delivery <b>April 30</b>. Order within 
                                    <span class="text-success"> 17 hrs 56mins</span>
                                    </span>
                                </p>

                                <p class="h5 text-success">In Stock </p>
                                <br/>
                                
                                <span class="rounded-2 shadow home-wrapper-2 p-2">
                                    <label>Quantity : </label>
                                    <select name="Quantity" class="home-wrapper-2 rounded-2 ms-2 w-50" id="">
                                        <option value="manual">1</option>
                                        <option value="two">2</option>
                                        <option value="three">3</option>
                                        <option value="four">4</option>
                                    </select>
                                </span>

                                <Link class='a'>
                                        <small class=""><br/><i class="fa fa-heart-o mt-4"></i> Add to wishlist</small>
                                </Link>
                                <button class="button w-100 mt-2">Add to Cart</button>
                                <button class="button button-2 w-100 mt-2" >Buy it now</button>
                            </div>

                            {/* Payment Methods */}
                            <div class="home-wrapper-2 rounded-2 p-2 m-3 shadow-sm">
                                    <h6 class="center mb-3">Payment methods</h6>
                                    <div class="d-flex gap-10 justify-content-evenly">
                                        <i class="fa fa-cc-visa"></i>
                                        <i class="fa fa-cc-mastercard"></i>
                                        <i class="fa fa-cc-amex"></i>
                                        <i class="fa fa-paypal"></i>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div class="row">
                    <div class="col">
                        <h4 class="section-heading ms-4">Description</h4>
                        <div class="desc-card bg-white m-4 p-4 rounded-3 shadow-sm">
                            <p class="text-secondary">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In risus ex, tincidunt a vulputate sit amet, 
                                lobortis vel nunc. Fusce posuere elementum luctus. Donec in volutpat ante, et imperdiet nunc. Praesent 
                                in lacinia nunc, non volutpat lorem. Proin et posuere ex. In suscipit diam vel varius fringilla. Orci 
                                varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque laoreet 
                                tellus id maximus iaculis. Praesent turpis leo, vehicula interdum laoreet ut, tincidunt non justo.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div class="row">
                    <div class="col">
                        <h4 class="section-heading ms-4">Reviews</h4>
                        <div class="review-card bg-white m-4 p-4 rounded-3 shadow-sm">
                            <h5>Customer Reviews</h5>

                            <span>
                                <ReactStars
                                            count={5}
                                            size ={24}
                                            value={ratingValue}
                                            edit= {ratingEdit}
                                            activeColor='#ffd700' />
                                <p class='h6 text-secondary'>Based on 1 review</p>  
                                <Link class='a a-modern'><small>Write a review</small></Link>         
                                <br /> 
                            </span>
                            
                            <div class="review-card">
                                <hr />
                                <div class="review-title">
                                    <ReactStars
                                        count={5}
                                        size ={24}
                                        value={ratingValue}
                                        edit= {ratingEdit}
                                        activeColor='#ffd700' />
                                    <strong>Nice Quality, I'll Buy it Again
                                    <br />
                                    <small>admin on April 15, 2024</small></strong>
                                </div>
                                
                                
                                <div class="review-body">
                                    <p class="text-secondary mt-2">
                                        Great product, I think I will recommend this product to
                                        my friends.
                                    </p>
                                </div>
                            </div>

                                    
                        </div>
                    </div>
                </div>

                {/* Featured Products */}
                <div class="featured-products-2 p-2 m-3">
                    <div class="row">
                    
                        <div class="col-12 pb-3">
                            <h4 class="section-heading">You May Also Like</h4>
                        </div>
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                        <ProductCard />
                    </div>
                </div>

                    
            </div>
            
        </div>
      
    </div>
  )
}

export default SingleProduct
