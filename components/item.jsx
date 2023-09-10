import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Icon, Text, HStack, VStack, ScaleFade } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export const Item = ({data, removeFn, index}) => {

    return (
    <ScaleFade initialScale={0.9} in={true}>

      <HStack align={'top'}>
      <Box color={'red.400'} px={2}>
        <Icon as={CloseIcon} _hover={{cursor: 'pointer'}} onClick={e => removeFn(index)}/>
      </Box>
      <VStack align={'start'}>
        <Text fontWeight={600}>{data}</Text>
      </VStack>
    </HStack>
  </ScaleFade>
    )
  }  