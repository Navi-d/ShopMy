/*AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH */

import React, { useEffect, useState } from 'react';
import '../Products/Home.css'

function TrackOrderPage(props) {
  const orderId = props.orderId; // Get order ID from URL params
  const [orderData, setOrderData] = useState(null); // State to store order details

  useEffect(() => {
    
    const simulatedOrderData = {
      orderId: orderId,
      orderName: "Order Name",
      status: "Shipped",
      orderDate: "2024-01-01",
      totalAmount: 100.00,
      shippingInfo: {
        address: "123 Main Street, Petaling Jaya, Malaysia 12345",
        courier: "USPS",
        trackingNumber: "1Z9876543210"
      },
      // ... other order details
    };
    setOrderData(simulatedOrderData);
  }, [orderId]); // Fetch data only when orderId changes

  return (
    <div className="track-order-page home-wrapper-2">
      <h2 className='section-header ms-4 pt-4'>Track Order Details (Order ID: {orderId})</h2>
      {orderData && ( //TBD Conditionally render content if orderData is available

        <div className='track-order-card bg-white shadow rounded-2 m-4 p-4'>
          {/*TBD Order Details Section */}
          <div className="order-details">
            <span className="order-name h5">{orderData.orderName}</span>
            <br/>
            <span className="order-status h5">Status: {orderData.status}</span>
            {/*TBD Other details like order date, total amount */}

            <div class="progress my-2">
              <div className="progress-bar"
                role="progressBar"
                style={{"width": "75%"}}
                aria-valuenow="25"
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
            <p>Address: {orderData.shippingInfo.address}</p>
            <p>Courier: {orderData.shippingInfo.courier}</p>
            <p>Tracking Number: {orderData.shippingInfo.trackingNumber}</p>
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


