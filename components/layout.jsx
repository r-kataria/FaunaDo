import { Box, Container, Heading, Text, Stack } from '@chakra-ui/react';

export const Layout = ({children}) => {
    return (
      <Box p={4}>
    
  {children}
    </Box>
    )
  }