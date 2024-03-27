// https://vitejs.dev/guide/backend-integration.html
import 'vite/modulepreload-polyfill';

import { createRoot } from 'react-dom/client';

import RootLayout from '@/app/layout';

// 监听 mkdocs-material 页面更改，发现切换到“机器人”页面时（`root`非空）重新渲染
document$.subscribe(() => {
  const root = document.getElementById('bot-root');
  if (root) {
    createRoot(root).render(<RootLayout />);
  }
});
