import React from "react";
import { usePagination, DOTS } from "../../../hooks/usePagination";
import { Button, Flex, Box } from "@chakra-ui/react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage < paginationRange.length) {
      onPageChange(currentPage + 1);
    }
    if (currentPage === paginationRange.length) {
      onPageChange(1);
    }
  };

  const onPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
    if (currentPage === 1) {
      onPageChange(paginationRange.length);
    }
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <Flex align="center" justify="center" gap={2}>
      <BsChevronLeft onClick={onPrevious} />
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <Box key={pageNumber}>&#8230;</Box>;
        }

        return (
          <Button  key={pageNumber} colorScheme="blue" onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </Button>
        );
      })}

      <BsChevronRight onClick={onNext} />
    </Flex>
  );
};

export default Pagination;
