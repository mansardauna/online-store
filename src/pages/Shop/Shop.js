import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import Pagination from "../../components/pageProps/shopPage/Pagination";
import ProductBanner from "../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../components/pageProps/shopPage/ShopSideNav";
import ListWrapper from "./ListWrapper";
import { categoriesData, filterOption, paginationItems } from "../../constants";
import Sort from "../ProductList/Sort";

const Shop:React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [viewMode, setViewMode] = useState("grid");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [selectCategory, setSelectCategory] = useState('All');
 
  const filterProductsByCategory = (category) => {
    setSelectCategory(category);
  };

  useEffect(() => {
    let filteredData = paginationItems;
    
    // Filter by category if a category is selected
    if (selectCategory !== 'All') {
      filteredData = filteredData.filter((product) => product.category === selectCategory);
    }

    // Sort the filtered data based on some criteria (toggle state)
    const sortedData = toggle
      ? [...filteredData].sort((a, b) => a.filter.localeCompare(b.filter))
      : filteredData;

    setFilteredProducts(sortedData);
  }, [selectCategory, toggle]);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Products" />
      <div className="w-full h-full flex pb-20 gap-10">
        <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
          <Sort
            filterOption={filterOption}
            selectOption={selectCategory}
            filterResult={filterProductsByCategory}
            sortResult={() => setToggle(!toggle)}
            categoriesData={categoriesData}
          />
        </div>
        <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
          <ProductBanner
            itemsPerPage={itemsPerPage}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
          {viewMode === "grid" ? (
            <Pagination itemsPerPage={itemsPerPage} 
            toggle={toggle}
            selectOption={selectCategory} />
          ) : (
            <ListWrapper itemsPerPage={itemsPerPage} products={filteredProducts} />
          )}
        </div>):(
      </div>
    </div>
  );
};

export default Shop;
