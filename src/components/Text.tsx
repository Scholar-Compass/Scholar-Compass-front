import { Box, BoxProps, Button, Text as ChakraText } from '@chakra-ui/react';

type MyTextProps = {
  children: string;
};

const Text = ({ children, ...props }: MyTextProps & BoxProps) => {
  return (
    <Box {...props}>
      {children
        .split(/\*\*(.*?)\*\*/)
        .map((part, index) =>
          index % 2 === 1 ? (
            <ChakraText as="span" fontWeight="bold" key={index}>
              {part}
            </ChakraText>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
    </Box>
  );
};

export default Text;
