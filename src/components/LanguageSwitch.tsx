import { Text, Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { languageAtom } from '@/utils/atom';

const LanguageSwitch = () => {
  const [language, setLanguage] = useAtom(languageAtom);
  const isEnglish = language === 'en';
  return (
    <Button
      variant="ghost"
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

export default LanguageSwitch;
