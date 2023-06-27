import { Text as ChakraText, keyframes } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Markdown from '@/components/Markdown';

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Cursor = () => {
  return (
    <ChakraText
      as="span"
      animation={`${blink} 0.5s infinite`}
      _before={{ content: '"\\00a0"' }}
    >
      |
    </ChakraText>
  );
};

type TypeWritingProps = {
  children: string;
  speed?: number;
};

const TypeWriter = ({ children, speed = 10 }: TypeWritingProps) => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const characters = children.split('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (characters.length > 0) {
        setText(prevText => prevText + characters.shift());
      } else {
        setShowCursor(false);
        clearInterval(interval);
      }
    }, speed);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Markdown>{text}</Markdown>;
};

export default TypeWriter;
