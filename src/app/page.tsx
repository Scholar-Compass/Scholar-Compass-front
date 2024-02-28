// app/page.tsx
'use client';

import React, { useState } from 'react';
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
  useColorModeValue,
  IconButton,
  Text,
} from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';
import NavBar from '@/components/NavBar';
import Message, { MessageMask, MessageType } from '@/components/Message';
import { getBotResponse } from '@/service/query';
import ScrollBox from '@/components/ScrollBox';
import { useAtomValue } from 'jotai';
import { languageAtom } from '@/utils/atom';
import { systemMessage } from '@/utils/strings';

function App() {
  const language = useAtomValue(languageAtom);
  const initialMessage: MessageType = {
    content: systemMessage[language],
    from: 'system',
  };

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '') {
      return;
    }

    // Display user's input message
    setMessages(prevMessages => [
      ...prevMessages,
      { content: inputText, from: 'user' },
    ]);

    setInputText('');
    setIsLoading(true);

    try {
      // Send user's question to the API
      const res = await getBotResponse(inputText);
      setMessages(prevMessages => [
        ...prevMessages,
        { content: res.answer, from: 'bot' },
      ]);
    } catch (error) {
      console.error('Request failed with error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const navBarH = [50, 55, 60].map(h => h + 'px');
  const inputH = '75px';

  return (
    <Flex minH="100vh" flexDir="column">
      <NavBar h={navBarH} />
      <ScrollBox mt={navBarH} mb={inputH} flex={1} px={8} py={4}>
        <Message {...initialMessage}>{systemMessage[language]}</Message>
        {messages?.map((message, index) => (
          <Message key={index} {...message} />
        ))}
        {isLoading && <MessageMask />}
      </ScrollBox>
      <Flex
        p={4}
        pos="fixed"
        width="100%"
        bottom={0}
        zIndex={999}
        h={inputH}
        alignItems="center"
        bgColor={useColorModeValue('default.light', 'default.dark')}
      >
        <InputGroup>
          <Input
            placeholder="Type your question..."
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            bgColor={useColorModeValue('white', 'gray.700')}
            isDisabled={isLoading}
            _placeholder={{ color: useColorModeValue('gray.500', 'gray.300') }}
          />
          <InputRightElement>
            <IconButton
              icon={<Icon as={FaPaperPlane} />}
              aria-label="Send message"
              color="blue.500"
              cursor="pointer"
              isDisabled={isLoading}
              variant="ghost"
              _hover={{ bgColor: 'transparent', color: 'blue.300' }}
              onClick={handleSendMessage}
            />
          </InputRightElement>
        </InputGroup>
      </Flex>
    </Flex>
  );
}

export default App;
