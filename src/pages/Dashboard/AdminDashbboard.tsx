// src/pages/AdminDashboard.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ApexCharts from 'react-apexcharts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ChartBarIcon,
  BellIcon,
  DocumentTextIcon,
  UserIcon,
  CogIcon,
  Bars3Icon,
} from '@heroicons/react/24/outline';
import {
  invoices,
  notifications,
  users,
  paginationItems,
  Product,
  Invoice as InvoiceType,
  Notification as NotificationType,
} from '../../constants/constant';

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation(['layout']);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Chart data
  const salesChart = {
    series: [
      {
        name: 'Sales',
        data: [35, 112, 134000, 112, 134, 799, 65, 999],
      },
    ],
    options: {
      chart: { type: 'line', height: 350 },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
      },
      colors: ['#1E3A8A'],
      title: { text: t('monthlySales'), style: { fontSize: '16px' } },
    },
  };

  const invoiceStatusChart = {
    series: [
      invoices.filter((inv) => inv.status === 'paid').length,
      invoices.filter((inv) => inv.status === 'pending').length,
      invoices.filter((inv) => inv.status === 'overdue').length,
    ],
    options: {
      chart: { type: 'pie', height: 350 },
      labels: ['Paid', 'Pending', 'Overdue'],
      colors: ['#10B981', '#FBBF24', '#EF4444'],
      title: { text: t('invoiceStatus'), style: { fontSize: '16px' } },
    },
  };

  // Notification dismiss
  const dismissNotification = (id: string) => {
    toast.success(t('notificationDismissed'));
    // In a real app, remove from state or API
  };

  // Invoice actions
  const viewInvoice = (invoice: InvoiceType) => {
    const product = paginationItems.find((p) => p.id === invoice.productId);
    navigate(`/products/${invoice.productId}`, { state: { item: product } });
  };

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64  transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:w-64 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label={t('closeSidebar')}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
        <nav className="mt-4">
          <a
            href="#overview"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <ChartBarIcon className="w-5 h-5 mr-2" />
            {t('overview')}
          </a>
          <a
            href="#invoices"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <DocumentTextIcon className="w-5 h-5 mr-2" />
            {t('invoices')}
          </a>
          <a
            href="#notifications"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <BellIcon className="w-5 h-5 mr-2" />
            {t('notifications')}
          </a>
          <a
            href="#users"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <UserIcon className="w-5 h-5 mr-2" />
            {t('users')}
          </a>
          <a
            href="#settings"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-200"
          >
            <CogIcon className="w-5 h-5 mr-2" />
            {t('settings')}
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="p-4 flex items-center justify-between">
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label={t('openSidebar')}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <h2 className="text-xl text-gray-800">{t('dashboard')}</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{t('welcome', { name: 'Admin' })}</span>
         
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Overview */}
          <section id="overview" className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('overview')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="text-sm text-gray-600">{t('totalRevenue')}</h4>
                <p className="text-2xl font-bold text-primary">${
                  invoices.reduce((sum, inv) => sum + parseFloat(inv.amount), 0).toFixed(2)
                }</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="text-sm text-gray-600">{t('pendingInvoices')}</h4>
                <p className="text-2xl font-bold text-primary">
                  {invoices.filter((inv) => inv.status === 'pending').length}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="text-sm text-gray-600">{t('activeUsers')}</h4>
                <p className="text-2xl font-bold text-primary">{users.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <h4 className="text-sm text-gray-600">{t('newNotifications')}</h4>
                <p className="text-2xl font-bold text-primary">{notifications.length}</p>
              </div>
            </div>
          </section>

          {/* Charts */}
          <section id="charts" className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('charts')}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <ApexCharts
                  options={salesChart.options}
                  series={salesChart.series}
                  type="line"
                  height={350}
                />
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <ApexCharts
                  options={invoiceStatusChart.options}
                  series={invoiceStatusChart.series}
                  type="pie"
                  height={350}
                />
              </div>
            </div>
          </section>

          {/* Invoices */}
          <section id="invoices" className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('recentInvoices')}</h3>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">ID</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Product</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Customer</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Amount</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Status</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => {
                    const product = paginationItems.find((p) => p.id === invoice.productId);
                    return (
                      <tr key={invoice.id} className="border-t hover:bg-gray-50">
                        <td className="py-3 px-4">{invoice.id}</td>
                        <td className="py-3 px-4">{product?.productName || 'N/A'}</td>
                        <td className="py-3 px-4">{invoice.customer}</td>
                        <td className="py-3 px-4">${invoice.amount}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              invoice.status === 'paid'
                                ? 'bg-green-100 text-green-800'
                                : invoice.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {invoice.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => viewInvoice(invoice)}
                            className="text-blue-600 hover:underline"
                            aria-label={t('viewInvoice')}
                          >
                            {t('view')}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          {/* Notifications */}
          <section id="notifications" className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('notifications')}</h3>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg shadow flex justify-between items-center ${
                    notification.type === 'success'
                      ? 'bg-green-50'
                      : notification.type === 'warning'
                      ? 'bg-yellow-50'
                      : notification.type === 'error'
                      ? 'bg-red-50'
                      : 'bg-blue-50'
                  }`}
                >
                  <p className="text-gray-700">{notification.message}</p>
                  <button
                    onClick={() => dismissNotification(notification.id)}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label={t('dismissNotification')}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Users */}
          <section id="users">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('recentUsers')}</h3>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Name</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Email</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Role</th>
                    <th className="py-3 px-4 text-sm font-medium text-gray-600">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t hover:bg-gray-50">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">{user.role}</td>
                      <td className="py-3 px-4">
                        {new Date(user.lastActive).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AdminDashboard;