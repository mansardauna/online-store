import React from 'react';
import ReactPaginate from 'react-paginate';

interface PaginationComponentProps{
  pageCount:string;
  currentPage:string;
  onPageChange:string;
}
const PaginationComponent:React.FC<PaginationComponentProps> = ({ pageCount, currentPage, onPageChange }) => {
  return (
    <div className="mt-4">
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={onPageChange}
        previousLabel="Previous"
        nextLabel="Next"
        breakLabel="..."
        containerClassName="flex mt-4"
        pageClassName="mx-2"
        pageLinkClassName="border border-gray-800  px-2 py-1"
        activeClassName="font-semibold bg-gray-200"
      />
    </div>
  );
};

export default PaginationComponent;
