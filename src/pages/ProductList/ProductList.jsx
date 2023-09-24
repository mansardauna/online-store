import React, { useState, useEffect, Suspense, startTransition } from 'react';
import Product from '../../components/home/Products/Product';
import Sort from './Sort';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';

import { categoriesData, filterOption } from '../../constants';
import ProductBanner from '../../components/pageProps/shopPage/ProductBanner';
import ListWrapper from '../Shop/ListWrapper';
import Pagination from '../../components/pageProps/shopPage/Pagination';

// Create a loading component to display while data is loading
function Loading() {
  return <div>Loading...</div>;
}

const ProductList = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [selectOption, setSelectedOption] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState("grid");
  
  // Mock API endpoint
  const mockApiUrl = "https://fakestoreapi.com/products"; // Replace with your mock API URL

  useEffect(() => {
    const fetchData = async () => {
      await startTransition(() => {
        fetch(mockApiUrl)
          .then((response) => response.json())
          .then((data) => {
            setFilteredData(data);
            setSortedData(data);
          })
          .catch((error) => {
            console.error('Error fetching data from the API:', error);
          });
      });
    };

    fetchData();
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

  
  return (
    <div className='md:p-3 relative p-2 mb-4'>
      <Breadcrumbs title='Products' />
      <div className='flex md:w-10/12 w-6/12 z-10 md:p-1 gap-4'>
      <ProductBanner
            itemsPerPage={itemsPerPage}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
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
            
          
          <Suspense fallback={<Loading />}>
              {toggle || selectOption === 'All' ? (
                <div>
                    <div className='p-2'>
                      {viewMode === "grid" ? (
                        <div className=''>
             <Pagination itemsPerPage={itemsPerPage}/>
                        </div>
                      ) : (
                        <ListWrapper itemsPerPage={itemsPerPage}/>
                      )}
                    </div>
                  
                </div>
              ) : (
                <div className='p-2'>
                {filteredData.length > 0 ? (
                  <div className='p-2'>
                    {viewMode === "grid" ? (
                      <div className="">
                        <Pagination itemsPerPage={itemsPerPage}/>
                      </div>
                    ) : (
                      <ListWrapper itemsPerPage={itemsPerPage} />
                    )}
                  </div>
                ) : (
                  <div>No data available.</div>
                )}
              </div>
            )}

            </Suspense>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
