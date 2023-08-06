import React, { useState } from 'react';
import Product from '../../components/home/Products/Product';
import { paginationItems } from '../../constants';


const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All'); // Initial category
  const [filteredProducts, setFilteredProducts] = useState(paginationItems);

  const handleCategoryChange = (category) => {
    if (category === 'All') {
      setFilteredProducts(paginationItems);
    } else {
      const filtered = paginationItems.filter(product => product.catergory === category);
      setFilteredProducts(filtered);
    }
    setSelectedCategory(category);
  };

  return (
    <div className='p-3'>
      <h2 className=' text-3xl ml-3 mb-2 w-fit uppercase '>categories</h2>
      <div className="md:flex block">
        <div className='grid w-60 grid-cols-3 md:grid-cols-1 h-fit md:w-1/4 mt-1'>
          <button onClick={() => handleCategoryChange('All')} className="p-2  border">All</button>
          <button onClick={() => handleCategoryChange('fashion')} className="p-2 border">Fashion</button>
          <button onClick={() => handleCategoryChange('phone')} className="p-2 border">Phone</button>
          <button onClick={() => handleCategoryChange('book')} className="p-2 border">Book</button>
          <button onClick={() => handleCategoryChange('music')} className="p-2 border">Music</button>
          <button onClick={() => handleCategoryChange('car')} className="p-2 border">Car</button>

          <button onClick={() => handleCategoryChange('Electronic')} className="p-2 border">Electronics</button>
          {/* Add more buttons for other categories */}
        </div>
        <div className="md:grid block grid-cols-3 gap-4 w-full">
          {filteredProducts.map(product => (
            <div key={product.id} className="shadow-xl p-2">
              <Product
                _id={product._id}
                img={product.img}
                productName={product.productName}
                price={product.price}
                category={product.catergory}
                color={product.color}
                badge={product.badge}
                des={product.des}
              />
            </div>
          ))}
        </div></div>
    </div>
  );
};

export default ProductList;
