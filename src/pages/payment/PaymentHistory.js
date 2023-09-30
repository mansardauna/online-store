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
    // Fetch payment history data from your backend API
    axios
      .get('/api/payment/history') // Adjust the API endpoint as needed
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
              <tr key={payment.id}>
                <td>{payment.date}</td>
                <td>${payment.amount.toFixed(2)}</td>
                <td>{payment.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PaymentHistory;
