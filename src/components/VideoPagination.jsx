import React from 'react';
import {Pagination,PaginationItem,PaginationLink} from 'reactstrap'
const VideoPagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <Pagination >
        {pageNumbers.map(number => (
          <PaginationItem key={number}>
            <PaginationLink onClick={() => paginate(number)} href='#'>
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
      </Pagination>
    </nav>
  );
};

export default VideoPagination;