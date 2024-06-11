/*AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Products/Home.css'
import { useParams } from 'react-router-dom';

function TrackOrderPage() {
  const {orderId, productId} = useParams(); // Get order ID from URL params
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState('');
  const fetchOrders = async () => {
    try {
      const userJSON = localStorage.getItem('loggedInUser');
      const user = JSON.parse(userJSON);
      const userId = user._id;

      const orderData = await axios.get(`http://localhost:3001/api/orders/${userId}/orders`);
      if (orderData) {
        setOrder(orderData.data.find((o) => (o._id == orderId)));
        fetchProduct(productId)
        console.log(orderData.data.find(() => (orderData._id == orderId)))
        setLoading(false)
      } else {
        // Redirect or handle not logged in case
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };
  
  const fetchProduct = async (productId) => {
    try {  
      // alert('gotten products')
      const response = await axios.get(`http://localhost:3001/getProduct/${productId}`);
      if(response) {
        setProduct(response.data);
        // console.log(product)
      }
    
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };
  useEffect(() => {
    fetchOrders()
  }, [])

  let progress = 0

  if(loading) {
    return (
        <div>Loading...</div>
    );
  } else

  

  return (
    <div className="track-order-page home-wrapper-2">
      <h2 className='section-header ms-4 pt-4'>Track Order Details (Order ID: {orderId})</h2>
      {(order && product) && ( //TBD Conditionally render content if order is available

        <div className='track-order-card bg-white shadow rounded-2 m-4 p-4'>
          {/*TBD Order Details Section */}
          <div className="order-details">
            <p className="h3">{product.productTitle}</p>
            <div class='image-container'>
              <img className='img-fluid main-image' src={product.productLink} />
            </div>
            
            <br/><br/>
            <div className="order-status-wrapper">
              Status: 
              {(order.status == 'Ordered') ? <span className={`order-status bg-warning`}>{order.status}</span> : null}
              {(order.status == 'Processing') ? <span className={`order-status bg-warning`}>{order.status}</span> : null}
              {(order.status == 'Shipped') ? <span className={`order-status bg-primary`}>{order.status}</span> : null}
              {(order.status == 'Delivered') ? <span className={`order-status bg-success`}>{order.status}</span> : null}

              {/* ... other order details (if needed) */}
            </div>
            {/*TBD Other details like order date, total amount */}

            <span className='hide'>
                {(order.status == 'Ordered') ? progress = 0 : null}
                {(order.status == 'Processing') ? progress = 25  : null}
                {(order.status == 'Shipped') ? progress = 75 : null}
                {(order.status == 'Delivered') ? progress = 10 : null}

            </span>
            

            <div class="progress my-2">
              <div className="progress-bar"
                role="progressBar"
                style={{"width": progress+"%"}}
                aria-valuenow="0"
                aria-valuemin='0'
                aria-valuemax='100'
                ></div>
            </div>
            <div class="progress-labels d-flex justify-content-between">
              <span><i class="fa fa-first-order"></i> Ordered</span>
              <span><i class="fa fa-handshake-o"></i> Order Recieved</span>
              <span><i class="fa fa-archive"></i> Shipped</span>
              <span><i class="fa fa-truck fa-flip-horizontal"></i> Delivered</span>
            </div>
            
            <hr className='my-5'/>
          </div>

          {/* TBD Timeline Section (Replace with your custom implementation) */}
          <div className="timeline">
            {/*TBD Create milestones (divs) with styles */}
          </div>

          {/*TBD Additional Information Sections */}
          <div className="shipping-info">
            <h3>Shipping Information</h3>
            <p>Address: {order.deliveryAddress[0].address}</p>
            <p>City: {order.deliveryAddress[0].city}</p>
            <p>Country: {order.deliveryAddress[0].country}</p>
            <p>Order Date: {order.date}</p>
          </div>

          <hr className='my-5'/>
          <button className="contact-seller-btn btn-dark btn me-3">Contact Seller</button>
          <button className="invoice-btn btn-dark btn">Invoice</button>
        </div>
      )}
    </div>
  );
}

export default TrackOrderPage;


