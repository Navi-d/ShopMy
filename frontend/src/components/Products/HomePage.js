import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./Home.css";
import Marquee from 'react-fast-marquee';
import ProductCard from './ProductCard';
import SpecialProduct from './SpecialProduct';
import axios from 'axios';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

const responsive_main = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };


function HomePage() {
    const [products, setProducts] = useState(null);
    const [loading, setLoading] = useState(true);

    //Get Products
    useEffect(() => {
        const products = async (e) => {
            // e.preventDefault(); //don't refresh page
            try {
                const response = await axios.get('http://localhost:3001/getProducts');
                setProducts(response.data);
                setLoading(false);
                console.log('data is\n'+ response.data); // Assuming backend responds with user data
            } catch (error) {
            console.error(error);
            }
        }
        
        //call the method
        products();
      }, []);

    useEffect(() => {
        // Retrieve logged-in user data from local storage
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
          console.log('Logged-in user details:', loggedInUser);
          // You can use the logged-in user data to customize the page content
        }
      }, []);
      
    if(loading) {
        return (
            <div>Loading...</div>
        );
    }

    return (
        <>
         <section class="home-wrapper-1 py-5">
            <div class="container-xxl">
                <div class="row">
                    <div class="col-12">
                    <Carousel
                            swipeable={true}
                            draggable={false}
                            showDots={true}
                            responsive={responsive_main}
                            ssr={true} // means to render carousel on server-side.
                            infinite={true}
                            autoPlay={true}
                            autoPlaySpeed={1000}
                            keyBoardControl={true}
                            customTransition="all .5"
                            transitionDuration={1000}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            deviceType="tablet"
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                            >
                            {/* //Map all the input */}
                            
                            <div class="main-banner-content me-3 rounded-3 bg-black">
                                <img 
                                class="img-fluid shadow-sm"
                                src='https://www.apple.com/newsroom/images/product/ipad/standard/apple_ipad-pro-spring21_hero_04202021_big.jpg.large.jpg' 
                                alt='Main banner' />

                                    <div class="main-banner-content position-absolute h-100">
                                        <h4>SUPER CHARGED FOR PROS</h4>
                                        <h5 className='text-white'>iPad Pro</h5>
                                        <p class="mb-4 text-secondary">From RM999</p>
                                        <Link class="button" to="/product/6665bb1584865b8d87b3e6d5">BUY NOW</Link>
                                    </div>
                            </div>

                            <div class="main-banner-content me-3 rounded-3 bg-white">
                                <img 
                                class="img-fluid shadow-sm"
                                src='https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-pro-finish-select-202212-12-9inch-space-gray-wificell_AV2?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1670865919694' 
                                alt='Main banner' />

                                    <div class="main-banner-content position-absolute h-100">
                                        <h4>SLICK FOR ADVENTURE</h4>
                                        <h5>iPad Mini</h5>
                                        <p class="mb-4">From RM999</p>
                                        <Link class="button" to="/product/6665bb6384865b8d87b3e6d6">BUY NOW</Link>
                                    </div>
                            </div>

                            <div class="main-banner-content me-3 rounded-3 bg-white">
                                <img 
                                class="img-fluid shadow-sm"
                                src='https://www.notebookcheck.net/fileadmin/Notebooks/News/_nc4/Zenbook-14-OLED_UM3406HA_Product-photo_Jade-Black_06_header.jpeg' 
                                alt='Main banner' />

                                    <div class="main-banner-content position-absolute h-100">
                                        <h4>SUPER CHARGED FOR PROS</h4>
                                        <h5>Asus Zenbook 14</h5>
                                        <p class="mb-4">From RM999</p>
                                        <Link class="button" to="/product/6665a3fb84865b8d87b3e6d1">BUY NOW</Link>
                                    </div>
                            </div>
                                
                        </Carousel>;
                        
                    </div>
                </div>
            </div>
         </section>

         <section class="home-wrapper-2 py-5">
            <div class="container-xxl">
                <div class="row">
                    <div class="col-12">
                        <div class="services d-flex align-items-center justify-content-between ms-4">
                            <div class="d-flex align-items-center gap-15">
                                <span class="fa-stack">
                                    <i class="fa fa-bars fa-stack-1x fa-1x"></i>
                                    <i class="fa fa-truck fa-flip-horizontal fa-2x fa-stack-1x"></i>
                                </span>
                                
                                <div>
                                    <h6>Free Shipping</h6>
                                    <p class='mb-0'>From all orders over RM100</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-15">
                                <i class="fa fa-gift fa-2x"></i>
                                <div>
                                    <h6>Daily Surprise Offers</h6>
                                    <p class='mb-0'>Save upto 25% off</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-15">
                                <i class="fa fa-headphones fa-2x"></i>
                                <div>
                                    <h6>Support 24/7</h6>
                                    <p class='mb-0'>Shop with an expert</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-15">
                                
                                <i class="fa fa-percent fa-2x"></i>
                               
                                <div>
                                    <h6>Affordable Prices</h6>
                                    <p class='mb-0'>Get Factory direct price</p>
                                </div>
                            </div>
                            <div class="d-flex align-items-center gap-15">
                                <i class="fa fa-credit-card fa-2x"></i>
                                <div>
                                    <h6>Secure Payments</h6>
                                    <p class='mb-0'>100% Protected Payments</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </section>

         

         <section class="product-wrapper">
            <div class="continer-xxl">
                <div class="row mx-4">
                    <div class="col-12 py-5">
                        <h3 class="section-heading">Featured Collection</h3>
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
                            {/* //Map all the input */}
                            
                            {(products==null) ?
                                    <div class="class"></div>
                                : products?.map((item) => (
                                    <ProductCard {...item}/>
                                    ))
                                }
                                
                        </Carousel>;
                    
                </div>
            </div>
         </section>

         <section class="special-wrapper">
            <div class="continer-xxl">
                <div class="row mx-4">
                    <div class="col-12 py-5">
                        <h3 class="section-heading">Special Products</h3>
                    </div>
                </div>
                <div class="row mx-4">
                    {/* //Map all the input */}
                    {(products==null) ?
                                    <div class="class"></div>
                                : products.map((item) => (
                                    //Render only if its special
                                    item.specialProduct && <SpecialProduct {...item}/>  
                                ))}

                </div>
            </div>
         </section>

         <section class="marquee-wrapper-1 py-5">
            <div class="container-xxl">
                <div class="row">
                    <div class="col-12">
                        <div class="marquee-inner-wrapper cards-wrapper rounded-2">
                            <Marquee class="d-flex">
                                <div class="mx-5 w-25">
                                    {/* <img src="Products/images/xyz.png"
                                        alt='Service Image'/> */}
                                    <i class="fa fa-apple fa-5x"></i>
                                </div>
                                <div class="mx-5 w-25">
                                    <i class="fa fa-google fa-5x"></i>
                                </div>
                                <div class="mx-5 w-25">
                                    <i class="fa fa-amazon fa-5x"></i>
                                </div>
                                <div class="mx-5 w-25">
                                    <i class="fa fa-github fa-5x"></i>
                                </div>
                            </Marquee>
                          
                            
                          
                        </div>
                    </div>
                </div>
            </div>
         </section>

         
        </>
    );
}

export default HomePage;