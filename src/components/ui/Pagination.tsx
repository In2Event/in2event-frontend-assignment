import React, { Dispatch, SetStateAction } from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

export default function Pagination({
  usersPerPage,
  totalPosts,
  currentPage,
  setCurrentPage,
  setUsersPerPage,
}: {
  usersPerPage: number;
  totalPosts: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setUsersPerPage: Dispatch<SetStateAction<number>>;
}) {
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);

  const visiblePages = 10;
  const totalPages = Math.ceil(totalPosts / usersPerPage);

  const generatePageNumbers = () => {
    const currentPageNumber = currentPage;
    const pageNumbers = [];
    const startPage = Math.max(
      1,
      currentPageNumber - Math.floor(visiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const options = [5, 10, 20, 30, 50, 100];

  return (
    <div className="flex items-center gap-4">
      <div className="flex gap-2">
        <select
          value={usersPerPage}
          onChange={(e) => setUsersPerPage?.(parseInt(e.target.value))}
          className="border bg-black rounded focus:outline-none focus:border-light-tint "
        >
          {options.map((option, index) => (
            <option value={option} key={`option-${option}-${index}`}>
              {option}
            </option>
          ))}
        </select>
        <p className="text-sm text-white">
          Showing
          <span className="font-medium px-1">
            {currentPage * usersPerPage - usersPerPage + 1}
          </span>
          to
          <span className="font-medium pl-1">
            {totalPosts > currentPage * usersPerPage
              ? currentPage * usersPerPage
              : totalPosts}{' '}
          </span>
          of
          <span className="font-medium "> {totalPosts} </span>
        </p>
      </div>
      <p className="flex-grow" />
      <ArrowLeftIcon
        onClick={() => {
          if (currentPage == 1) return;
          paginateBack();
        }}
        className="bg-white rounded"
        color="black"
      />

      <div className={`flex  gap-4 items-center space-x-1`}>
        {generatePageNumbers().map((value) => (
          <button
            className={`p-1 rounded ${
              value === currentPage ? 'bg-white text-black' : ''
            }`}
            key={`table-pagination-page-${value}`}
            onClick={() => setCurrentPage(value)}
          >
            {value}
          </button>
        ))}
      </div>
      <ArrowRightIcon
        onClick={() => {
          if (currentPage >= totalPages) return;
          paginateFront();
        }}
        color="black"
        className="bg-white rounded"
      />
    </div>
  );
}
