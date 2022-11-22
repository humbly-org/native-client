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
import {Modal} from 'react-native';
import {QueueEnter} from '../../components/Modal';

interface IProps {
  store?: any;
}
interface IHooksHOCProps {
  state: number;
  setState: (callback: CallbackStateFunctionType) => void;
}

interface IState {
  modal: boolean;
  input: string;
  message: string;
}

class Hospital extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      modal: false,
      input: '',
      message: '',
    };
  }

  setModalVisible = (visible: boolean) => {
    this.setState({modal: visible});
  };

  render() {
    return (
      <>
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
                <Button size={'lg'} onPress={() => this.setModalVisible(true)}>
                  Entra na fila
                </Button>
              </HStack>
            </Box>
          </VStack>
        </Box>
        <QueueEnter
          modal={this.state.modal}
          setModalVisible={this.setModalVisible}
        />
      </>
    );
  }
}

export default hospitalHOC(Hospital);
