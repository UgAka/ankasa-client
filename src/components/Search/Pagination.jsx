import React from 'react';

function Pagination({ pagination, applyFilter }) {
  const tmp = [];
  for (let i = 0; i < pagination.totalPage; i += 1) {
    tmp.push(i);
  }

  return (
    <nav className="mt-4">
      <ul className="pagination">
        <li
          className={`page-item ${pagination.currentPage <= 1 && 'disabled'}`}
        >
          <button
            className="page-link"
            type="button"
            onClick={() => applyFilter(pagination.currentPage - 1)}
          >
            Previous
          </button>
        </li>
        {tmp.map((item, index) => (
          <li
            className={`page-item ${
              index + 1 === pagination.currentPage && 'active'
            }`}
            key={Math.random(100)}
          >
            <button
              onClick={() => applyFilter(index + 1)}
              type="button"
              className="page-link"
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${
            pagination.currentPage === pagination.totalPage && 'disabled'
          }`}
        >
          <button
            className="page-link"
            type="button"
            onClick={() => applyFilter(pagination.currentPage + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
