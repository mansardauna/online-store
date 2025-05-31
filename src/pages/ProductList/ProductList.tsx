// ProductList.tsx
import React, { useEffect, useState } from "react";
import Product from "../../components/home/Products/Product";
import { BsBagFill, BsCardList, BsMusicNoteBeamed, BsPhone, BsGrid, BsListUl } from "react-icons/bs";
import {
  categoriesData,
  filterOption,
  paginationItems,
  Product as ProductType,
  FilterOption as FilterOptionType,
} from "../../constants/constant";
import Sort from "./Sort";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useTranslation } from "react-i18next";
import PaginationComponent from "../../components/ui/PaginationComponent";

const ProductList: React.FC = () => {
  const { t } = useTranslation(["layout"]);

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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid"); // New state for view mode

  // Extract unique filter options
  const types = Array.from(
    new Set(
      Object.values(categoriesData)
        .flatMap((cat) => cat.items)
        .concat(paginationItems.map((item) => item.filter))
    )
  );
  const stores = Array.from(new Set(paginationItems.map((item) => item.store)));
  const locations = Array.from(new Set(paginationItems.map((item) => item.location)));

  // Apply filters and sorting
  useEffect(() => {
    let result = paginationItems;

    // Filter by category
    if (category !== "All") {
      result = result.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }

    // Filter by name
    if (nameFilter) {
      result = result.filter((item) =>
        item.productName.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // Filter by type (filter field or category items)
    if (typeFilter) {
      result = result.filter((item) => item.filter.toLowerCase() === typeFilter.toLowerCase());
    }

    // Filter by store
    if (store) {
      result = result.filter((item) => item.store === store);
    }

    // Filter by location
    if (location) {
      result = result.filter((item) => item.location === location);
    }

    // Apply sorting
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
        result = [...result].sort((a, b) => parseFloat(b.price) - parseFloat(b.price));
        break;
      case "newest":
        result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        result = [...result].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
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
  };

  // Current items
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="w-full p-4 mx-auto bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <Breadcrumbs title={t("product")} />

      {/* Filters Section */}
      <div className="max-w-container mx-auto px-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search by Name */}
            <div className="w-full md:w-1/4">
              <input
                type="text"
                placeholder={t("Search products...")}
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full md:w-1/5">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">{t("All Categories")}</option>
                {filterOption.map((opt) => (
                  <option key={opt.title} value={opt.title}>
                    {t(opt.title)}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="w-full md:w-1/5">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t("All Types")}</option>
                {types.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Store Filter */}
            <div className="w-full md:w-1/5">
              <select
                value={store}
                onChange={(e) => setStore(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t("All Stores")}</option>
                {stores.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="w-full md:w-1/5">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">{t("All Locations")}</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort, View Toggle, and Clear Filters */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-4">
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
              {/* View Toggle Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-md ${viewMode === "grid" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"} hover:bg-blue-600 hover:text-white`}
                  aria-label={t("Grid View")}
                >
                  <BsGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-md ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"} hover:bg-blue-600 hover:text-white`}
                  aria-label={t("List View")}
                >
                  <BsListUl size={20} />
                </button>
              </div>
            </div>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              {t("Clear Filters")}
            </button>
          </div>
        </div>
      </div>

      {/* Product Display */}
      <div className="max-w-container mx-auto px-4">
        {filteredData.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">{t("No products found")}</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Product
                  _id={product.id}
                  img={product.img}
                  productName={product.productName}
                  price={product.price}
                  category={product.category}
                  color={product.color || "N/A"}
                  des={product.des}
                  videoUrl={product.videoUrl || ""}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                  <th className="py-3 px-4 text-left">{t("Image")}</th>
                  <th className="py-3 px-4 text-left">{t("Name")}</th>
                  <th className="py-3 px-4 text-left">{t("Price")}</th>
                  <th className="py-3 px-4 text-left">{t("Category")}</th>
                  <th className="py-3 px-4 text-left">{t("Type")}</th>
                  <th className="py-3 px-4 text-left">{t("Store")}</th>
                  <th className="py-3 px-4 text-left">{t("Location")}</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <img
                        src={product.img}
                        alt={product.productName}
                        className="w-12 h-12 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = "/images/placeholder.jpg"; // Fallback image
                        }}
                      />
                    </td>
                    <td className="py-3 px-4 text-gray-800">{product.productName}</td>
                    <td className="py-3 px-4 text-gray-800">${product.price}</td>
                    <td className="py-3 px-4 text-gray-600 capitalize">{product.category}</td>
                    <td className="py-3 px-4 text-gray-600 capitalize">{product.filter}</td>
                    <td className="py-3 px-4 text-gray-600">{product.store || "N/A"}</td>
                    <td className="py-3 px-4 text-gray-600">{product.location || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredData.length > itemsPerPage && (
        <div className="max-w-container mx-auto px-4 mt-8">
          <PaginationComponent
            pageCount={Math.ceil(filteredData.length / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageClick}
          />
        </div>
      )}
    </div>
  );
};

export default ProductList;