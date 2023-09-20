import { atom } from 'jotai';

type languages = 'zh' | 'en';
const languageAtom = atom<languages>('zh');

export { languageAtom };
