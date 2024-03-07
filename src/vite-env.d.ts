/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_API_END_POINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
