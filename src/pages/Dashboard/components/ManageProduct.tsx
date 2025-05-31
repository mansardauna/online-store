// src/pages/ManageProducts.tsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApexCharts from 'react-apexcharts';
import { paginationItems, Product, categoriesData } from '../../../constants/constant';
import { TrashIcon, PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import PaginationComponent from '../../../components/ui/PaginationComponent';

const ManageProducts: React.FC = () => {
  const { t } = useTranslation(['layout']);
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(paginationItems);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);

  // Summary data
  const totalProducts = products.length;
  const uniqueCategories = [...new Set(products.map((p) => p.category))].length;
  const newProducts = products.filter((p) =>
    new Date(p.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  ).length;

  // Chart data
  const categoryChart = {
    series: Object.keys(categoriesData).map(
      (cat) => products.filter((p) => p.category === cat).length
    ),
    options: {
      chart: { type: 'pie', height: 250 },
      labels: Object.keys(categoriesData),
      colors: ['#1E3A8A', '#10B981', '#FBBF24', '#EF4444', '#8B5CF6', '#EC4899'],
      title: { text: t('productsByCategory'), style: { fontSize: '14px' } },
    },
  };

  useEffect(() => {
    let result = products;
    if (search) {
      result = result.filter((p) =>
        p.productName.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== 'All') {
      result = result.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
    setFilteredProducts(result);
    setCurrentPage(0);
  }, [search, category, products]);

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.success(t('productDeleted'));
  };

  const handleEdit = (product: Product) => {
    navigate(`/admin/products/edit/${product.id}`, { state: { product } });
  };

  const handleAdd = () => {
    navigate('/admin/products/add');
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('manageProducts')}</h2>

      <div className="flex gap-4 justify-between"> 
      {/* Summary Cards */}
      <div className="grid grid-cols-1 w-4/12 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="text-sm text-gray-600">{t('totalProducts')}</h4>
          <p className="text-2xl font-bold text-primary">{totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="text-sm text-gray-600">{t('categories')}</h4>
          <p className="text-2xl font-bold text-primary">{uniqueCategories}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border">
          <h4 className="text-sm text-gray-600">{t('newProducts')}</h4>
          <p className="text-2xl font-bold text-primary">{newProducts}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white flex-grow p-4 rounded-lg border mb-6">
        <ApexCharts
          options={categoryChart.options}
          series={categoryChart.series}
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
            placeholder={t('searchProducts')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-4/12 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="All">{t('allCategories')}</option>
            {Object.keys(categoriesData).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={handleAdd}
            className="flex items-center px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-800"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            {t('addProduct')}
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg border overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Image</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Name</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Price</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Category</th>
              <th className="py-3 px-4 text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img
                    src={product.img}
                    alt={product.productName}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
                  />
                </td>
                <td className="py-3 px-4">{product.productName}</td>
                <td className="py-3 px-4">${product.price}</td>
                <td className="py-3 px-4 capitalize">{product.category}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-800"
                    aria-label={t('editProduct')}
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label={t('deleteProduct')}
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
      {filteredProducts.length > itemsPerPage && (
        <div className="mt-6">
          <PaginationComponent
            pageCount={Math.ceil(filteredProducts.length / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={(data) => setCurrentPage(data.selected)}
          />
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ManageProducts;