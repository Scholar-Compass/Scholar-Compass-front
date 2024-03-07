// app/layout.tsx
'use client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Provider as JotaiProvider } from 'jotai';
import theme from '@/theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <JotaiProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
