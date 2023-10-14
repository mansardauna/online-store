import Product from '../../components/home/Products/Product';
import { categoriesData, filterOption, paginationItems } from '../../constants/index';
import Sort from './Sort';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import { useEffect, useState } from 'react';
import PaginationComponent from '../../components/ui/PaginationComponent';
import { useTranslation } from 'react-i18next';

const ProductList:React.FC = () => {
  const { t } = useTranslation(["layout"])

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
    <div className='md:p-3 relative p-2 h-fit capitalize'>
      <div className='flex'>
      <Breadcrumbs title={t("product")} />
        <Sort
          filterOption={filterOption}
          selectOption={selectOption}
          filterResult={filterResult}
          sortResult={sortResult}
          categoriesData={categoriesData}
        />
        </div>
      <div className='p-1 relative md:p-5 w-full justify-between'>
        <div className='md:flex  block w-full'>
          <div>
            {selectOption === 'All' ? (
              <div className='md:grid block md:h-[45%] md:overflow-y-scroll xl:grid-cols-4 md:grid-cols-2 gap-4 w-fit m-auto'>
                {currentItems.map((product) => (
                  <div className='p-2' key={product._id}>
                    <Product
                      _id={product.id}
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
              <div className='md:grid block h-96 overflow-y-scroll xl:grid-cols-4 md:grid-cols-2 gap-4 w-fit m-auto'>
                {filteredData.map((product) => (
                  <div className='p-2' key={product._id}>
                    <Product
                      _id={product.id}
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