import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

const PaymentHistory = () => {
  const { t } = useTranslation(['layout']);
  const user = useSelector((state) => state.auth.user); // Assuming you have user data in your Redux store.
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch payment history data from your mock API running on port 3001
    axios
      .get('http://localhost:3001/api/payment/history') 
      .then((response) => {
        setPaymentHistory(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold w-fit m-auto uppercase mb-4">{t('Payment History')}</h2>
      {loading && <p>{t('Loading...')}</p>}
      {error && <p>{t('Error fetching payment history.')}</p>}
      {!loading && !error && paymentHistory.length === 0 ? (
        <p>{t('No payment history available.')}</p>
      ) : (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th>{t('Date')}</th>
              <th>{t('Amount')}</th>
              <th>{t('Description')}</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment) => (
              <tr key={payment.id} className="p-2 border">
                <td className='p-2  m-auto border text-center'>{payment.date}</td>
                <td className='border text-center'>${payment.amount.toFixed(2)}</td>
                <td className='text-center'>{payment.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
