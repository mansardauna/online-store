// src/pages/ManageUsers.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApexCharts from 'react-apexcharts';
import { users, User } from '../../../constants/constant';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import PaginationComponent from '../../../components/ui/PaginationComponent';

const ManageUsers: React.FC = () => {
  const { t } = useTranslation(['layout']);
  const [userList, setUserList] = useState<User[]>(users);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(userList);
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);

  // Summary data
  const totalUsers = userList.length;
  const adminUsers = userList.filter((u) => u.role === 'admin').length;
  const buyerUsers = userList.filter((u) => u.role === 'buyer').length;

  // Chart data
  const roleChart = {
    series: [adminUsers, buyerUsers],
    options: {
      chart: { type: 'pie', height: 250 },
      labels: [t('admin'), t('buyer')],
      colors: ['#1E3A8A', '#10B981'],
      title: { text: t('usersByRole'), style: { fontSize: '14px' } },
    },
  };

  useEffect(() => {
    let result = userList;
    if (search) {
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (role !== 'All') {
      result = result.filter((u) => u.role.toLowerCase() === role.toLowerCase());
    }
    setFilteredUsers(result);
    setCurrentPage(0);
  }, [search, role, userList]);

  const handleUpdateRole = (id: string, newRole: User['role']) => {
    setUserList(userList.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    toast.success(t('userUpdated'));
  };

  const handleDelete = (id: string) => {
    setUserList(userList.filter((u) => u.id !== id));
    toast.success(t('userDeleted'));
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('manageUsers')}</h2>
       
       <div className="flex gap-4 justify-between">      {/* Summary Cards */}
      <div className="grid grid-cols-1 w-4/12 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="text-sm text-gray-600">{t('totalUsers')}</h4>
          <p className="text-2xl font-bold text-primary">{totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="text-sm text-gray-600">{t('adminUsers')}</h4>
          <p className="text-2xl font-bold text-primary">{adminUsers}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="text-sm text-gray-600">{t('buyerUsers')}</h4>
          <p className="text-2xl font-bold text-primary">{buyerUsers}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white flex-grow p-4 rounded-lg border mb-6">
        <ApexCharts
          options={roleChart.options}
          series={roleChart.series}
          type="pie"
          height={250}
        />
      </div>
      </div>

      {/* Filters */}
      <div className="mb-2">
        <div className="flex flex-col justify-end sm:flex-row gap-4">
          <input
            type="text"
            placeholder={t('searchUsers')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border w-4/12 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">{t('allRoles')}</option>
            <option value="admin">{t('admin')}</option>
            <option value="buyer">{t('buyer')}</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Name</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Email</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Role</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Last Active</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleUpdateRole(user.id, e.target.value as User['role'])}
                    className="p-1 rounded text-sm bg-gray-100"
                  >
                    <option value="admin">{t('admin')}</option>
                    <option value="buyer">{t('buyer')}</option>
                  </select>
                </td>
                <td className="py-3 px-4">{new Date(user.lastActive).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label={t('deleteUser')}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredUsers.length > itemsPerPage && (
        <div className="mt-6">
          <PaginationComponent
            pageCount={Math.ceil(filteredUsers.length / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={(data) => setCurrentPage(data.selected)}
          />
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageUsers;