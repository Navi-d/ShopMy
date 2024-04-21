import React from 'react'
import ProductCard from './ProductCard';

const OurStore = () => {
  return (
    <>
        <div class="browse-page-wrapper home-wrapper-2 p-4">
            <div class="container-xxl">
                <div class="row">
                    <div class="col-3">
                            <div class="filter-card bg-white shadow rounded-2 p-3 my-2">
                                <h4>Shop By Categories</h4>
                                <div class="filter-card-1 bg-white p-2 my-2">
                                <h6 class="text-secondary ms-2">Watch</h6>
                                <h6 class="text-secondary ms-2 ">Tv</h6>
                                <h6 class="text-secondary ms-2">Camera</h6>
                                <h6 class="text-secondary ms-2">Laptop</h6>
                            </div>
                        </div>

                        <div class="filter-card bg-white shadow rounded-2 p-3 my-2">
                            <h4>Filter By</h4>
                            <div class="filter-card-1 bg-white p-2 my-2">
                                <h6>Availabiliy</h6>
                                <form action="">
                                        <input type="checkbox"/>
                                        <label class="text-black-50 ms-2">In stock (7) </label>
                                        <br/>
                                        <input type="checkbox" />
                                        <label class="text-black-50 ms-2">Out of Stock (1) </label>
                                </form>
                            </div>

                            <div class="filter-card-1 bg-white p-2 my-2">
                                <h6>Price</h6>
                                
                                <div class="d-flex align-items-center gap-10">
                                    <i class="fa fa-dollar text-secondary"></i>
                                    <div action="" class="form-floating">
                                        <input type="number" 
                                        class="form-control w-100"
                                        placeholder='To' />
                                    </div>

                                    <label>To</label>

                                    <i class="fa fa-dollar text-secondary"></i>
                                    <div action="" class="form-floating">
                                        <input type="number"
                                        class="form-control w-100"
                                        placeholder='To'/>
                                    </div>
                                </div>
                                    
                                
                            </div>
                            <div class="filter-card-1 bg-white p-2 my-2">
                                <h6>Colors</h6>
                            </div>

                            
                        </div>

                        <div class="filter-card bg-white shadow rounded-2 p-3 my-2">
                            <h4>Product Tags</h4>
                            <div class="filter-card-1 bg-white p-2 my-25">
                                
                                <div class="d-flex flex-wrap justify-content-between gap-10">
                                    <span class="badge bg-secondary rouded-3">
                                        Headphone
                                    </span>
                                    <span class="badge bg-secondary rouded-3">
                                        Camera
                                    </span>
                                    <span class="badge bg-secondary rouded-3">
                                        Phone
                                    </span>
                                    <span class="badge bg-secondary rouded-3">
                                        Tv
                                    </span>
                                    <span class="badge bg-secondary rouded-3">
                                        Laptop
                                    </span>
                                </div>
                                
                            </div>
                        </div>

                        <div class="filter-card bg-white shadow rounded-2 p-3 my-2">
                            <h4>Random Product</h4>
                            <div class="filter-card-1 bg-white p-2 my-25">
                                
                            </div>
                        </div>
                    </div>



                    <div class="col-9">
                        <div class="filter-bar-2 bg-white shadow rounded-2 p-2 my-2">
                            <div class="d-flex gap-10 justify-content-between align-items-center">
                                <div class="d-flex align-items-center">
                                    <p class="mt-2 d-block w-50">Sort By: </p>
                                    <select name="" id="" class="form-control form-select h-50 w-100">
                                        <option value="manual">Featured</option>
                                        {/* Select below manually */}
                                        <option value="best-selling" selected="selected">
                                            Best selling
                                        </option>
                                        <option value="title-ascending">Alphabetically, A-Z</option>
                                        <option value="title-descending">Alphabetically, Z-A</option>
                                        <option value="price-acscending">Price, low-high</option>
                                        <option value="price-descending">Price, high-low</option>
                                        <option value="created-ascending">Date, old to new</option>
                                        <option value="created-descending">Date, new to old</option>

                                    </select>
                                </div>
                                

                               <div class="d-flex gap-10 justify-content-between align-items-center">
                                    <p class="mt-2 d-block me-2">7 products</p>
                                    <i class="fa fa-bars fa-1x rounded-2 p-2 m-0 bg-light"></i> 
                                    {/* <i class="fa fa-bars fa-1x rounded-2 p-2 bg-light"></i> 
                                    <i class="fa fa-bars fa-1x rounded-2 p-2 bg-light"></i>  */}
                               </div>
                               
                            </div>
                            
                        
                        </div>

                        {/* Add the boxes just below it */}
                        <div class="d-flex gap-15 flex-wrap">
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                            <ProductCard />
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default OurStore
