// app/layout.tsx
'use client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Provider as JotaiProvider } from 'jotai';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import theme from '@/theme';
import App from '@/app/page';

const root = createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <JotaiProvider>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </JotaiProvider>
  </StrictMode>
);
