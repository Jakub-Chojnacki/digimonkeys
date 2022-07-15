import { FaGithub } from 'react-icons/fa';
import { Heading, Flex, Icon, Link } from '@chakra-ui/react';

import AddVideoModal from '../Modals/AddVideoModal';

const MainNav = () => {

  return (

    <Flex
      as="header"
      color="white"
      bgColor="red.400"
      p={2}
      justify="space-between"
      align="center"
    >
      <Link href="/">
        <Heading fontSize={24}>Video-Player</Heading>
      </Link>

      <Flex align="center" justify="center" gap={['2', '4', '6', '8']}>
        {/* <AddVideoModal /> */}
        
        <Link
          target="_blank"
          href="https://github.com/Jakub-Chojnacki/digimonkeys"
        >
          <Icon as={FaGithub} fontSize={32} />
        </Link>
      </Flex>
    </Flex>

  );
};

export default MainNav;
