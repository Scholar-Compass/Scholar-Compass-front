import { Box, BoxProps } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

const ScrollBox = ({children, ...props}: BoxProps) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior: 'smooth'});
  });

  return (
    <Box
      overflowY="auto"
      {...props}
    >
      {children}
      <Box ref={endRef}/>
    </Box>
  );
};

export default ScrollBox;
