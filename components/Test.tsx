import {Box, Button, useTheme} from 'native-base';
import React from 'react';
import {CenterWrapper} from './CenterWrapper';
import {Input} from './Input';

export const Test = () => {
  const {colors} = useTheme();
  return (
    <CenterWrapper>
      <Box textAlign={'center'}>Hatar</Box>
      <Input placeholder="something" />
      <Button
        onPress={() => console.log('something')}
        backgroundColor={colors.teal[400]}>
        Acessar fila
      </Button>
    </CenterWrapper>
  );
};
