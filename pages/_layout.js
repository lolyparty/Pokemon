import { Box, Text } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Box bg="blue" p={5}>
      <Text fontSize="4xl" color="white" fontWeight="900">
        Pokemon
      </Text>
      {children}
    </Box>
  );
};

export default Layout;
