import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import "./Home.css";
import Marquee from 'react-fast-marquee';
import ProductCard from './ProductCard';
import SpecialProduct from './SpecialProduct';

function HomePage() {
    return (
        <>
         <section class="home-wrapper-1 py-5">
            <div class="container-xxl">
                <div class="row">
                    <div class="col-6">
                        <div class="main-banner-content position-relative me-3 rounded-3 bg-white ">
                            <img 
                            class="img-fluid shadow-sm"
                            src='https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipad-pro-finish-select-202212-12-9inch-space-gray-wificell_AV2?wid=5120&hei=2880&fmt=p-jpg&qlt=95&.v=1670865919694' 
                            alt='Main banner' />

                            <div class="main-banner-content position-absolute h-100">
                                <h4>SUPER CHARGED FOR PROS</h4>
                                <h5>iPad Pro</h5>
                                <p class="mb-4">From 999$</p>
                                <Link class="button">BUY NOW</Link>
                            </div>
                        </div>
                    </div>

                    <div class="col-6 ">
                        <div class="d-flex flex-wrap mt-4 justify-content-between align-items-center ">
                            <div class="small-banner rounded-3 position-relative mb-2">
                                <img 
                                class="img-fluid shadow-sm"
                                src='https://resource.logitech.com/w_695,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/webcams/c922/c922-feature-2.jpg?v=1' 
                                alt='Main banner' />

                                <div class="small-banner-content position-absolute">
                                    <h4>SUPER CHARGED FOR PROS</h4>
                                    <h5>iPad Pro</h5>
                                    <p>From 999$</p>
                                    {/* <Link class="button">BUY NOW</Link> */}
                                </div>
                            </div>

                            <div class="small-banner rounded-3 position-relative mb-2">
                                <img 
                                class="img-fluid shadow-sm"
                                src='https://resource.logitech.com/w_695,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/webcams/c922/c922-feature-2.jpg?v=1' 
                                alt='Main banner' />

                                <div class="small-banner-content position-absolute ">
                                    <h4>BEST SALE</h4>
                                    <h5>iPad Pro</h5>
                                    <p>From 999$</p>
                                    {/* <Link class="button">BUY NOW</Link> */}
                                </div>
                            </div>

                            <div class="small-banner rounded-3 position-relative ">
                                <img 
                                class="img-fluid shadow-sm"
                                src='https://resource.logitech.com/w_695,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/webcams/c922/c922-feature-2.jpg?v=1' 
                                alt='Main banner' />

                                <div class="small-banner-content position-absolute">
                                    <h4>NEW ARRIVAL</h4>
                                    <h5>iPad Pro</h5>
                                    <p>From 999$</p>
                                    {/* <Link class="button">BUY NOW</Link> */}
                                </div>
                            </div>

                            <div class="small-banner rounded-3 position-relative ">
                                <img 
                                class="img-fluid shadow-sm"
                                src='https://resource.logitech.com/w_695,c_limit,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/webcams/c922/c922-feature-2.jpg?v=1' 
                                alt='Main banner' />

                                <div class="small-banner-content position-absolute">
                                    <h4>NEW ARRIVAL</h4>
                                    <h5>iPad Pro</h5>
                                    <p>From 999$</p>
                                    {/* <Link class="button">BUY NOW</Link> */}
                                </div>
                            </div>
                        </div>
                        
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

         <section class="home-wrapper-2 py-5">
            <div class="container-xxl">
                <div class="row">
                    <div class="col-12">
                        <div class="categories rounded-2 d-flex align-items-center justify-content-between">
                            <div class="d-flex align-items-center gap-30">
                                <div>
                                    <h6>Cameras</h6>
                                    <p>10 Items</p>
                                </div>
                                <i class="fa fa-camera fa-3x"></i>
                            </div>
                            <div class="d-flex align-items-center gap-30">
                                <div>
                                    <h6>Smart TV</h6>
                                    <p>10 Items</p>
                                </div>
                                <i class="fa fa-tv fa-4x"></i>
                            </div>

                            <div class="d-flex align-items-center gap-30">
                                <div>
                                    <h6>Smart Phones</h6>
                                    <p>10 Items</p>
                                </div>
                                <i class="fa fa-mobile fa-5x"></i>
                            </div>
                            <div class="d-flex align-items-center gap-30">
                                <div>
                                    <h6>Smart Watches</h6>
                                    <p>10 Items</p>
                                </div>
                                <i class="fa fa-clock-o fa-4x"></i>
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
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
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
                    <SpecialProduct />
                    <SpecialProduct />
                    <SpecialProduct />
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