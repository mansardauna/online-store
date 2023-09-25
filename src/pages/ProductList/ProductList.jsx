import Product from '../../components/home/Products/Product';
import { categoriesData, filterOption, paginationItems } from '../../constants/index';
import Sort from './Sort';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import { useEffect, useState } from 'react';
import PaginationComponent from '../../components/ui/PaginationComponent';

const ProductList = () => {
  const [filteredData, setFilteredData] = useState(paginationItems);
  const [sortedData, setSortedData] = useState(paginationItems);
  const [toggle, setToggle] = useState(false);
  const [selectOption, setSelectedOption] 
  = useState('All');
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
    <div className='md:p-3 relative p-2 mb-4'>
      <Breadcrumbs title='Products' />
      <div className=' z-10 top-0 px-4 md:p-1 gap-4'>
        <Sort
          filterOption={filterOption}
          selectOption={selectOption}
          filterResult={filterResult}
          sortResult={sortResult}
          categoriesData={categoriesData}
        />
      </div>
      <div className='p-1 relative md:p-5 w-full justify-between'>
        <div className='justify-between  w-full'></div>
        <div className='md:flex mt-10 block w-full'>
          <div>
            {selectOption === 'All' ? (
              <div className='md:grid block grid-cols-4 gap-4 w-fit m-auto'>
                {currentItems.map((product) => (
                  <div className='p-2' key={product._id}>
                    <Product
                      _id={product._id}
                      img={product.img}
                      productName={product.productName}
                      price={product.price}
                      category={product.catergory}
                      color={product.color}
                      des={product.des}
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
                      img={product.img}
                      productName={product.productName}
                      price={product.price}
                      category={product.catergory}
                      color={product.color}
                      des={product.des}
                      videoUrl={product.videoUrl}
                    />
                  </div>
                ))}
              </div>
            )}
            <PaginationComponent
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