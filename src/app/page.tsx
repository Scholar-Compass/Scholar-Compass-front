// app/page.tsx
'use client'

import React, { useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Icon,
  Text,
} from '@chakra-ui/react';
import {FaPaperPlane} from 'react-icons/fa';
import RootLayout from "@/app/layout";
import NavBar from './components/NavBar';

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
      const response = await fetch('http://127.0.0.1:8080/query', {
        method: 'POST',
        body: JSON.stringify({ question: inputText }),
        headers: {
          // 'Content-Type': 'application/json',
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
    }

    // mocked loading and data returned from server
    // setTimeout(() => {
    //   setMessages((prevMessages) => [
    //     ...prevMessages,
    //     { content: 'Hello, I am a bot.', isUser: false },
    //   ]);
    //   setIsLoading(false);
    // }, 1000);

    setInputText('');
  };

  return (
    <RootLayout>
       <Flex
          minHeight="100vh"
          direction="column"
        >
        <NavBar/>
        <Container flex="1" pl={4} pr={4} mt={8} overflowY="scroll">
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
        </Container>

        <Box 
          mt={4} p={4} 
          width="100%"
          position="sticky"
          bottom={0}
        >
          <InputGroup zIndex={999}>
            <Input
              placeholder="Type your message..."
              value={inputText}
              onChange={handleInputChange}
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
