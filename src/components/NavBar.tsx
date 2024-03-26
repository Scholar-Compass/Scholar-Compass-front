import { BoxProps, Flex, Text, useColorMode, Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { languageAtom } from '@/utils/atom';
import { mkdocs_color_mode } from '@/theme';

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
  // Sync color mode from mkdocs-material
  const { setColorMode } = useColorMode();
  document.addEventListener('DOMContentLoaded', function () {
    const ref = document.querySelector('[data-md-component=palette]');
    ref?.addEventListener('change', function () {
      setColorMode(mkdocs_color_mode());
    });
  });

  return (
    <Flex
      p={4}
      bg="#13253F"
      color="white"
      justify="center"
      align="center"
      width="100%"
      top={0}
      justifyContent="space-between"
      {...props}
    >
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
