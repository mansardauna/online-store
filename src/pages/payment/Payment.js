import { Elements } from "@stripe/react-stripe-js";
import React from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Button from "../../components/ui/Button";
import DownloadButton from "../../components/ui/DownloadButton";
import { loadStripe } from "@stripe/stripe-js"; // Import 'load

import PaymentMethod from "../Dashboard/PaymentMethod";

const stripePromise = loadStripe("your_stripe_publishable_key");

const Payment = () => {
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
