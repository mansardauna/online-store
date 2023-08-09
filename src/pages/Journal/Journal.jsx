import React, { useState } from 'react';
import Product from '../../components/home/Products/Product';
import NavTitle from '../../components/pageProps/shopPage/shopBy/NavTitle';
import { paginationItems } from '../../constants';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';

const ProductList = () => {
  const [data, setData] = useState(paginationItems)
  const filterResult = (catItems) => {
    const result = paginationItems.filter((curData) => {
      return curData.catergory === catItems;
    });
    setData(result)
  }

  return (
    <div className='p-3'>
      {/* <Breadcrumbs /> */}
      <div className=''>
        <NavTitle title="Shop by Category" icons={false} />

      </div>
      <div className="md:flex block">
        <div className='grid w-60 grid-cols-3 md:grid-cols-1 h-fit md:w-1/4  cursor-pointer text-gray-500' >
          <div onClick={() => setData(paginationItems)} className="p-3 text-lg  border-b">All</div>
          <div onClick={() => filterResult('fashion')} className="p-3 text-lg border-b">Fashion</div>
          <div onClick={() => filterResult('phone')} className="p-3 text-lg border-b">Phone</div>
          <div onClick={() => filterResult('book')} className="p-3 text-lg border-b">Book</div>
          <div onClick={() => filterResult('music')} className="p-3 text-lg border-b">Music</div>
          <div onClick={() => filterResult('car')} className="p-3 text-lg border-b">Car</div>

          <div onClick={() => filterResult('Electronic')} className="p-3 text-lg border-b">Electronics</div>
          {/* Add more buttons for other categories */}
        </div>
        <div className="md:grid block grid-cols-3 gap-4 w-full">
          {data.map(product => (
            <div className="shadow-xl p-2">
              <Product
                _id={product._id}
                img={product.img}
                productName={product.productName}
                price={product.price}
                category={product.catergory}
                color={product.color}
                // badge={product.badge}
                des={product.des}
              />
            </div>
          ))}
        </div></div>
    </div >
  );
};

export default ProductList;
