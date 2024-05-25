/*AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH */

import React, { useEffect, useState } from 'react';

function TrackOrderPage(props) {
  const orderId = props.match.params.orderId; // Get order ID from URL params
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
    <div className="track-order-page">
      <h2>Track Order Details (Order ID: {orderId})</h2>
      {orderData && ( //TBD Conditionally render content if orderData is available
        <div>
          {/*TBD Order Details Section */}
          <div className="order-details">
            <span className="order-name">{orderData.orderName}</span>
            <span className="order-status">Status: {orderData.status}</span>
            {/*TBD Other details like order date, total amount */}
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
          <button className="contact-seller-btn">Contact Seller</button>
          <button className="invoice-btn">Invoice</button>
        </div>
      )}
    </div>
  );
}

export default TrackOrderPage;


