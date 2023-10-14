import React from "react";
interface GridViewProps{
  products:any
}
const GridView:React.FC<GridViewProps> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product:any) => (
        <div
          className="bg-white p-4 rounded-lg shadow-md transition transform hover:scale-105"
          key={product.id}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
          <p className="text-gray-700 text-sm mt-1">{product.price}</p>
          {/* Add other product details as needed */}
        </div>
      ))}
    </div>
  );
};

export default GridView;
