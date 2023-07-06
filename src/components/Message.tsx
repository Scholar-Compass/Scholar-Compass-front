import { BoxProps, Flex, Stack } from '@chakra-ui/react';
import TypeWriter, {
  opDelete,
  opDeleteAll,
  opType,
  opWait,
} from '@/components/TypeWriter';
import Markdown from '@/components/Markdown';
import { PropsWithChildren } from 'react';

export type MessageType = {
  content: string;
  from: 'system' | 'user' | 'bot';
};

type MessageBoxProps = PropsWithChildren<{ isUser?: boolean } & BoxProps>;

const MessageBox = ({
  children,
  isUser = false,
  ...props
}: MessageBoxProps) => (
  <Flex
    justify={isUser ? 'flex-end' : 'flex-start'}
    wordBreak={'break-word'}
    {...props}
  >
    <Stack
      style={{ overflow: 'hidden' }}
      bg={isUser ? 'teal.500' : 'gray.200'}
      color={isUser ? 'white' : 'black'}
      p={3}
      borderRadius="lg"
      boxShadow="md"
      whiteSpace="pre-wrap"
      maxWidth={['95%', '80%', '70%']}
      fontSize={['sm', 'md', 'lg']}
      spacing={[2, 3, 4]}
    >
      {children}
    </Stack>
  </Flex>
);

const Message = ({ content, from, ...props }: MessageType & BoxProps) => {
  const isUser = from === 'user';
  const isSystem = from === 'system';

  return (
    <MessageBox isUser={isUser} {...props}>
      {isSystem ? (
        <Markdown>{content}</Markdown>
      ) : (
        <TypeWriter operations={[opType(content)]} />
      )}
    </MessageBox>
  );
};

export const MessageMask = ({ ...props }: BoxProps) => (
  <MessageBox {...props}>
    <TypeWriter
      speed={100}
      showCursor={true}
      operations={[
        opWait(500),
        opType('加载中...'),
        opWait(500),
        opDelete(3),
        opType('...'),
        opWait(500),
        opDeleteAll(),
        opType('啦啦啦啦啦啦啦啦....'),
      ]}
    />
  </MessageBox>
);

export default Message;
