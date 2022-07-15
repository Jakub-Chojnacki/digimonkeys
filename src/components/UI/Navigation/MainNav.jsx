import { FaGithub } from 'react-icons/fa';
import { Heading, Flex, Icon, Link,  } from '@chakra-ui/react';

const MainNav = () => {
  return (
    <Flex
      as="header"
      color="white"
      bgColor="red.400"
      p={2}
      justify="center"
      align="center"
    >
      <Flex
        maxW="1100px"
        justify="space-between"
        align="center"
        width="100%"
        paddingX={10}
      >
        <Link href="/">
          <Heading fontSize={24}>Video-Player</Heading>
        </Link>

        <Flex align="center" justify="center" gap={['2', '4', '6', '8']}>
          <Link
            target="_blank"
            href="https://github.com/Jakub-Chojnacki/digimonkeys"
          >
            <Icon as={FaGithub} fontSize={32} />
          </Link>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MainNav;
