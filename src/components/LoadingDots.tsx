import { Box, BoxProps, HStack, keyframes } from '@chakra-ui/react';
import { css } from '@emotion/react';

const dotAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;

const animationDelayStyle = (delay: number) => css`
  animation-delay: ${delay}s;
`;

const LoadingDot = ({
  animationDelay = 0,
  ...props
}: { animationDelay?: number } & BoxProps) => {
  return (
    <Box
      as="span"
      display="inline-block"
      borderRadius="50%"
      width="0.75rem"
      height="0.75rem"
      bgColor="gray.300"
      animation={`${dotAnimation} 1s infinite`}
      css={animationDelayStyle(animationDelay)}
      {...props}
    />
  );
};

const LoadingDots = () => {
  return (
    <HStack spacing={6}>
      <LoadingDot />
      <LoadingDot animationDelay={0.25} bgColor="gray.400" />
      <LoadingDot animationDelay={0.5} bgColor="gray.500" />
    </HStack>
  );
};

export default LoadingDots;
