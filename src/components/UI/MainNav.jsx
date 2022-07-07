import { FaGithub } from "react-icons/fa";
import { Heading, Flex, Icon } from "@chakra-ui/react";
const MainNav = () => {
  return (
    <Flex
      as="header"
      color="white"
      bgColor="#D02B20"
      p={4}
      justify="space-between"
      align="center"
    >
      <a href="/">
        <Heading fontSize={24}>Video-Player</Heading>
      </a>
      <a target="_blank" href="https://github.com/Jakub-Chojnacki/digimonkeys">
        <Icon as={FaGithub} fontSize={32} />
      </a>
    </Flex>
  );
};

export default MainNav;
