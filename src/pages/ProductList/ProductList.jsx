import React, { useState, useEffect } from 'react';
import Product from '../../components/home/Products/Product';
import Sort from './Sort';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import Pagination from '../../components/ui/Pagination';

import { categoriesData, filterOption } from '../../constants';

const ProductList = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [selectOption, setSelectedOption] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(12);

  // Mock API endpoint
  const mockApiUrl = "https://fakestoreapi.com/products"; // Replace with your mock API URL

  useEffect(() => {
    fetch(mockApiUrl)
      .then((response) => response.json())
      .then((data) => {
        setFilteredData(data);
        setSortedData(data);
      })
      .catch((error) => {
        console.error('Error fetching data from the API:', error);
      });
  }, []);

  const filterResult = (catItems) => {
    setSelectedOption(catItems);
  };

  const sortResult = (filterItems) => {
    setSelectedOption('All');
    setToggle(!toggle);
  };

  useEffect(() => {
    const result = filteredData.filter((curData) => {
      return selectOption === 'All' || curData.category === selectOption;
    });
    setSortedData(toggle ? [...result].sort((a, b) => a.filter.localeCompare(b.filter)) : result);
  }, [selectOption, toggle, filteredData]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='md:p-3 relative p-2 mb-4'>
      <Breadcrumbs title='Products' />
      <div className='flex absolute z-10 top-0 px-4 md:p-1 gap-4 right-3'>
        <Sort
          filterOption={filterOption}
          selectOption={selectOption}
          filterResult={filterResult}
          sortResult={sortResult}
          categoriesData={categoriesData}
        />
      </div>
      <div className='p-1 relative md:p-5 w-full justify-between'>
        <div className='justify-between w-full'></div>
        <div className='md:flex mt-10 block w-full'>
          <div>
            {toggle || selectOption === 'All' ? (
              <div className='md:grid block grid-cols-4 gap-4 w-fit m-auto'>
                {currentItems.map((product) => (
                  <div className='p-2' key={product._id}>
                    <Product
                      _id={product._id}
                      img={product.image}
                      productName={product.title}
                      price={product.price}
                      category={product.category}
                      color={product.color}
                      des={product.description}
                      videoUrl={product.videoUrl}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className='md:grid block grid-cols-4 gap-4 w-fit m-auto'>
                {filteredData.map((product) => (
                  <div className='p-2' key={product._id}>
                    <Product
                      _id={product._id}
                      img={product.image}
                      productName={product.title}
                      price={product.price}
                      category={product.category}
                      color={product.color}
                      des={product.description}
                    />
                  </div>
                ))}
              </div>
            )}
            <Pagination
              pageCount={Math.ceil(filteredData.length / itemsPerPage)}
              currentPage={currentPage}
              onPageChange={handlePageClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
