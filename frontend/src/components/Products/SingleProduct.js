import React, { useEffect, useState } from 'react'
import ReactStars from 'react-rating-stars-component';
import {Link, useParams, useNavigate} from 'react-router-dom';
import ProductCard from './ProductCard';
import axios from 'axios';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ScrollToTop from '../Common/ScrollToTop';
import BreadCrumbs from '../Common/BreadCrumbs'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


const SingleProduct = () => {
    const navigate = useNavigate();
    const {productId} = useParams();
    //Get from search bar
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const [ratingsNumber, setRatingsNumber] = useState(0);
    const [ratingValue, setRatingValue] = useState(0);
    const [productTitle, setProductTitle] = useState('');
    const [productBrand, setProductBrand] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [reported, setReported] = useState(0);
    const [stock, setStock] = useState(0);

    const userJSON = localStorage.getItem('loggedInUser');
    const user = JSON.parse(userJSON);
    const userId = user._id;

    const [quantity, setquantity] = useState(1);

    //Variables
    const ratingEdit = true;

    //Get single product
    useEffect(() => {
        const productFunc = async (e) => {
            // e.preventDefault(); //don't refresh page
            try {
                const response = await axios.get(`http://localhost:3001/getProduct/${productId}`);
                setProduct(response.data);
                console.log('Data is ='+ product)
                // if(product != null)
                setLoading(false);
                
                //Variable Settings
                setRatingValue(product.ratingValue);
                setRatingsNumber(product.totalRatings);
                setProductBrand(product.productBrand);
                setProductPrice(product.productPrice);
                setProductTitle(product.productTitle);
                setReported(product.reported);
                setStock(product.stockCurrent);

                console.log('data is\n'+ response.data); // Assuming backend responds with user data
            } catch (error) {
                console.error(error);
            }
        }
        
        //call the method
        productFunc();
      }, [loading]); //On change of product id

      
      //Get Products
      useEffect(() => {
          const productsFunc = async (e) => {
              // e.preventDefault(); //don't refresh page
              try {
                  const response = await axios.get('http://localhost:3001/getProducts');
                  setProducts(response.data);
                //   setLoading(false);
                  console.log('data is\n'+ response.data); // Assuming backend responds with user data
              } catch (error) {
                console.error(error);
              }
          }
          
          //call the method
          productsFunc();
        }, [loading]);

    //Report Product
    const reportProduct = async () => {
        try {
            setReported(1+reported);
            const response = await axios(`http://localhost:3001/api/reportProduct/${productId}/${reported}`);
            console.log(response);

            // alert("Product has been reported. Sorry for the inconvenience")
            <div className={`alert alert-success mt-3`} role="alert">
              {"Product has been reported. Sorry for the inconvenience"}
            </div>
        } catch (e) {
            console.error(e);
        }

    }

    //Add product to cart
    const addToCart= async (e) => {
        // e.preventDefault(); //don't refresh page
        try {
            const response = await axios.post('http://localhost:3001/addToCart', {userId, productId, quantity});
            console.log('data added to cart: '+ response.data); // Assuming backend responds with user data
    
        } catch (error) {
            console.error(error);
        }
    };

    const addToWishlist= async (e) => {
        // e.preventDefault(); //don't refresh page
        try {
            const response = await axios.post('http://localhost:3001/addToWishlist', {userId, productId});
            console.log('data added to wishlist: '+ response.data); // Assuming backend responds with user data
    
        } catch (error) {
            console.error(error);
        }
    };

      if(loading) {
        
       } else

  return (
    <div class="main-product-wrapper pt-3 home-wrapper-2">
        <BreadCrumbs title = {`Product / ${productTitle}`}/>
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
                            
                            <div class="img-slider d-flex justify-content-center gap-10 py-2 bg-light rounded-3">
                                <img 
                                class="img-fluid"
                                src="https://m.media-amazon.com/images/I/51KfTljedfL._SX425_.jpg"
                                alt="prod Img" />
                                <img 
                                class="img-fluid"
                                src="https://m.media-amazon.com/images/I/51KfTljedfL._SX425_.jpg"
                                alt="prod Img" />
                                <img 
                                class="img-fluid"
                                src="https://m.media-amazon.com/images/I/51KfTljedfL._SX425_.jpg"
                                alt="prod Img" />
                            </div>
                        </div>


                        <div class="col">
                            <div class="main-product-details mx-2">
                                <small >{productBrand}</small>
                                <h5>{productTitle}</h5>
                                <hr />
                                <h5>Price:<span class="h4"> RM{productPrice}</span></h5>
                                
                                {/* Rating & Review*/}
                                <div class="d-flex justify-content-start align-items-center gap-10">
                                    <span><strong>{ratingValue}</strong></span>
                                    <ReactStars
                                        count={5}
                                        size ={24}
                                        value={parseInt(ratingValue)}
                                        edit= {ratingEdit}
                                        activeColor='#ffd700' />
                                    <span>{ratingsNumber} Ratings</span>
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
                                        <td><small>{productBrand}</small></td>
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
                                        <td><small>{(stock>0) ? "in Stock":"out of stock"}</small></td>
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
                                <Link class='a a-modern report-product' onClick={reportProduct}>
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
                                <span class="h5"> RM{productPrice}</span>

                                <p>
                                    <br/>
                                    <span>RM10 Shipping fees.</span>

                                    <span> Delivery <b>April 30</b>. Order within 
                                    <span class="text-success"> 17 hrs 56mins</span>
                                    </span>
                                </p>

                                {(stock > 0) ? (<p class="h5 text-success">In Stock </p>): (<p class="h5 text-danger">Out of Stock </p>)}

                                <br/>
                                
                                <span class="rounded-2 shadow home-wrapper-2 p-2">
                                    <label>Quantity : </label>
                                    <select name="Quantity" class="home-wrapper-2 rounded-2 ms-2 w-50" id="">
                                        <option value="manual" onSelect={(e) => setquantity(1)}>1</option>
                                        <option value="two" onSelect={(e) => setquantity(2)}>2</option>
                                        <option value="three" onSelect={(e) => setquantity(3)}>3</option>
                                        <option value="four" onSelect={(e) => setquantity(4)}>4</option>
                                    </select>
                                </span>

                                <Link class='a' onClick={e => addToWishlist}>
                                        <small class=""><br/><i class="fa fa-heart-o mt-4"></i> Add to wishlist</small>
                                </Link>
                                <button class="button w-100 mt-2" onClick={e => addToCart()}>Add to Cart</button>
                                <button class="button button-2 w-100 mt-2"  
                                onClick={e => {
                                    addToCart();
                                    navigate('/cart')
                                    }}>Buy it now</button>
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
                        <Carousel
                            swipeable={true}
                            draggable={true}
                            showDots={true}
                            responsive={responsive}
                            ssr={true} // means to render carousel on server-side.
                            infinite={true}
                            // autoPlay={this.props.deviceType !== "mobile" ? true : false}
                            // autoPlaySpeed={1000}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={500}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            // deviceType={this.props.deviceType}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                            >
                                {(products==null) ?
                                    <div class="class"></div>
                                : products?.map((item) => (
                                    <ProductCard {...item}/>
                                    ))
                                }
                                
                        </Carousel>
                        
                    </div>
                </div>

                    
            </div>
            
        </div>
      
    </div>
  )
}

export default SingleProduct
