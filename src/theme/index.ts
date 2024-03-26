import { extendTheme } from '@chakra-ui/react';

/** Get color mode from mkdocs-material */
export function mkdocs_color_mode(): string {
  // Types are modified from https://github.com/squidfunk/mkdocs-material/blob/545803977829e05fdc4f0c3b6c0e0cd9a72fde84/src/templates/assets/javascripts/components/palette/index.ts#L50-L70
  // Inspired by https://squidfunk.github.io/mkdocs-material/setup/adding-a-comment-system/
  interface PaletteColor {
    /** Media query */
    media?: string;
    /** Color scheme */
    scheme?: string;
    /** Primary color */
    primary?: string;
    /** Accent color */
    accent?: string;
  }
  interface Palette {
    /** Palette index  */
    index: number;
    /** Palette colors */
    color: PaletteColor;
  }

  const palette = __md_get<Palette>('__palette');
  const mode = palette?.color.scheme === 'slate' ? 'dark' : 'light';
  return mode;
}

const theme = extendTheme({
  config: {
    // Sync color mode from mkdocs-material
    initialColorMode: mkdocs_color_mode(),
    useSystemColorMode: false,
  },
});

export default theme;
