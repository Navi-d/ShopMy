import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './manageorder.css';

function ManageOrder() {
  const [orders, setOrders] = useState([])
  const [product, setProduct] = useState({})
  const [productCurrent, setProductCurrent] = useState('')
  const [data, setData] = useState([]);

  const userJSON = localStorage.getItem('loggedInUser');
    const user = JSON.parse(userJSON);
    const userId = user._id;

  const fetchOrders = async () => {
    try {
      const orderData = await axios.get(`http://localhost:3001/api/orders/${userId}/orders`);
      if (orderData) {
        setOrders(orderData.data);
      } else {
        // Redirect or handle not logged in case
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchOrders()
  }, [])


  const handleDeleteOrder = async(orderId) => {
    try {
      const response = await axios.post(`http://localhost:3001/api/orders/${userId}/orders/deleteOrder`, {orderId})
      console.log('order deleted with orderId ' + orderId)
      //Reload after fetching
      window.location.reload()
    } catch (error) {
      console.error('error while deleting order ' + error)
    }
  }
  

  let statusColor = '';

  return (
    <div class="container-xxl home-wrapper-2 shadow">
      <div className="manage-order p-4 m-4">
        <h2>My Orders</h2>
        <ul className="order-list"> 
          {/* 
           () => orders => items
          */}
          
          {(orders) ? (orders?.map((order) => (
                          order.items?.map((item) => {
                            return <li key={order._id} className="order-item">
                              <div className="order-details-wrapper">
                                <div className="order-image-wrapper">
                                  <h2 className="order-name">
                                      Order Id: {order._id}
                                      <br></br>
                                  </h2>
                                  <img src={item.productID.productLink} alt={`Order ${item.productID.productLink} Image`} className="order-image" />
                                </div>
                                <div className="order-info">
                                  <p className="order-name">
                                    <br/>
                                    {item.productID.productTitle}
                                  </p>
                                  
                                  <div className="order-status-wrapper">
                                    Status: 
                                    {(order.status == 'Ordered') ? <span className={`order-status bg-warning`}>{order.status}</span> : null}
                                    {(order.status == 'Processing') ? <span className={`order-status bg-warning`}>{order.status}</span> : null}
                                    {(order.status == 'Shipped') ? <span className={`order-status bg-primary`}>{order.status}</span> : null}
                                    {(order.status == 'Delivered') ? <span className={`order-status bg-success`}>{order.status}</span> : null}

                                    {/* ... other order details (if needed) */}
                                  </div>

                                  <div>
                                    Total: {order.totalPayment.$numberDecimal}
                                  </div>
                                </div>
                                <div className="order-actions">
                                  <Link 
                                    to={`/track-order/${order._id}/${item.productID._id}`}>
                                    <button className="track-order-btn">Track Order & Contact Seller</button>
                                  </Link>
                                  <Link>
                                    <button className="contact-seller-btn"  onClick={
                                      () => {
                                        handleDeleteOrder(order._id);
                                        alert('order deleted')
                                      }
                                    }>Request Refund</button>
                                  </Link>
                                </div>
                              </div>
                            </li>
                            }
                          )
                          
                        ))) : (
                          <span></span>
                        )
          }
          {
            (orders) && (<li className="list-group-item text-center py-5">
              <div>
                <img src="/cart/empty-cart.png" alt="Empty Cart" style={{ width: '150px', marginBottom: '20px' }} />
                <h4>Your orders is empty!</h4>
                <p>Looks like you haven't added anything yet.</p>
                <p>Why not <Link to="/home">explore our products</Link> and find something you love?</p>
              </div>
            </li>)
          }
        </ul>
      </div>
    </div>
    
  );
}

export default ManageOrder;
