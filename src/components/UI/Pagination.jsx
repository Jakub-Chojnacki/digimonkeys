import React from 'react';
import {Pagination,PaginationItem,PaginationLink} from 'reactstrap'
import styles from './Pagination.module.css'
const VideoPagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.pagination__container}>
      <Pagination >
        {pageNumbers.map(number => (
          <PaginationItem key={number}>
            <PaginationLink  onClick={() => paginate(number)} href='#'>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    </nav>
  );
};

export default VideoPagination;