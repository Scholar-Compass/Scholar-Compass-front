import { BoxProps, Flex, Stack } from '@chakra-ui/react';
import TypeWriter, {
  opDelete,
  opDeleteAll,
  opType,
  opWait,
} from '@/components/TypeWriter';
import Markdown from '@/components/Markdown';
import { PropsWithChildren } from 'react';
import { useAtomValue } from 'jotai';
import { languageAtom } from '@/utils/atom';

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

export const MessageMask = ({ ...props }: BoxProps) => {
  const language = useAtomValue(languageAtom);
  let operations;
  if (language === 'zh') {
    operations = [
      opWait(500),
      opType('不要着急，答案马上出来...'),
      opWait(1500),
      opDelete(9),
      opType('再等会儿哈'),
      opWait(1500),
      opDeleteAll(),
      opType('啦啦啦啦啦啦啦....'),
      opWait(500),
      opDeleteAll(),
    ];
  } else {
    operations = [
      opWait(500),
      opType('Loading... Please wait...'),
      opWait(1500),
      opDelete(14),
      opType('Just a moment...'),
      opWait(1500),
      opDeleteAll(),
      opType('Comming....'),
      opWait(500),
      opDeleteAll(),
    ];
  }
  return (
    <MessageBox {...props}>
      <TypeWriter speed={120} showCursor={true} operations={operations} />
    </MessageBox>
  );
};

export default Message;
