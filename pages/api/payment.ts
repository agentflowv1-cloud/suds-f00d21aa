import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe('YOUR_STRIPE_SECRET_KEY', {
  apiVersion: '2022-11-15',
});

const payment = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { name, email, cardNumber, expirationDate, cvv, amount, paymentMethod } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        payment_method_types: [paymentMethod],
      });
      const clientSecret = paymentIntent.client_secret;
      res.status(200).json({ clientSecret });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ message: 'Payment failed' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default payment;