import React from 'react';
import {Flex,Link} from '@chakra-ui/react'
const VideoPagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Flex as='nav' align='center' justify='center' marginTop={4}>
      <Flex gap={1}>
        {pageNumbers.map(number => (
            <Link key={number} p={2} bgColor='blue.400' color='white' borderRadius='8px' onClick={() => paginate(number)}>
              {number}
            </Link>
        ))}
      </Flex>
    </Flex>
  );
};

export default VideoPagination;