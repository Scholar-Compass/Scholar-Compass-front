import {
  BoxProps,
  IconButton,
  Flex,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { FaRegMoon, FaSun } from 'react-icons/fa';

const NavBar = (props: BoxProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
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
      <Text
        textAlign="center"
        fontWeight="bold"
        fontSize={['xl', '2xl', '2xl']}
      >
        Scholar Compass
      </Text>
      <Flex pos="absolute" right={2}>
        <IconButton
          aria-label="Toggle color mode"
          icon={colorMode === 'light' ? <FaRegMoon /> : <FaSun />}
          onClick={toggleColorMode}
          variant="ghost"
          color="current"
          transition="transform 0.1s"
          _hover={{
            transform: 'scale(1.2)',
          }}
          _focus={{
            bgColor: 'transparent',
          }}
          size={['md', 'md', 'lg']}
        />
      </Flex>
    </Flex>
  );
};

export default NavBar;
