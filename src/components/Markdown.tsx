import {
  Icon,
  Link,
  Text,
  ListItem,
  OrderedList,
  UnorderedList,
} from '@chakra-ui/react';
import { BiLinkExternal } from 'react-icons/bi';
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
      <Text as="span" pos="relative" top="1px">
        {children}
      </Text>
      <Icon ml="2px" verticalAlign="text-bottom" as={BiLinkExternal} />
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
