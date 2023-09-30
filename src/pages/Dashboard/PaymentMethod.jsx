import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useTranslation } from 'react-i18next';
import Button from '../../components/ui/Button';
import axios from 'axios';

const PaymentMethod = ({ shippingCharge, itemTitle, itemPrice, totalAmt }) => {

  const stripe = useStripe();
  const elements = useElements();

  const [paymentError, setPaymentError] = useState(null);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const { t } =useTranslation (["layout"])
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }


    const cardElement = elements.getElement(CardElement);

    try {
      // You can replace this with your own logic to handle the payment, e.g., charging the card.
      
      await makePayment(); // Replace this with your payment logic.

     
      setPaymentComplete(true);
      setPaymentError(null);
    } catch (error) {
      
      console.error('Error:', error.message);
      setPaymentError(error.message);
      setPaymentComplete(false);
    }
  };

  // Replace this function with your own payment logic.
  const makePayment = async () => {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 2000); 
    });
  };
  const handlePayment = () => {
    // Make a POST request to your API endpoint to process the payment
    axios.post('/api/payment/process', {
      amount: parseFloat(totalAmt), // Send the total payment amount
      description: 'Payment for order', // Customize the description as needed
    })
    .then((response) => {
      setPaymentComplete(true);
      setPaymentError(null);
      // You can update the payment history here by fetching it again from the API
    })
    .catch((error) => {
      setPaymentComplete(false);
      setPaymentError(error.message);
    });
  };
  return (
    <div>
      {paymentComplete ? (
        <p>Payment successful!</p>
      ) : (
        <div className='border p-5 mt-5 md:w-1/2 m-auto rounded-md'>
        <div>
          <div className='text-3xl font-semibold m-auto w-fit uppercase'>{t("Payment")}</div>
          <div>

          <p className="flex items-center justify-between border-[1px]  border-b-0 py-1.5 text-lg mt-5 px-4 font-medium">
                  {t("ProductName")}
                  <span className="font-semibold tracking-wide font-titleFont">
                   {}
                  </span>
                </p>

                <p className="flex items-center justify-between border-[1px]  border-b-0 py-1.5 text-lg px-4 font-medium">
                  {t("Grand")}
                  <span className="font-semibold tracking-widefont-titleFont">
                  ${itemPrice}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px]  border-b-0 py-1.5 text-lg px-4 font-medium">
                  {t("ShippingFee")}
                  <span className="font-semibold tracking-wide font-titleFont">
                    ${shippingCharge}
                  </span>
                </p>
                <p className="flex items-center justify-between border-[1px]  py-1.5 text-lg px-4 font-medium">
                  {t("Total")}
                  <span className="font-bold tracking-wide text-lg font-titleFont">
                    {(parseFloat(totalAmt) + parseFloat(shippingCharge)).toFixed(2)}
                  </span>
                </p>
              </div>
          </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
          <label className='text-2xl font-light text-gray-400'>
            {t("cardDetail")}
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
              className="p-2 border rounded-md"
            />
          </label>

          {paymentError && (
            <div className="text-red-600">{paymentError}</div>
          )}
          
           
          <Button
          variant={"primary"}
            type="submit"
            onClick={handlePayment}
            disabled={!stripe}
            className="mt-2 w-40 bg-blue-500 text-white rounded px-4  py-2"
          >
            Pay ${(parseFloat(totalAmt) + parseFloat(shippingCharge)).toFixed(2)}
          </Button>
        </form>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
