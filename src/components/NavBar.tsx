import { BoxProps, Flex, Text } from '@chakra-ui/react';

const NavBar = (props: BoxProps) => {
  return (
    <Flex
      p={4}
      bg="#13253F"
      color="white"
      justify="center"
      align="center"
      width="100%"
      pos="fixed"
      top={0}
      zIndex={999}
      {...props}
    >
      <Text fontSize="2xl">Scholar Compass</Text>
    </Flex>
  );
};

export default NavBar;
