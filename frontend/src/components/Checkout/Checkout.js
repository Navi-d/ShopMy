
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useNavigate } from 'react-router-dom';


function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState("credit-card");
  const [showBottomForm, setShowBottomForm] = useState(true);
  const [selectedVoucher, setSelectedVoucher] = useState(null); // State to store the selected voucher
  const [discount, setDiscount] = useState(0); // State to store the discount amount
  const [voucherCode, setVoucherCode] = useState(null); // State to store the code for applying the discount
  const [errorMessage, setErrorMessage] = useState('');
  const [placeholder, setPlaceholder] = useState('Enter code or voucher');
  const [invalidCode, setInvalidCode] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalAmount, setTotal] = useState(0);

  const navigate = useNavigate();
  
const userJSON = localStorage.getItem('loggedInUser');
// Parse the JSON string to convert it into a JavaScript object
const user = JSON.parse(userJSON);
// Access the _id property of the object
const userId = user._id;


  useEffect(() => {
    fetchCart();
    fetchUserVouchers();
    const fetchData = async () => {
    try {
      const cartResponse = await fetch(`http://localhost:3001/api/Cart/getCart/${userId}`);

      if (cartResponse.ok) {
        const cartData = await cartResponse.json();
        
        const subtotal = cartData.reduce((total, item) => (total + parseFloat(item.productId.productPrice) * item.quantity), 0).toFixed(2);
        setSubtotal(subtotal);

        const tax = parseFloat((subtotal * 0.1).toFixed(2));
        setTax(tax);

        const totalAmount = (parseFloat(subtotal) + tax + 25).toFixed(2);
        setTotal(totalAmount);
      } else {
        console.error('Error fetching cart or vouchers');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
  }, []);

  const fetchUserVouchers = async () => {
    try {
      const userJSON = localStorage.getItem('loggedInUser');
      const user = JSON.parse(userJSON);
      const userId = user._id;

      const response = await axios.get(`http://localhost:3001/getUserVouchers/${userId}`);
      console.log(response.data);

      setVouchers(response.data);
    } catch (error) {
      console.error('Error fetching user vouchers:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/Cart/getCart/${userId}`);
      if (response.ok) {
        const cartData = await response.json();
        setCartItems(cartData);
      } else {
        const errorMessage = await response.text();
        console.error('Error getting cart:', errorMessage);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const handlePaymentOptionClick = (option) => {
    setSelectedPayment(option);
    if (option === 'cash-on-delivery') {
      setErrorMessage(false);
      setShowBottomForm(false);
    } else {
      setShowBottomForm(true);
    }
  };

  const applyVoucher = (voucher) => {
    setSelectedVoucher(voucher.voucherId.code);
    setDiscount(voucher.voucherId.discount);
    const newTotal = (parseFloat(subtotal) + tax + 25 - voucher.voucherId.discount).toFixed(2);
    setTotal(newTotal);
    updateTotal(newTotal);
  };

  const setVoucher = (voucher) => {
    if (voucher){
      const code = voucher.toUpperCase();
      const matchingVoucher = vouchers.find(voucher => voucher.voucherId.code === code);
      if (matchingVoucher) {
        applyVoucher(matchingVoucher);
      } else {
        setPlaceholder('Code invalid');
        setInvalidCode(true);
        document.getElementById('voucher-input').value = '';
      }
    }
  };

  const handleApplyVoucher = () => {
    setVoucher(voucherCode);
  };

  const handleVoucherCodeChange = (e) => {
    setVoucherCode(e.target.value);
    setInvalidCode(false);
    setPlaceholder('Enter code or voucher');
  };



  const updateTotal = (total) =>{
    if (total < 0) {
      setTotal(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedPayment !== "cash-on-delivery") {
      const nameOnCard = e.target.cardName.value;
      const cardNumber = e.target.cardNumber.value;
      const expirationDate = e.target.expirationDate.value;
      const cvv = e.target.cvv.value;
  
      if (!nameOnCard || !cardNumber || !expirationDate || !cvv) {
        setErrorMessage("Please fill in all required fields.");
      return;
      }
    }

    const deliveryAddress = {
      address: e.target.address.value,
      city: e.target.city.value,
      country: e.target.country.value,
      postcode: e.target.postcode.value
    };

    const orders = cartItems.map(item => ({
      productID: item.productId._id,
      quantity: item.quantity
    }));

    const orderData = {
      userId,
      orders,
      totalPayment: totalAmount,
      paymentType: selectedPayment,
      deliveryAddress
    };
    
    try {
      const response = await fetch('http://localhost:3001/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        document.getElementById('notification').classList.remove('hide');
        setTimeout(function() {
          document.getElementById('notification').classList.add('hide');
          setTimeout(function() {
            navigate('/payment'); 
          }, 500); 
        }, 1500);
      } else {
        const errorMessage = await response.text();
        console.error('Error placing order:', errorMessage);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }

    e.target.reset();
  };

  return (
    <section class="vh-75 bg-image">
      <div class="container py-5 h-100">
        <div id="notification" class="hide">
          Order successfuly placed!
        </div>
        <div class="row d-flex justify-content-end align-items-center h-100">
          <div class="col col-xl-11">
            <div class="row">
              <div class="col-md-8 col-lg-8 flex-grow-2">
                <div class="card">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div class="mb-4">
                        <h5 class="card-title">Delivery Address</h5>
                        <hr />
                        <div class="form-group">
                          <label for="address">Address:</label>
                          <input
                            type="text"
                            class="form-control"
                            id="address"
                            placeholder="Enter your delivery address"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="city">City:</label>
                          <input
                            type="text"
                            class="form-control"
                            id="city"
                            placeholder="Enter city"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="city">Country:</label>
                          <input
                            type="text"
                            class="form-control"
                            id="country"
                            placeholder="Enter country"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="postcode">Postcode:</label>
                          <input
                            type="text"
                            class="form-control"
                            id="postcode"
                            placeholder="Enter postcode"
                            required
                          />
                        </div>
                        <div class="form-group">
                          <label for="phoenNumber">Phone number:</label>
                          <input
                            type="tel"
                            class="form-control"
                            id="phoneNumber"
                            placeholder="Enter phone number"
                            required
                          />
                        </div>
                      </div>

                      <div class="mb-4">
                        <h5 class="card-title">Payment Options</h5>
                        <hr />
                        <div class="d-flex flex-wrap">
                          <button
                            type="button"
                            className={`btn btn-light ${selectedPayment === 'credit-card' ? 'active' : ''}`}
                            onClick={() => handlePaymentOptionClick('credit-card')}
                          >
                            Credit Card
                          </button>
                          <button
                            type="button"
                            className={`btn btn-light ${selectedPayment === 'debit-card' ? 'active' : ''}`}
                            onClick={() => handlePaymentOptionClick('debit-card')}
                          >
                            Debit Card
                          </button>
                          <button
                            type="button"
                            className={`btn btn-light ${selectedPayment === 'cash-on-delivery' ? 'active' : ''}`}
                            onClick={() => handlePaymentOptionClick('cash-on-delivery')}
                          >
                            Cash on Delivery
                          </button>
                        </div>
                        {showBottomForm &&(
                        <div id="credit-card-form">
                          <div class="form-group">
                            <label for="cardName">Name on card:</label>
                            <input
                              type="text"
                              class="form-control"
                              id="cardName"
                              placeholder="Enter name on card"
                            />
                          </div>
                          <div class="form-group">
                            <label for="cardNumber">Card Number:</label>
                            <input
                              type="number"
                              class="form-control"
                              id="cardNumber"
                              placeholder="Enter card number"
                            />
                          </div>
                          <div class="form-row">
                            <div class="col-md-3">
                              <div class="form-group">
                                <label for="expirationDate">Expiration Date:</label>
                                <input
                                  type="month"
                                  class="form-control"
                                  id="expirationDate"
                                  placeholder="MM/YY"
                                />
                              </div>
                            </div>
                            <div class="col-md-3" style={{marginLeft:"18px"}}>
                              <div class="form-group">
                                <label for="cvv">CVV:</label>
                                <input
                                  type="number"
                                  class="form-control"
                                  id="cvv"
                                  placeholder="CVV"
                                  maxLength={4}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        )}

                      </div>
                      <button
                        type="submit"
                        class="btn btn-primary btn btn-block"
                      >
                        Place Order
                      </button>
                    </form>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                  </div>
                  
                </div>
              </div>
              <div class="col-md-4 col-lg-4">
                <div class="card h-100">
                  <div
                    class="card-header bg-light border-bottom"
                  >
                    <h5 class="card-title" style={{textAlign: "center"}}>
                      Order Summary
                    </h5>
                  </div>
                  
                  <div class="card-body p-4">
                    {cartItems.map((item) =>(
                      <div class="order-item d-flex justify-content-between mb-3">
                        <div class="d-flex">
                          <img
                            src={item.productId.productLink}
                            alt="item"
                            class="img-thumbnail mr-3"
                          />
                          <div class="item-details" >
                            <div class="order-summary d-flex  mb-2">
                              <p class="item-name">{item.productId.productTitle}</p>
                            </div>
                            <p class="item-description">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <p class="item-price" style={{marginTop: "20px"}}>RM{(item.productId.productPrice * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                    
                    
                    <hr class="my-2" />
                    <div class="order-summary d-flex justify-content-between mb-2">
                      <p class="text-muted">Subtotal:</p>
                      <p>RM{subtotal}</p>
                    </div>
                    <div class="order-summary d-flex justify-content-between mb-2">
                      <p class="text-muted">Shipping:</p>
                      <p>RM25</p>
                    </div>
                    <div class="order-summary d-flex justify-content-between mb-2">
                      <p class="text-muted">Tax:</p>
                      <p>RM{tax}</p>
                    </div>
                    {selectedVoucher &&(
                    <div class="order-summary d-flex justify-content-between mb-2">
                      <p class="text-muted">{selectedVoucher}:</p>
                      <p>-RM{discount}</p>
                    </div>
                    )}
                    <hr class="my-2" />
                    <div class="order-summary d-flex justify-content-between font-weight-bold">
                      <p>Total:</p>
                      <p>RM{totalAmount}</p>
                    </div>
                    <div class="d-flex mt-4">
                      <input
                        type="text"
                        id="voucher-input"
                        class={`form-control mr-2 ${invalidCode ? 'is-invalid' : ''}`}
                        placeholder={placeholder}
                        style={{width:'75%'}}
                        onChange={handleVoucherCodeChange}
                      />
                      <button
                        type="button"
                        class="btn btn-primary"
                        style={{ marginLeft: "15px", position: "static"}}
                        onClick={handleApplyVoucher}
                      >
                        Apply
                      </button> 
                      
                    </div>
                    <div class="order-summary d-flex justify-content-between mt-1">
                      <p
                        type="button"
                        class="see-voucher"
                        style={{ marginLeft: '5px', position: "static" }}
                        data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                      >
                        See Vouchers Owned
                      </p>
                    </div>
                    
                  </div>
                  
                  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5" id="staticBackdropLabel">Vouchers Owned</h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                          <ul class="voucher-list">
                            {vouchers.map((voucher) => (
                              <li class="voucher-button" key={voucher._id} onClick={() => applyVoucher(voucher)} data-bs-dismiss="modal">
                                {voucher.voucherId.code} - RM{voucher.voucherId.discount}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                      </div>
                    </div>
                  </div>                           

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

}

export default Checkout;
