import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Apple iPad',
      price: 499.00, 
      imageUrl: 'https://www.apple.com/newsroom/images/product/ipad/standard/apple_ipados14_widgets_062220_big.jpg.large.jpg',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Google Pixel',
      price: 299.00, 
      imageUrl: 'https://lh3.googleusercontent.com/KaLIFYVg9298b8jv33H3pagRaAz4lCQxrQz-goMEsiTuCmUf2Ood9ktkzgjpotkMuRcAMimOV2RfN7vBZVmnInf5wcwUNsRZpw',
      quantity: 1,
    },
    {
        id: 3,
        name: 'Random Product',
        price: 640.00, 
        imageUrl: 'https://assets2.razerzone.com/images/pnx.assets/33b3ddff006018e916f46154995087c0/razer-basilisk-v3-x-hyperspeed-500x500.png',
        quantity: 1,
      },
    {
        id: 4,
        name: 'Random Product',
        price: 640.00, 
        imageUrl: 'https://assets2.razerzone.com/images/pnx.assets/33b3ddff006018e916f46154995087c0/razer-basilisk-v3-x-hyperspeed-500x500.png',
        quantity: 1,
    },
    {
        id: 5,
        name: 'Random Product',
        price: 640.00, 
        imageUrl: 'https://assets2.razerzone.com/images/pnx.assets/33b3ddff006018e916f46154995087c0/razer-basilisk-v3-x-hyperspeed-500x500.png',
        quantity: 1,
    },
    {
        id: 6,
        name: 'Random Product',
        price: 640.00, 
        imageUrl: 'https://assets2.razerzone.com/images/pnx.assets/33b3ddff006018e916f46154995087c0/razer-basilisk-v3-x-hyperspeed-500x500.png',
        quantity: 1,
    },
    {
        id: 7,
        name: 'Random Product',
        price: 640.00, 
        imageUrl: 'https://assets2.razerzone.com/images/pnx.assets/33b3ddff006018e916f46154995087c0/razer-basilisk-v3-x-hyperspeed-500x500.png',
        quantity: 1,
    },
  ]);

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    updateSubtotal();
  }, [cartItems]);

  const updateSubtotal = () => {
    let newSubtotal = 0;
    cartItems.forEach(item => {
      newSubtotal += item.price * item.quantity;
    });
    setSubtotal(newSubtotal);
    updateTotal(newSubtotal);
  };

  const updateTotal = (newSubtotal) => {
    const shipping = newSubtotal > 0 ? 25 : 0;
    setTotal(newSubtotal + shipping);
  };

  const incrementQuantity = (index) => {
    const newItems = [...cartItems];
    newItems[index].quantity += 1;
    setCartItems(newItems);
  };

  const decrementQuantity = (index) => {
    if (cartItems[index].quantity > 1) {
      const newItems = [...cartItems];
      newItems[index].quantity -= 1;
      setCartItems(newItems);
    }
  };

  const handleQuantityChange = (index, value) => {
    const newItems = [...cartItems];
    newItems[index].quantity = Math.max(0, parseInt(value, 10) || 0);
    setCartItems(newItems);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
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
          <ul className="list-group">
            {cartItems.map((item, index) => (
              <li key={item.id} className="list-group-item d-flex align-items-start">
                <div className="row d-flex justify-content-between align-items-center">
                  <div className="col-md-2 col-lg-2 col-xl-2">
                    <img src={item.imageUrl} alt={item.name} className="img-fluid" />
                  </div>
                  <div className="col-md-3 col-lg-3 col-xl-3">
                    <p className="lead fw-normal mb-2">{item.name}</p>
                  </div>
                  <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                    <button className="btn btn-link px-2" onClick={() => decrementQuantity(index)}>
                      <i className="fas fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                      className="form-control form-control-sm"
                    />
                    <button className="btn btn-link px-2" onClick={() => incrementQuantity(index)}>
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                    <h5 className="mb-0">${item.price.toFixed(2)}</h5>
                  </div>
                  <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                    <button onClick={() => handleRemoveItem(index)} className="btn btn-link text-danger">
                      <i className="fas fa-trash fa-lg"></i>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-4">
          <h2>.</h2>
          <div className="sticky-top" style={{ top: '125px'}}>
            <div className="card">
              <div className="card-header">Cart Summary</div>
              <div className="card-body d-flex flex-column">
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>${subtotal > 0 ? '25.00' : '0.00'}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong>${total.toFixed(2)}</strong>
                </div>
                <button className="btn btn-dark btn-block">Proceed to Checkout</button>
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
                        <span className="text-muted" style={{ fontSize: '12px' }}>{product.price.toFixed(2)}</span>
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
