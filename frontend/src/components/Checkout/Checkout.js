
import React, { useState } from 'react';
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
  const navigate = useNavigate();


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
    setSelectedVoucher(voucher.code);
    setDiscount(voucher.amount);
    const newTotal = subtotal + tax + 2 - voucher.amount;
    setTotal(newTotal);
    updateTotal(newTotal);
  };

  const setVoucher = (voucher) => {
    if (voucher){
      const code = voucher.toUpperCase();
      const matchingVoucher = vouchers.find(voucher => voucher.code === code);
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

  const vouchers = [
    { id: 1, code: "VOUCHER1", amount: 10 },
    { id: 2, code: "VOUCHER2", amount: 2 },
    { id: 3, code: "VOUCHER5", amount: 5 },
    { id: 4, code: "VOUCHER3", amount: 3 },
    { id: 5, code: "VOUCHER14", amount: 14 },
    { id: 6, code: "VOUCHER16", amount: 16 },
  ];

  const items = [
    { id: 1, img: "https://images-na.ssl-images-amazon.com/images/I/714im+KNaqL._AC_UL320_SR320,320_.jpg", name: "Item 1", description: "this is the description for item 1", price: 10 },
    { id: 2, img: "https://images-na.ssl-images-amazon.com/images/I/714im+KNaqL._AC_UL320_SR320,320_.jpg", name: "item 2", description: "this is the description for item 2", price: 5 },
  ];

  const subtotal = items.reduce((total, item) => total + item.price, 0);
  const tax = subtotal * 0.1;

  const [total, setTotal] = useState(subtotal + tax + 2);

  const updateTotal = (total) =>{
    if (total < 0) {
      setTotal(0);
    }
  };

  const handleSubmit = (e) => {
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

    document.getElementById('notification').classList.remove('hide');
    setTimeout(function() {
      document.getElementById('notification').classList.add('hide');
      setTimeout(function() {
        navigate('/payment'); 
      }, 500); 
    }, 1500);
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
                    {items.map((item) =>(
                      <div class="order-item d-flex justify-content-between mb-3">
                        <div class="d-flex">
                          <img
                            src={item.img}
                            alt="item"
                            class="img-thumbnail mr-3"
                          />
                          <div class="item-details" >
                            <div class="order-summary d-flex  mb-2">
                              <p class="item-name">{item.name}</p>
                            </div>
                            <p class="item-description">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <p class="item-price">RM{item.price}</p>
                      </div>
                    ))}
                    
                    
                    <hr class="my-2" />
                    <div class="order-summary d-flex justify-content-between mb-2">
                      <p class="text-muted">Subtotal:</p>
                      <p>RM{subtotal}</p>
                    </div>
                    <div class="order-summary d-flex justify-content-between mb-2">
                      <p class="text-muted">Shipping:</p>
                      <p>RM2</p>
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
                      <p>RM{total}</p>
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
                              <li class="voucher-button" key={voucher.id} onClick={() => applyVoucher(voucher)} data-bs-dismiss="modal">
                                {voucher.code} - RM{voucher.amount}
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
