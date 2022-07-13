import React,{useContext} from 'react';
import { Flex, Box, Icon, Text, Select } from '@chakra-ui/react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import VideoContext from "../../../context/video-context";
import { usePagination, DOTS } from '../../../hooks/usePagination';

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const {
    setVideosPerPage,
  } = useContext(VideoContext);

  const handleChangeVidsPerPage = (e) => {
    setVideosPerPage(e.target.value);
  };

  const onChangePageToPrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }

    // if (currentPage === 1) {
    //   onPageChange(paginationRange.length);
    // }
  };

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onChangePageToNext = () => {
    console.log(paginationRange.length)
    if (currentPage < totalCount) {
      onPageChange(currentPage + 1);
    }

    // if (currentPage === paginationRange.length) {
    //   onPageChange(1);
    // }
  };

  return (
    <Flex align="center" justify="center">
      <Flex align="center" gap={2} justify-self="center">
      <Icon
        as={BsChevronLeft}
        onClick={onChangePageToPrevious}
        cursor="pointer"
      />
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return <Box key={`dots${Math.floor(Math.random() * 100)}`}>&#8230;</Box>;
        }

        return (
          <Text
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            backgroundColor={currentPage === pageNumber ? 'blue.400' : 'none'}
            color={currentPage === pageNumber ? 'white' : 'blue.400'}
            borderColor={'blue.400'}
            border="1px"
            cursor="pointer"
            paddingX={2}
          >
            {pageNumber}
          </Text>
        );
      })}

      <Icon as={BsChevronRight} onClick={onChangePageToNext} cursor="pointer" />
      </Flex>
      <Flex gap={4} align="center">
        <Select size="md" onChange={handleChangeVidsPerPage}>
          <option value="12">12 per page</option>
          <option value="8">8 per page</option>
          <option value="4">4 per page</option>
        </Select>
      </Flex>
      
    </Flex>
  );
};

export default Pagination;
