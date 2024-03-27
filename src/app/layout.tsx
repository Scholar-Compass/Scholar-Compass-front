import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { Provider as JotaiProvider } from 'jotai';
import { StrictMode, useEffect } from 'react';

import theme from '@/theme';
import ResetCSS from '@/theme/ResetCSS';
import App from '@/app/page';

// 启用 mkdocs-material 的 instant loading 特性时，切换页面不会刷新，只是原地更改 DOM。
// 我们需要监听页面更改，发现切换到“机器人”页面时（`root`非空）重新渲染。
//
// 然而有个附加问题：Chakra UI 用了`<EmotionGlobal>`，它会向`<head>`加些东西，并假定不会被移除。
// 这一假设被 mkdocs-material 破坏了。
//
// 按“机器人 → 其它页面 → 机器人”顺序访问可体现这个问题。
// 首先在“机器人”，Emotion 初次运行，它在`<head>`中加入`[data-emotion=css]`。
// 切换到“其它页面”时，mkdocs-material 发现新页面的`<head>`（静态来说）没有那些东西，删掉了它们。
// 再切回“机器人”时，Emotion 要在`<head>`中的`[data-emotion=css]`前加入`[data-emotion=css-global]`，
// 然而`[data-emotion=css]`没有了，`Node.insertBefore`报错，终止渲染。
//
// 可在浏览器控制台运行以下代码来验证以上过程。
//
// ```javascript
// f = Node.prototype.insertBefore
// Node.prototype.insertBefore = function (newNode, referenceNode) {
//     console.log('Node.insertBefore:', this, newNode, referenceNode)
//     f.bind(this)(newNode, referenceNode)
// }
// ```
//
// 这一问题mkdocs-material已知，2024年3月还是`@todo`，
// 它遇到`name !== "theme-color" && name !== "color-scheme"`的tag一律删除。
// https://github.com/squidfunk/mkdocs-material/blob/f27b93ece3c423537873e0bc5de55b3c3381792f/src/templates/assets/javascripts/integrations/instant/index.ts#L210-L214
// https://github.com/squidfunk/mkdocs-material/issues/6846
//
// 于是我们只好自己记住`[data-emotion=css]`，适时加回来。

function get_emotion_tags(): NodeListOf<Element> {
  return document.head.querySelectorAll(':scope > [data-emotion=css]');
}

let emotion_tags: NodeListOf<Element> | null = null;

export default function RootLayout() {
  // Save tags when rendered
  useEffect(() => {
    emotion_tags = get_emotion_tags();
  });
  // Load tags if necessary
  if (emotion_tags !== null && get_emotion_tags().length === 0) {
    emotion_tags.forEach(tag => document.head.appendChild(tag));
  }

  return (
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
