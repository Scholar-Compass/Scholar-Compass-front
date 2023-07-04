import { Box, BoxProps, Stack, useColorModeValue } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import useResizeObserver from 'use-resize-observer';

type ScrollBoxProps = {
  children: React.ReactNode;
} & BoxProps;

const ScrollBox = ({ children, ...props }: ScrollBoxProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const { ref: scrollAreaRef, height = 0 } =
    useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [height]);

  return (
    <Stack
      ref={scrollAreaRef}
      overflowY="auto"
      bgColor={useColorModeValue('default.light', 'default.dark')}
      spacing={4}
      {...props}
    >
      {children}
      <Box ref={bottomRef} />
    </Stack>
  );
};

export default ScrollBox;
