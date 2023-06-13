// app/page.tsx
'use client'

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Icon,
} from '@chakra-ui/react';
import {FaPaperPlane} from 'react-icons/fa';
import RootLayout from "@/app/layout";
import TitleBar from '@/components/TitleBar';

function App() {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  interface Message {
    content: string;
    isUser: boolean;
  }

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
    setMessages((prevMessages) => [
      ...prevMessages,
      { content: inputText, isUser: true },
    ]);

    setIsLoading(true);

    try {
      // Send user's question to the API
      const response = await fetch('https://api.scholarcompass.org/query', {
        method: 'POST',
        body: JSON.stringify({ question: inputText }),
        headers: {
          'Content-Type': 'text/plain',
        },
      });
    
      if (response) {
        const data = await response.json();
    
        // Display API response
        setMessages((prevMessages) => [
          ...prevMessages,
          { content: data.answer, isUser: false },
        ]);
      } else {
        console.error('Request failed');
      }
    } catch (error) {
      console.error('Request failed with error:', error);
    } finally {
      setIsLoading(false);
    }

    setInputText('');
  };

  return (
    <RootLayout>
       <Flex
          minHeight="100vh"
          direction="column"
        >
        <TitleBar height="50px"/>
        <Box 
          flex={1} 
          pr={8} 
          pl={8} 
          pt={4}
          pb={4}
          mt="50px"
          mb="80px"
          overflowY="scroll"
          maxHeight={`calc(100vh - 130px)`}
        >
          {messages.map((message, index) => (
            <Flex
              key={index}
              justify={message.isUser ? 'flex-end' : 'flex-start'}
              mt={2}
              wordBreak={"break-word"}
            >
              <Box
                bg={message.isUser ? 'blue.500' : 'gray.200'}
                color={message.isUser ? 'white' : 'black'}
                p={3}
                borderRadius="lg"
                boxShadow="md"
                whiteSpace="pre-wrap"
                maxWidth="70%"
              >
                {message.content}
              </Box>
            </Flex>
          ))}

          {isLoading && (
            <Flex justify="flex-start" mt={4}>
              <Spinner size="lg" color="blue.500" />
            </Flex>
          )}
        </Box>

        <Box 
          mt={4} p={4} 
          width="100%"
          pos="fixed"
          bottom={0}
          zIndex={999}
          h="80px"
        >
          <InputGroup>
            <Input
              placeholder="Type your question..."
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <InputRightElement>
              <Icon
                as={FaPaperPlane}
                color="blue.500"
                cursor="pointer"
                onClick={handleSendMessage}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Flex>
    </RootLayout>
  );
}

export default App;
