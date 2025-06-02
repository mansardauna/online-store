import React, { useEffect, useState } from "react";
import Product from "../../components/home/Products/Product";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useTranslation } from "react-i18next";
import PaginationComponent from "../../components/ui/PaginationComponent";
import {
  categoriesData,
  filterOption,
  paginationItems,
  Product as ProductType,
} from "../../constants/constant";
import Sort from "./Sort";
import { BsCardList, BsFilter } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import Masonry from "react-masonry-css";

const ProductList: React.FC = () => {
  const { t } = useTranslation(["layout"]);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  // Filter states
  const [category, setCategory] = useState<string>("All");
  const [nameFilter, setNameFilter] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [store, setStore] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("default");
  const [filteredData, setFilteredData] = useState<ProductType[]>(paginationItems);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemsPerPage] = useState<number>(12);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  // Extract unique filter options
  const types = Array.from(
    new Set(paginationItems.map((item) => item.filter).filter(Boolean))
  );
  const stores = Array.from(
    new Set(paginationItems.map((item) => item.store).filter(Boolean))
  );
  const locations = Array.from(
    new Set(paginationItems.map((item) => item.location).filter(Boolean))
  );

  // Apply filters and sorting
  useEffect(() => {
    let result = paginationItems;

    if (category !== "All") {
      result = result.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }
    if (nameFilter) {
      result = result.filter((item) =>
        item.productName.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }
    if (typeFilter) {
      result = result.filter((item) => item.filter?.toLowerCase() === typeFilter.toLowerCase());
    }
    if (store) {
      result = result.filter((item) => item.store === store);
    }
    if (location) {
      result = result.filter((item) => item.location === location);
    }

    switch (sortOption) {
      case "name-asc":
        result = [...result].sort((a, b) => a.productName.localeCompare(b.productName));
        break;
      case "name-desc":
        result = [...result].sort((a, b) => b.productName.localeCompare(a.productName));
        break;
      case "price-asc":
        result = [...result].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        result = [...result].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "newest":
        result = [...result].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "oldest":
        result = [...result].sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      default:
        break;
    }

    setFilteredData(result);
    setCurrentPage(0);
  }, [category, nameFilter, typeFilter, store, location, sortOption]);

  // Handle pagination
  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  // Clear filters
  const clearFilters = () => {
    setCategory("All");
    setNameFilter("");
    setTypeFilter("");
    setStore("");
    setLocation("");
    setSortOption("default");
    setDropdownOpen(null);
  };

  // Toggle dropdown
  const toggleDropdown = (filter: string) => {
    setDropdownOpen(dropdownOpen === filter ? null : filter);
  };

  // Current items
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full p-4 mx-auto min-h-screen">
      {/* Breadcrumbs */}
      <Breadcrumbs title={t("product")} />

      <div className="mx-auto px-4">
        {/* Filter Toggle and Sort */}
        <div className="fle p-4 items-center mb-4">
          
          <Sort
            filterOption={[
              { title: "Default", icon: <BsCardList /> },
              { title: "Name (A-Z)", icon: <BsCardList /> },
              { title: "Name (Z-A)", icon: <BsCardList /> },
              { title: "Price (Low to High)", icon: <BsCardList /> },
              { title: "Price (High to Low)", icon: <BsCardList /> },
              { title: "Newest", icon: <BsCardList /> },
              { title: "Oldest", icon: <BsCardList /> },
            ]}
            selectOption={sortOption}
            filterResult={setSortOption}
            sortResult={() => setSortOption(sortOption)}
            categoriesData={Object.values(categoriesData).map((cat) => cat.title)}
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-4">
         

         {/* Product Display */}
 <div className="max-w-[1280px] mx-auto px-4">
 {filteredData.length === 0 ? (
   <div className="text-center py-10">
     <p className="text-lg text-gray-600">{t("No products found")}</p>
   </div>
 ) : (
   <Masonry
     breakpointCols={breakpointColumnsObj}
     className="my-masonry-grid"
     columnClassName="my-masonry-grid_column"
   >
     {currentItems.map((product) => (
       <div key={product.id} className="mb-4">
         <Product
           _id={product.id}
           img={product.img}
           productName={product.productName}
           price={product.price}
           category={product.category}
           color={product.color || "N/A"}
           des={product.des}
           
         />
       </div>
     ))}
   </Masonry>
 )}
</div>
 {/* Filter Sidebar */}
 <div
            className={`lg:w-1/4 p-2 h-fit rounded-lg shadow-sm transition-all duration-300 ${
              isFilterOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{t("Filters")}</h3>
              <button
                onClick={clearFilters}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
              >
                {t("Clear")}
              </button>
            </div>

            {/* Search by Name */}
            <div className="mb-4">
              <input
                type="text"
                placeholder={t("Search products...")}
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Dropdown */}
            <div className="mb-4 relative">
              <button
                onClick={() => toggleDropdown("category")}
                className="w-full text-sm p-2 bg-gray-100 text-left rounded-md flex justify-between items-center"
              >
                <span>{category === "All" ? t("All Categories") : t(category)}</span>
                <FaTimes
                  className={`${category !== "All" ? "block" : "hidden"} cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCategory("All");
                  }}
                />
              </button>
              {dropdownOpen === "category" && (
                <div className="absolute z-10 text-sm mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {[{ title: "All" }, ...filterOption].map((opt) => (
                    <div
                      key={opt.title}
                      onClick={() => {
                        setCategory(opt.title);
                        setDropdownOpen(null);
                      }}
                      className="p-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {t(opt.title)}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Type Dropdown */}
            <div className="mb-4 relative">
              <button
                onClick={() => toggleDropdown("type")}
                className="w-full p-2 bg-gray-100 text-left rounded-md flex justify-between items-center"
              >
                <span>{typeFilter || t("All Types")}</span>
                <FaTimes
                  className={`${typeFilter ? "block" : "hidden"} cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setTypeFilter("");
                  }}
                />
              </button>
              {dropdownOpen === "type" && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {["", ...types].map((t) => (
                    <div
                      key={t || "all"}
                      onClick={() => {
                        setTypeFilter(t);
                        setDropdownOpen(null);
                      }}
                      className="p-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {t ? t : t("All Types")}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Store Dropdown */}
            <div className="mb-4 relative">
              <button
                onClick={() => toggleDropdown("store")}
                className="w-full p-2 bg-gray-100 text-left rounded-md flex justify-between items-center"
              >
                <span>{store || t("All Stores")}</span>
                <FaTimes
                  className={`${store ? "block" : "hidden"} cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setStore("");
                  }}
                />
              </button>
              {dropdownOpen === "store" && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {["", ...stores].map((s) => (
                    <div
                      key={s || "all"}
                      onClick={() => {
                        setStore(s);
                        setDropdownOpen(null);
                      }}
                      className="p-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {s ? s : t("All Stores")}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location Dropdown */}
            <div className="mb-4 relative">
              <button
                onClick={() => toggleDropdown("location")}
                className="w-full p-2 bg-gray-100 text-left rounded-md flex justify-between items-center"
              >
                <span>{location || t("All Locations")}</span>
                <FaTimes
                  className={`${location ? "block" : "hidden"} cursor-pointer`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocation("");
                  }}
                />
              </button>
              {dropdownOpen === "location" && (
                <div className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {["", ...locations].map((loc) => (
                    <div
                      key={loc || "all"}
                      onClick={() => {
                        setLocation(loc);
                        setDropdownOpen(null);
                      }}
                      className="p-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {loc ? loc : t("All Locations")}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pagination */}
        {filteredData.length > itemsPerPage && (
          <div className="mt-8">
            <PaginationComponent
              pageCount={Math.ceil(filteredData.length / itemsPerPage)}
              currentPage={currentPage}
              onPageChange={handlePageClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;