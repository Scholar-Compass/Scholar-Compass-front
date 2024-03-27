// https://vitejs.dev/guide/backend-integration.html
import 'vite/modulepreload-polyfill';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Provider as JotaiProvider } from 'jotai';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import theme from '@/theme';
import ResetCSS from '@/theme/ResetCSS';
import App from '@/app/page';

function mount(element: HTMLElement) {
  const root = createRoot(element);
  root.render(
    <StrictMode>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <JotaiProvider>
        <chakra-scope>
          <ChakraProvider
            theme={theme}
            disableGlobalStyle={true}
            resetCSS={false}
          >
            <ResetCSS />
            <App />
          </ChakraProvider>
        </chakra-scope>
      </JotaiProvider>
    </StrictMode>
  );
}

document$.subscribe(() => {
  // # 已知的问题
  //
  // 启用 mkdocs-material 的 instant loading 特性时，切换页面不会刷新，只是原地更改 DOM。
  // Chakra UI 用了`<EmotionGlobal>`，它似乎不支持反复渲染。
  // 由于每次访问“机器人”页面时重新渲染，按“机器人 → 其它页面 → 机器人”顺序访问后，渲染会因此失败。
  const root = document.getElementById('bot-root');
  if (root) {
    mount(root);
  }
});
