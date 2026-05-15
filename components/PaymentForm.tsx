import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/payment', {
        name,
        email,
        cardNumber,
        expirationDate,
        cvv,
        amount,
        paymentMethod,
      });
      if (response.status === 200) {
        setSuccess('Payment successful');
        setError(null);
      } else {
        setError('Payment failed');
        setSuccess(null);
      }
    } catch (error: any) {
      setError(error.message);
      setSuccess(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>
        Card Number:
        <input type="text" value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} />
      </label>
      <label>
        Expiration Date:
        <input type="text" value={expirationDate} onChange={(event) => setExpirationDate(event.target.value)} />
      </label>
      <label>
        CVV:
        <input type="text" value={cvv} onChange={(event) => setCvv(event.target.value)} />
      </label>
      <label>
        Amount:
        <input type="number" value={amount} onChange={(event) => setAmount(Number(event.target.value))} />
      </label>
      <label>
        Payment Method:
        <select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}>
          <option value="credit">Credit</option>
          <option value="paypal">PayPal</option>
        </select>
      </label>
      <button type="submit">Pay</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default PaymentForm;