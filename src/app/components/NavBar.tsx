import { Flex, Text } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Flex
          p={4}
          bg="#13253F"
          color="white"
          justify="center"
          align="center"
          boxSize="full"
          position="sticky"
          top={0}
        >
          <Text fontSize="2xl">ScholarCompass</Text>
        </Flex>
  )
}

export default NavBar;