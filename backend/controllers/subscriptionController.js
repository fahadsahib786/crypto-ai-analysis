import stripe from 'stripe';
import User from '../models/User.js';
import { sendSubscriptionEmail } from '../utils/emailUtils.js';

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

const subscribe = async (req, res) => {
  const { plan, paymentMethodId } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);

    // Create a Stripe customer if the user doesn't already have one
    let customerId = user.stripeCustomerId;
    if (!customerId) {
      const customer = await stripeClient.customers.create({ email: user.email });
      customerId = customer.id;
      user.stripeCustomerId = customerId;
    }

    // Attach the payment method to the customer
    await stripeClient.paymentMethods.attach(paymentMethodId, { customer: customerId });

    // Set the default payment method on the customer
    await stripeClient.customers.update(customerId, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    // Subscribe the user to the plan
    const subscription = await stripeClient.subscriptions.create({
      customer: customerId,
      items: [{ plan: plan === 'premium' ? process.env.STRIPE_PREMIUM_PLAN_ID : process.env.STRIPE_FREE_PLAN_ID }],
      expand: ['latest_invoice.payment_intent'],
    });

    user.subscription = plan;
    await user.save();

    await sendSubscriptionEmail(user.email, plan);

    res.status(200).json({ subscription });
  } catch (error) {
    res.status(500).json({ message: 'Error subscribing to plan', error });
  }
};

export { subscribe };
