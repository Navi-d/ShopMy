import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentProcessing() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => prevCount - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      navigate('/home');
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Processing Payment...</h1>
      <h2>Redirecting to home page in {countdown} seconds</h2>
    </div>
  );
}

export default PaymentProcessing;