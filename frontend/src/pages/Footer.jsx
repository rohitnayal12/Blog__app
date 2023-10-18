
import React from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      as="footer"
      backgroundColor="gray.900"
      color="white"
      py="4"
      textAlign="center"
      mt={1}
      height={20}
    >
      <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
        <Text fontSize="m" mr="2">
          &copy; 2023 Your Blog Application
        </Text>
        <Link
          href="#"
          fontSize="m"
          mr="2"
          _hover={{ textDecoration: 'underline' }}
        >
          Privacy Policy
        </Link>
        <Link
          href="#"
          fontSize="m"
          _hover={{ textDecoration: 'underline' }}
        >
          Terms of Service
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;

