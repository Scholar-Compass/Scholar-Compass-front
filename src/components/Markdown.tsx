import {
  Icon,
  Link,
  ListItem,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';
import { AiOutlineLink } from 'react-icons/ai';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { memo } from 'react';

const MemorizedMarkdown = memo(ReactMarkdown, (prevProps, nextProps) => {
  return prevProps.children === nextProps.children;
});

const components: Components = {
  ul: ({ children }) => <UnorderedList>{children}</UnorderedList>,
  ol: ({ children }) => <OrderedList>{children}</OrderedList>,
  li: ({ children }) => <ListItem>{children}</ListItem>,
  a: ({ children, href }) => (
    <Link href={href} isExternal color="blue.500">
      {children}
      <Icon ml="2px" as={AiOutlineLink} />
    </Link>
  ),
};

const Markdown = ({ children }: { children: string }) => {
  return (
    <MemorizedMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </MemorizedMarkdown>
  );
};

export default Markdown;
