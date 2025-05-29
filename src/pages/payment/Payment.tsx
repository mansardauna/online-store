import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { loadStripe } from "@stripe/stripe-js"; 
import PaymentMethod from "../Dashboard/components/PaymentMethod";


const stripePromise = loadStripe("your_stripe_publishable_key");

const Payment:React.FC = () => {
  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Payment gateway" />
      <Elements stripe={stripePromise}>
        <PaymentMethod userProfile={Payment} />
      </Elements>

    </div>
  );
};

export default Payment;
