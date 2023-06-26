import { Box, BoxProps } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

type ScrollBoxProps = {
  children: React.ReactNode;
} & BoxProps;

const ScrollBox = ({ children, ...props }: ScrollBoxProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  let boxHeight = boxRef.current?.clientHeight || 0;
  const resizeObserver = new ResizeObserver(entries => {
    const newHeight = entries[0].target.clientHeight;
    if (newHeight !== boxHeight) {
      boxHeight = newHeight;
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  });

  useEffect(
    () => {
      resizeObserver.observe(boxRef.current!);
      return () => {
        resizeObserver.disconnect();
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Box ref={boxRef} overflowY="auto" {...props}>
      {children}
      <Box ref={endRef} />
    </Box>
  );
};

export default ScrollBox;
