import { Box, BoxProps, Flex } from '@chakra-ui/react';
import Text from '@/components/Text';

export interface Message {
  content: string;
  from?: 'system' | 'user' | 'bot';
}

const MessageBox = ({ message, ...props }: { message: Message } & BoxProps) => {
  const isUser = message.from === 'user';
  const isSystem = message.from === 'system';
  return (
    <Flex
      justify={isUser ? 'flex-end' : 'flex-start'}
      wordBreak={'break-word'}
      {...props}
    >
      <Box
        style={{ overflow: 'hidden' }}
        bg={isUser ? 'blue.500' : 'gray.200'}
        color={isUser ? 'white' : 'black'}
        p={3}
        borderRadius="lg"
        boxShadow="md"
        whiteSpace="pre-wrap"
        maxWidth={['95%', '80%', '70%']}
        fontSize={['sm', 'md', 'lg']}
      >
        <Text typeWriting={!isSystem}>{message.content}</Text>
      </Box>
    </Flex>
  );
};

export default MessageBox;
