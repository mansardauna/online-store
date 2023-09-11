import React, { useState, useEffect } from 'react';
import Product from '../../components/home/Products/Product';
import { filterOption, paginationItems } from '../../constants/index';
import Sort from './Sort';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import Pagination from '../../components/ui/Pagination';
import Price from '../../components/pageProps/shopPage/shopBy/Price';
import Color from '../../components/pageProps/shopPage/shopBy/Color';

const ProductList = () => {
  const [filteredData, setFilteredData] = useState(paginationItems);
  const [sortedData, setSortedData] = useState(paginationItems);
  const [toggle, setToggle] = useState(false);
  const [selectOption, setSelectedOption] = useState('All');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(12);

  const filterResult = (catItems) => {
    setSelectedOption(catItems);
  };

  const sortResult = (filterItems) => {
    setSelectedOption('All');
    setToggle(!toggle);
  };

  useEffect(() => {
    const result = paginationItems.filter((curData) => {
      return selectOption === 'All' || curData.catergory === selectOption;
    });
    setFilteredData(result);

    const sorted = toggle
      ? [...result].sort((a, b) => a.filter.localeCompare(b.filter))
      : result;
    setSortedData(sorted);
  }, [selectOption, toggle]);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-3">
      <Breadcrumbs title="Products" />
      <div className="block md:flex p-2 md:p-5 w-full justify-between">
        <div className="mt-5 md:w-1/3 justify-between flex w-full ">
          <div className="justify-between flex w-full px-4 md:p-1 md:block">
            <Sort
              filterOption={filterOption}
              selectOption={selectOption}
              filterResult={filterResult}
              sortResult={sortResult}
            />
            <Color />

          </div>
        </div>
        <div className="md:flex block w-full">
          <div>
            {toggle || selectOption === 'All' ? (
              <div className="md:grid block grid-cols-3 gap-4 w-fit m-auto">
                {currentItems.map((product) => (
                  <div className="p-2" key={product._id}>
                    <Product
                      _id={product._id}
                      img={product.img}
                      productName={product.productName}
                      price={product.price}
                      category={product.catergory}
                      color={product.color}
                      des={product.des}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="md:grid block grid-cols-3 gap-4 w-fit m-auto">
                {filteredData.map((product) => (
                  <div className="p-2" key={product._id}>
                    <Product
                      _id={product._id}
                      img={product.img}
                      productName={product.productName}
                      price={product.price}
                      category={product.catergory}
                      color={product.color}
                      des={product.des}
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
