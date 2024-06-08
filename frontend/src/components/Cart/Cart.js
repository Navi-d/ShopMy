import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash, faHeart as faHeartRegular } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const userId = "6663da073801ff9b916613b6";

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      // const response = await fetch(`/api/Cart/getCart/${userId}`);
      const response = await fetch(`http://localhost:3001/api/Cart/getCart/${userId}`);
      if (response.ok) {
        const cartData = await response.json();
        setCartItems(cartData);
        updateSubtotal(cartData);
      } else {
        const errorMessage = await response.text();
        console.error('Error getting cart:', errorMessage);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const updateSubtotal = (items) => {
    let newSubtotal = 0;
    items.forEach(item => {
      const price = parseFloat(item.productId.productPrice);
      const quantity = item.quantity;
      newSubtotal += price * quantity;
    });
    setSubtotal(newSubtotal);
    updateTotal(newSubtotal);
  };

  const updateTotal = (newSubtotal) => {
    const shipping = newSubtotal > 0 ? 25 : 0;
    setTotal(newSubtotal + shipping);
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) return;
    try {
      const response = await fetch('http://localhost:3001/api/cart/updateQuantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId, quantity: newQuantity }),
      });

      if (response.ok) {
        fetchCart();
      } else {
        console.error('Error updating quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };


  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch('http://localhost:3001/api/cart/removeFromCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId }),
      });

      if (response.ok) {
        fetchCart();
      } else {
        console.error('Error removing item from cart');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleAddToWishlist = async (productId) => {
    try {
      // First, remove the product from the cart
      const cartResponse = await fetch('http://localhost:3001/api/cart/removeFromCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId }),
      });

      if (cartResponse.ok) {
        // Then, add the product to the wishlist
        const wishlistResponse = await fetch('http://localhost:3001/api/wishlist/addToWishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, productId }),
        });

        if (wishlistResponse.ok) {
          fetchCart();
        } else {
          console.error('Error adding to wishlist');
        }
      } else {
        console.error('Error removing from cart');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const extraProducts = [
    { id: 1, name: "Random Product", price: 25.00, imageUrl: "https://assets2.razerzone.com/images/pnx.assets/33b3ddff006018e916f46154995087c0/razer-basilisk-v3-x-hyperspeed-500x500.png" },
    { id: 2, name: "Random Product", price: 25.00, imageUrl: "https://assets2.razerzone.com/images/pnx.assets/33b3ddff006018e916f46154995087c0/razer-basilisk-v3-x-hyperspeed-500x500.png" },
    { id: 3, name: "Random Product", price: 25.00, imageUrl: "https://assets2.razerzone.com/images/pnx.assets/33b3ddff006018e916f46154995087c0/razer-basilisk-v3-x-hyperspeed-500x500.png" },
  ];

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <h2>Shopping Cart</h2>
          <ul className="list-group mb-5">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <li key={item._id} className="list-group-item d-flex align-items-start">
                  <div className="row d-flex justify-content-between align-items-center">
                    <div className="col-md-2 col-lg-2 col-xl-2">
                      <img src={item.productId.productLink} alt={item.productId.productTitle} className="img-fluid" />
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-3">
                      <p className="lead fw-normal mb-2">{item.productId.productTitle}</p>
                    </div>
                    <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                      <button className="btn btn-link px-2" onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}>
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <input
                        style={{ minWidth: "50px" }}
                        type="number"
                        value={item.quantity}
                        onChange={(e) => {
                          const quantity = parseInt(e.target.value, 10);
                          if (quantity >= 0) {
                            // Call updateQuantity function with the new quantity
                          }
                        }}
                        className="form-control form-control-sm"
                      />
                      <button className="btn btn-link px-2" onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}>
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                    <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                      <h5 className="mb-0">RM{(item.productId.productPrice * item.quantity).toFixed(2)}</h5>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <button onClick={() => handleAddToWishlist(item.productId._id)} className="btn btn-link text-danger">
                        <FontAwesomeIcon icon={faHeartSolid} />
                      </button>
                    </div>
                    <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                      <button onClick={() => handleRemoveItem(item.productId._id)} className="btn btn-link text-danger">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="list-group-item text-center py-5">
                <div>
                  <img src="/cart/empty-cart.png" alt="Empty Cart" style={{ width: '150px', marginBottom: '20px' }} />
                  <h4>Your cart is empty!</h4>
                  <p>Looks like you haven't added anything yet.</p>
                  <p>Why not <Link to="/home">explore our products</Link> and find something you love?</p>
                </div>
              </li>
            )}
          </ul>
        </div>

        <div className="col-md-4">
          <div className="sticky-top-x" style={{ top: '125px' }}>
            <div className="card">
              <div className="card-header">Cart Summary</div>
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>RM{subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>RM{subtotal > 0 ? '25.00' : '0.00'}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong>RM{total.toFixed(2)}</strong>
                </div>

                <Link to="/checkout" className="btn btn-dark btn-block">Proceed to Checkout</Link>

              </div>
            </div>
            <div className="mt-3 p-0 border rounded">
              <div className="bg-light p-3 border-bottom">
                You May Also Like
              </div>
              {extraProducts.map(product => (
                <div key={product.id} className="d-flex align-items-center p-3 border-bottom">
                  <img src={product.imageUrl} alt={product.name} className="mr-3" style={{ width: '60px', height: '60px' }} />
                  <div className="flex-column">
                    <span className="font-weight-normal" style={{ fontSize: '14px', color: '#333', margin: '10px' }}>{product.name}</span>
                    <span className="text-muted" style={{ fontSize: '12px' }}>RM{product.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;