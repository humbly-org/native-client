import React, {Component} from 'react';
import {CallbackStateFunctionType} from '../../utils';
import {hospitalHOC} from './HospitalStates';
import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Spacer,
  Text,
  VStack,
} from 'native-base';

interface IHooksHOCProps {
  state: number;
  setState: (callback: CallbackStateFunctionType) => void;
}

class Hospital extends Component<IHooksHOCProps> {
  render() {
    return (
      <Box borderWidth="1" borderRadius="md">
        <VStack space="4" divider={<Divider />}>
          <Box px={4} pt={3}>
            <HStack space={3}>
              <Image
                source={require('../../assets/hospital.jpeg')}
                alt="Alternate Text"
                size="md"
              />
              <Spacer />
              <Text>Hospital Sirio Libanês</Text>
            </HStack>
          </Box>
          <Box px={4} py={4}>
            <HStack space={3}>
              <Text>Especialidade XX</Text>
              <Spacer />
              <Button size={'lg'}>Entra na fila</Button>
            </HStack>
          </Box>
        </VStack>
      </Box>
    );
  }
}

export default hospitalHOC(Hospital);
