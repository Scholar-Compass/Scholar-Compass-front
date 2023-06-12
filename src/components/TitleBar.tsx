import { Flex, Text } from "@chakra-ui/react";

interface TitleBarProps {
  title?: string;
  height?: string;
}

const TitleBar = ({title = "Scholar Compass", height = "50px"} : TitleBarProps ) => {
  return (
    <Flex
      p={4}
      bg="#13253F"
      color="white"
      justify="center"
      align="center"
      width="100%"
      pos="fixed"
      top={0}
      zIndex={999}
      h={height}
    >
      <Text fontSize="2xl">
        {title}
      </Text>
    </Flex>
  )
}

export default TitleBar;