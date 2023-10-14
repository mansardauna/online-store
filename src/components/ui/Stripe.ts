import { loadStripe } from '@stripe/stripe-js';

// Replace 'your_stripe_publishable_key' 
const stripePromise = loadStripe('your_stripe_publishable_key');

export default stripePromise;
