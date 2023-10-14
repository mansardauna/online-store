import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useTranslation } from 'react-i18next';
import Button from '../../../components/ui/Button';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToOrderHistory, resetCart, resetOrders } from '../../../redux/orebiSlice';

interface PaymentMethodProps {
  shippingCharge: number;
  itemTitle: string;
  itemPrice: number;
  totalAmt: number;
  context: 'cartItem' | 'orderItem';
  onSuccess: () => void;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  shippingCharge,
  itemTitle,
  itemPrice,
  totalAmt,
  context,
  onSuccess,
}) => {
  const stripe: any = useStripe(); // Use a more specific type if available
  const elements: any = useElements(); // Use a more specific type if available
  const [paymentError, setPaymentError] = useState<string | null>(null); // Define the type explicitly
  const [paymentComplete, setPaymentComplete] = useState<boolean>(false); // Define the type explicitly
  const { t } = useTranslation(['layout']);
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      await makePayment();
      setPaymentComplete(true);
      setPaymentError(null);
    } catch (error:any) {
      console.error('Error:', error.message);
      setPaymentError(error.message);
      setPaymentComplete(false);
    }
  };

  const makePayment = async () => {
    return new Promise((resolve:any) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  const handlePayment = () => {
    axios
      .post('http://localhost:3001/api/payment/history', {
        amount: parseFloat(totalAmt),
        description: 'Payment for order',
      })
      .then((response) => {
        setPaymentComplete(true);
        setPaymentError(null);
        onSuccess(); // Trigger the success action when payment is complete
      })
      .catch((error) => {
        setPaymentComplete(false);
        setPaymentError(error.message);
      });
  };

  const handlePaymentSuccess = () => {
    if (context === 'cartItem') {
      dispatch(resetCart());
    } else if (context === 'orderItem') {
      dispatch(resetOrders());
    }
  };

  return (
    <div>
      {paymentComplete ? (
        <div className="w-fit m-auto flex flex-col items-center gap-3">
          <p className="text-green-700">{t('successful')}</p>
          <Button
            variant="primary"
            onClick={handlePaymentSuccess}
            className="rounded-md w-20"
          >
            {t('Ok')}
          </Button>
        </div>
      ) : (
        <div className="border p-5 mt-5 md:w-1/2 m-auto rounded-md">
          <div>
            <div className="text-3xl font-semibold m-auto w-fit uppercase">
              {t('Payment')}
            </div>
            <div>
              <p className="flex items-center justify-between border-[1px] border-b-0 py-1.5 text-lg mt-5 px-4 font-medium">
                {t('ProductName')}
                <span className="font-semibold tracking-wide font-titleFont">
                  {itemTitle}
                </span>
              </p>

              <p className="flex items-center justify-between border-[1px] border-b-0 py-1.5 text-lg px-4 font-medium">
                {t('Grand')}
                <span className="font-semibold tracking-widefont-titleFont">
                  ${itemPrice}
                </span>
              </p>
              <p className="flex items-center justify-between border-[1px] border-b-0 py-1.5 text-lg px-4 font-medium">
                {t('ShippingFee')}
                <span className="font-semibold tracking-wide font-titleFont">
                  ${shippingCharge}
                </span>
              </p>
              <p className="flex items-center justify-between border-[1px] py-1.5 text-lg px-4 font-medium">
                {t('Total')}
                <span className="font-bold tracking-wide text-lg font-titleFont">
                  {(parseFloat(totalAmt) + parseFloat(shippingCharge)).toFixed(2)}
                </span>
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-5">
            <label className="text-2xl font-light text-gray-400">
              {t('cardDetail')}
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

            {paymentError && <div className="text-red-600">{paymentError}</div>}

            <Button
              variant="primary"
              onClick={handlePayment}
              disabled={!stripe}
              className="mt-2 w-40 bg-blue-500 text-white rounded px-4 py-2"
            >
              {t('pay')} ${(parseFloat(totalAmt) + parseFloat(shippingCharge)).toFixed(2)}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
