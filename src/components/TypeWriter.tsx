import { keyframes } from '@emotion/react';
import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Markdown from '@/components/Markdown';

enum OpType {
  TYPE = 'typing',
  WAIT = 'wait',
  DELETE = 'delete',
  DELETE_ALL = 'deleteAll',
}

type Operation =
  | { type: OpType.TYPE; text: string }
  | { type: OpType.WAIT; time: number }
  | { type: OpType.DELETE; length: number }
  | { type: OpType.DELETE_ALL };

export const opType = (text: string): Operation => ({
  type: OpType.TYPE,
  text,
});
export const opWait = (time: number): Operation => ({
  type: OpType.WAIT,
  time,
});
export const opDelete = (length: number): Operation => ({
  type: OpType.DELETE,
  length,
});
export const opDeleteAll = (): Operation => ({ type: OpType.DELETE_ALL });

type TypeWritingProps = {
  operations: Array<Operation>;
  speed?: number;
  showCursor?: boolean;
};

const TypeWriter = ({
  operations,
  speed = 10,
  showCursor = false,
}: TypeWritingProps) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= operations.length) return;

    const operation = operations[index];

    if (operation.type === OpType.WAIT) {
      const timer = setTimeout(() => {
        setIndex(prevIndex => prevIndex + 1);
      }, operation.time);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      switch (operation.type) {
        case OpType.TYPE:
          if (operation.text.length <= 0) {
            setIndex(prevIndex => prevIndex + 1);
            break;
          }
          setText(prevText => {
            const newText = prevText + operation.text[0];
            operation.text = operation.text.slice(1);
            return newText;
          });
          break;
        case OpType.DELETE:
          if (operation.length <= 0) {
            setIndex(prevIndex => prevIndex + 1);
            break;
          }
          setText(prevText => {
            operation.length--;
            return prevText.slice(0, -1);
          });
          break;
        case OpType.DELETE_ALL:
          if (text.length <= 0) {
            setIndex(prevIndex => prevIndex + 1);
            break;
          }
          setText(prevText => prevText.slice(0, -1));
          break;
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [text, index, operations, speed]);

  return showCursor ? (
    <Text as="span">
      {text}
      <BlinkCursor />
    </Text>
  ) : (
    <Markdown>{text}</Markdown>
  );
};

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

export const BlinkCursor = () => {
  return (
    <Text
      as="span"
      animation={`${blink} 0.5s infinite`}
      _before={{ content: '"\\00a0"' }}
    >
      ▍
    </Text>
  );
};

export default TypeWriter;
