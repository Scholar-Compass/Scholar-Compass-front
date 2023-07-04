import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    default: {
      light: 'white',
      dark: '#363c46',
    },
  },
});

export default theme;
