// app/page.tsx
'use client'

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Icon,
} from '@chakra-ui/react';
import {FaPaperPlane} from 'react-icons/fa';
import NavBar from '@/components/NavBar';
import Text from '@/components/Text';
import { getBotResponse } from '@/service/query';
import LoadingDots from '@/components/LoadingDots';

const systemMessage = 
`Hi 亲爱的同学们：
欢迎使用 **ScholarCompass AI 对话机器人** (beta)～
你可以用以下问题开启对话：

**综合类：**
“我是一个比较擅长数学和物理的学生，可以推荐一些专业和学校吗？”
**信息检索类（学校… + 方面）：**
“北邮/港大/南开 + 宿舍”

请注意，我们尚未涵盖所有院校，你可以提问**“目前支持哪些学校？”**来获取院校名单。“方面”主要包含：
- **学业**（强势专业、竞赛、转专业政策等）
- **生活**（运动、食堂、社团、学校周边等）

我们的数据来自在校学生原创内容，可能与客观情况有所偏差，请汇总多方信息后再做志愿填报的决定。希望我们的产品对你有所帮助～`

function App() {
  interface Message {
    content: string;
    isUser: boolean;
  }

  const initalMessages: Message[] = [
    {
      content: systemMessage,
      isUser: false,
    }
  ];

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initalMessages);

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

    setInputText('');
    setIsLoading(true);

    try {
      // Send user's question to the API
      const res = await getBotResponse(inputText);
      setMessages((prevMessages) => [
        ...prevMessages,
        { content: res.answer, isUser: false },
      ]);
    } catch (error) {
      console.error('Request failed with error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex minH="100vh" flexDir="column">
      <NavBar h="60px"/>
      <Box
        mt="60px"
        mb="70px"
        flex={1}
        px={8} 
        py={4}
        overflowY="auto"
      >
        {messages.map((message, index) => (
          <Flex
            key={index}
            justify={message.isUser ? 'flex-end' : 'flex-start'}
            mt={index === 0 ? 0 : 3}
            wordBreak={"break-word"}
          > 
            <Text
              bg={message.isUser ? 'blue.500' : 'gray.200'}
              color={message.isUser ? 'white' : 'black'}
              p={3}
              borderRadius="lg"
              boxShadow="md"
              whiteSpace="pre-wrap"
              maxWidth={["95%", "80%", "70%"]}
              fontSize={["sm", "md", "lg"]}
            >  
              {message.content}
            </Text>
          </Flex>
        ))}

        {isLoading && (
          <Flex justify="flex-start" mt={4} p={3}>
            <LoadingDots />
          </Flex>
        )}
      </Box>
      <Flex 
        p={4} 
        pos="fixed"
        width="100%"
        bottom={0}
        zIndex={999}
        bg="white"
        h="75px"
        alignItems="center"
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
      </Flex>
    </Flex>
  );
}

export default App;
