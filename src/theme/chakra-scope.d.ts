declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      /**
       * Scope of Chakra UI's global styles
       *
       * Use with `ResetCSS`.
       */
      'chakra-scope': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export {};
