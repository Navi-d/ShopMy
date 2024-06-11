import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './manageorder.css';

function ManageOrder() {
  const [orders, setOrders] = useState([])
  const [product, setProduct] = useState({})
  const [productCurrent, setProductCurrent] = useState('')
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const userJSON = localStorage.getItem('loggedInUser');
      const user = JSON.parse(userJSON);
      const userId = user._id;

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
  


  // const orders = [
  //   // Replace with API call to fetch orders
  //   {
  //     id: 1,
  //     orderName: "HyperX Cloud 3 Wired: ",
  //     status: "Delivered",
  //     imageUrl: "https://hyperx.com/cdn/shop/files/hyperx_cloud_iii_red_66x0049_main_1.jpg?v=1712783811",
  //   },
  //   { id: 2,
  //     orderName: "GIGABYTE Laptop: ",
  //     status: "Delivered", 
  //     imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7eFn0JxNjxcHVFtabUfMwGvRahC8F5we9CoZWtNMMw&s" },
  //   {
  //     id: 3,
  //     orderName: "SecretLab X PaperRex Limited Edition: ",
  //     status: "Shipped",
  //     imageUrl: "https://images.secretlab.co/theme/common/pprx-splash-chair-mobile.png",
  //   },
  //   {
  //     id: 4,
  //     orderName: "Iphone 15 PRO: ",
  //     status: "Shipped",
  //     imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmjh_2Nf0zNjqPt5EmJ4Mz5XIK5zFAkLKhDuWSWnrCKg&s",
  //   },
  //   {
  //     id: 5,
  //     orderName: "Playstation 5 Gaming Console: ",
  //     status: "Shipped",
  //     imageUrl: "https://images.immediate.co.uk/production/volatile/sites/3/2020/08/playstation-5-77d37a0.jpg?quality=90&resize=980,654",
  //   },
  //   {
  //     id: 6,
  //     orderName: "Roomba K9: ",
  //     status: "Shipped",
  //     imageUrl: "https://visionary.com.my/cdn/shop/products/j7_Photo_Studio_CleanbaseRobot_LeftFacing_Phonecopy_8be0d7d1-8bd8-4637-975b-fc7b102c853c.jpg?v=1671415082",
  //   },
  //   {
  //     id: 7,
  //     orderName: "Logitech Superlight X: ",
  //     status: "Shipped",
  //     imageUrl: "https://90a1c75758623581b3f8-5c119c3de181c9857fcb2784776b17ef.ssl.cf2.rackcdn.com/669865_605030_01_front_comping.jpg",
  //   },
  //   {
  //     id: 8,
  //     orderName: "Kindle Paperwhite 2: ",
  //     status: "Ready to be Shipped: ",
  //     imageUrl: "https://kindlemalaysia.com/wp-content/uploads/2021/11/All-new-Kindle-Paperwhite-8-GB-Front-%E2%80%93-Now-with-a-6.8-display-and-adjustable-warm-light-%E2%80%93-Ads-in-Malaysia.jpg",
  //   },
  //   {
  //     id: 9,
  //     orderName: "Innergie Gaming Charger: ",
  //     status: "Ready to be Shipped: ",
  //     imageUrl: "https://laz-img-sg.alicdn.com/p/8c7bdea1ae71d13b93e4935c4d113a0b.jpg",
  //   },
  //   {
  //     id: 10,
  //     orderName: "Nintendo Switch: ",
  //     status: "Ready to be Shipped: ",
  //     imageUrl: "https://m.media-amazon.com/images/I/51Gz7IimgoL.AC_UF894,1000_QL80_DpWeblab.jpg",
  //   },
  // ];

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
                                  <Link to={`/track-order/${order._id}`}>
                                    <button className="contact-seller-btn">Request Refund</button>
                                  </Link>
                                </div>
                              </div>
                            </li>
                            }
                          )
                          
                        ))) : (
                          <li className="list-group-item text-center py-5">
                            <div>
                              <img src="/cart/empty-cart.png" alt="Empty Cart" style={{ width: '150px', marginBottom: '20px' }} />
                              <h4>Your order is empty!</h4>
                              <p>Looks like you haven't added anything yet.</p>
                              <p>Why not <Link to="/home">explore our products</Link> and find something you love?</p>
                            </div>
                          </li>
                        )
          }
        </ul>
      </div>
    </div>
    
  );
}

export default ManageOrder;
