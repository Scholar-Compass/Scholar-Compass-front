import { Box, BoxProps, useColorModeValue } from '@chakra-ui/react';
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
    <Box
      ref={scrollAreaRef}
      overflowY="auto"
      bgColor={useColorModeValue('brand.light', 'brand.dark')}
      {...props}
    >
      {children}
      <Box ref={bottomRef} />
    </Box>
  );
};

export default ScrollBox;
