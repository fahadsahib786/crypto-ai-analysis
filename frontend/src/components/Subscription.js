// frontend/src/components/Subscription.js
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('your-stripe-publishable-key');

const CheckoutForm = ({ plan }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
    } else {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_ROUTE_URI}/api/subscribe`,
          { plan, paymentMethodId: paymentMethod.id },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        console.log('Subscription successful:', response.data);
      } catch (error) {
        setError('Subscription failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Subscribe
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

const Subscription = () => {
  const [plan, setPlan] = useState('free');

  return (
    <div>
      <h1>Subscription</h1>
      <div>
        <label>
          <input
            type="radio"
            value="free"
            checked={plan === 'free'}
            onChange={() => setPlan('free')}
          />
          Free
        </label>
        <label>
          <input
            type="radio"
            value="premium"
            checked={plan === 'premium'}
            onChange={() => setPlan('premium')}
          />
          Premium - $20/month
        </label>
      </div>
      <Elements stripe={stripePromise}>
        <CheckoutForm plan={plan} />
      </Elements>
    </div>
  );
};

export default Subscription;
