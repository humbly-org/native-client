import {Box, Button, Center, useTheme} from 'native-base';
import React from 'react';

export const Test = () => {
  const {colors} = useTheme();
  return (
    <Center
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignContent={'center'}
      alignSelf={'center'}>
      <Box textAlign={'center'}>Hatar</Box>
      <Button backgroundColor={colors.teal[400]}>Acessar fila</Button>
    </Center>
  );
};
