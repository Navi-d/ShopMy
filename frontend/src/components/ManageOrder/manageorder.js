import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing later
import './manageorder.css';

function ManageOrder() {
  const orders = [
    // Replace with API call to fetch orders
    {
      id: 1,
      orderName: "HyperX Cloud 3 Wired: ",
      status: "Delivered",
      imageUrl: "https://hyperx.com/cdn/shop/files/hyperx_cloud_iii_red_66x0049_main_1.jpg?v=1712783811",
    },
    { id: 2,
      orderName: "GIGABYTE Laptop: ",
      status: "Delivered", 
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb7eFn0JxNjxcHVFtabUfMwGvRahC8F5we9CoZWtNMMw&s" },
    {
      id: 1,
      orderName: "SecretLab X PaperRex Limited Edition: ",
      status: "Shipped",
      imageUrl: "https://images.secretlab.co/theme/common/pprx-splash-chair-mobile.png",
    },
    {
      id: 1,
      orderName: "Iphone 15 PRO: ",
      status: "Shipped",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmjh_2Nf0zNjqPt5EmJ4Mz5XIK5zFAkLKhDuWSWnrCKg&s",
    },
    {
      id: 1,
      orderName: "Playstation 5 Gaming Console: ",
      status: "Shipped",
      imageUrl: "https://images.immediate.co.uk/production/volatile/sites/3/2020/08/playstation-5-77d37a0.jpg?quality=90&resize=980,654",
    },
    {
      id: 1,
      orderName: "Roomba K9: ",
      status: "Shipped",
      imageUrl: "https://visionary.com.my/cdn/shop/products/j7_Photo_Studio_CleanbaseRobot_LeftFacing_Phonecopy_8be0d7d1-8bd8-4637-975b-fc7b102c853c.jpg?v=1671415082",
    },
    {
      id: 1,
      orderName: "Logitech Superlight X: ",
      status: "Shipped",
      imageUrl: "https://90a1c75758623581b3f8-5c119c3de181c9857fcb2784776b17ef.ssl.cf2.rackcdn.com/669865_605030_01_front_comping.jpg",
    },
    {
      id: 1,
      orderName: "Kindle Paperwhite 2: ",
      status: "Ready to be Shipped: ",
      imageUrl: "https://kindlemalaysia.com/wp-content/uploads/2021/11/All-new-Kindle-Paperwhite-8-GB-Front-%E2%80%93-Now-with-a-6.8-display-and-adjustable-warm-light-%E2%80%93-Ads-in-Malaysia.jpg",
    },
    {
      id: 1,
      orderName: "Innergie Gaming Charger: ",
      status: "Ready to be Shipped: ",
      imageUrl: "https://laz-img-sg.alicdn.com/p/8c7bdea1ae71d13b93e4935c4d113a0b.jpg",
    },
    {
      id: 1,
      orderName: "Nintendo Switch: ",
      status: "Ready to be Shipped: ",
      imageUrl: "https://m.media-amazon.com/images/I/51Gz7IimgoL._AC_UF894,1000_QL80_DpWeblab_.jpg",
    },
  ];

  return (
    <div className="manage-order m-4 p-3 rounded-2 shadow">
      <h2 class="section-heading">My Orders</h2>
      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            <div className="order-details-wrapper">
              <div className="order-image-wrapper">
                <img src={order.imageUrl} alt={`Order ${order.id} Image`} className="order-image" />
              </div>
              <div className="order-info">
                <span className="order-name">{order.orderName}</span>
                <div className="order-status-wrapper">
                  <span className="order-status">{order.status}</span>
                  {/* ... other order details (if needed) */}
                </div>
              </div>
              <div className="order-actions">
                <Link to={`/track-order/${order.id}`}>
                  <button className="track-order-btn">Track Order</button>
                </Link>
                <Link to={`/track-order/${order.id}`}>
                  <button className="track-order-btn">Contact Seller</button>
                </Link>
                <Link to={`/track-order/${order.id}`}>
                <button className="contact-seller-btn">Request Refund</button>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageOrder;
