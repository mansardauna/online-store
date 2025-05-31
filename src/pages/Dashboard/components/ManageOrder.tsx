// src/pages/ManageOrders.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApexCharts from 'react-apexcharts';
import { orders, Order, paginationItems, users } from '../../../constants/constant';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import PaginationComponent from '../../../components/ui/PaginationComponent';

const ManageOrders: React.FC = () => {
  const { t } = useTranslation(['layout']);
  const [orderList, setOrderList] = useState<Order[]>(orders);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orderList);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);

  // Summary data
  const totalOrders = orderList.length;
  const pendingOrders = orderList.filter((o) => o.status === 'pending').length;
  const totalRevenue = orderList
    .reduce((sum, o) => sum + parseFloat(o.totalAmount), 0)
    .toFixed(2);

  // Chart data
  const statusChart = {
    series: [
      {
        name: t('orders'),
        data: [
          orderList.filter((o) => o.status === 'pending').length,
          orderList.filter((o) => o.status === 'shipped').length,
          orderList.filter((o) => o.status === 'delivered').length,
          orderList.filter((o) => o.status === 'cancelled').length,
        ],
      },
    ],
    options: {
      chart: { type: 'bar', height: 250 },
      xaxis: {
        categories: [t('pending'), t('shipped'), t('delivered'), t('cancelled')],
      },
      colors: ['#1E3A8A'],
      title: { text: t('ordersByStatus'), style: { fontSize: '14px' } },
    },
  };

  useEffect(() => {
    let result = orderList;
    if (search) {
      result = result.filter((o) => {
        const product = paginationItems.find((p) => p.id === o.productId);
        const customer = users.find((u) => u.id === o.customerId);
        return (
          product?.productName.toLowerCase().includes(search.toLowerCase()) ||
          customer?.name.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    if (status !== 'All') {
      result = result.filter((o) => o.status.toLowerCase() === status.toLowerCase());
    }
    setFilteredOrders(result);
    setCurrentPage(0);
  }, [search, status, orderList]);

  const handleUpdateStatus = (id: string, newStatus: Order['status']) => {
    setOrderList(orderList.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
    toast.success(t('orderUpdated'));
  };

  const handleCancel = (id: string) => {
    setOrderList(orderList.map((o) => (o.id === id ? { ...o, status: 'cancelled' } : o)));
    toast.success(t('orderCancelled'));
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('manageOrders')}</h2>
      <div className="flex gap-4 justify-between"> 
      {/* Summary Cards */}
      <div className="grid grid-cols-1 w-4/12 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="text-sm text-gray-600">{t('totalOrders')}</h4>
          <p className="text-2xl font-bold text-primary">{totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="text-sm text-gray-600">{t('pendingOrders')}</h4>
          <p className="text-2xl font-bold text-primary">{pendingOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="text-sm text-gray-600">{t('totalRevenue')}</h4>
          <p className="text-2xl font-bold text-primary">${totalRevenue}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white flex-grow p-4 rounded-lg border mb-6">
        <ApexCharts
          options={statusChart.options}
          series={statusChart.series}
          type="bar"
          height={250}
        />
      </div>
      </div>

      {/* Filters */}
      <div className="mb-2">
      <div className="flex flex-col justify-end sm:flex-row gap-4">
          <input
            type="text"
            placeholder={t('searchOrders')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-4/12 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">{t('allStatuses')}</option>
            <option value="pending">{t('pending')}</option>
            <option value="shipped">{t('shipped')}</option>
            <option value="delivered">{t('delivered')}</option>
            <option value="cancelled">{t('cancelled')}</option>
          </select>
        </div>
      </div>

      {/* Order Table */}
      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Order ID</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Product</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Total</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Status</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order) => {
              const product = paginationItems.find((p) => p.id === order.productId);
              const customer = users.find((u) => u.id === order.customerId);
              return (
                <tr key={order.id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">{product?.productName || 'N/A'}</td>
                  <td className="py-3 px-4">{customer?.name || 'N/A'}</td>
                  <td className="py-3 px-4">${order.totalAmount}</td>
                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleUpdateStatus(order.id, e.target.value as Order['status'])}
                      className={`p-1 rounded text-sm ${
                        order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : order.status === 'shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'delivered'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      <option value="pending">{t('pending')}</option>
                      <option value="shipped">{t('shipped')}</option>
                      <option value="delivered">{t('delivered')}</option>
                      <option value="cancelled">{t('cancelled')}</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleCancel(order.id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={t('cancelOrder')}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredOrders.length > itemsPerPage && (
        <div className="mt-6">
          <PaginationComponent
            pageCount={Math.ceil(filteredOrders.length / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={(data) => setCurrentPage(data.selected)}
          />
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageOrders;