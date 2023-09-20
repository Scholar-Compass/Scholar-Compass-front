import {
  BoxProps,
  IconButton,
  Flex,
  Text,
  useColorMode,
  Button,
} from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { FaRegMoon, FaSun } from 'react-icons/fa';
import { languageAtom } from '@/utils/atom';

const LanguageSwitch = () => {
  const [language, setLanguage] = useAtom(languageAtom);
  const isEnglish = language === 'en';
  return (
    <Button
      variant="ghost"
      color="white"
      _hover={{
        transform: 'scale(1.1)',
      }}
      _active={{
        bgColor: 'transparent',
      }}
      onClick={() => {
        setLanguage(isEnglish ? 'zh' : 'en');
      }}
    >
      <Text fontSize={isEnglish ? 'xs' : 'md'}>中文</Text>
      <Text mx={1}>/</Text>
      <Text fontSize={isEnglish ? 'md' : 'xs'}>EN</Text>
    </Button>
  );
};

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
      justifyContent="space-between"
      {...props}
    >
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
        _active={{
          bgColor: 'transparent',
        }}
        size={['md', 'md', 'lg']}
      />
      <Text
        textAlign="center"
        fontWeight="bold"
        fontSize={['xl', '2xl', '2xl']}
      >
        Scholar Compass
      </Text>
      <LanguageSwitch />
    </Flex>
  );
};

export default NavBar;
