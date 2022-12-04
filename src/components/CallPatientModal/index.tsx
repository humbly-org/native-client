import {Modal, Badge, Center, Input, Text} from 'native-base';
import React from 'react';
import Toast from 'react-native-toast-message';
import {inject, observer} from 'mobx-react';
import {RootStore} from '../../stores/RootStore';

interface IProps {
  store?: RootStore;
}

interface IState {}

@inject('store')
@observer
export class CallPatientModal extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    const {queueStore} = this.props.store!;
    const {callPatientModal, setCallPatientModal, code} = queueStore;

    return (
      <Center>
        <Modal
          isOpen={callPatientModal}
          onClose={() => setCallPatientModal(!callPatientModal)}>
          <Modal.Content bgColor={'#17c9647e'} padding={8} maxWidth="400px">
            <Badge
              style={{
                marginBottom: 16,
                backgroundColor: '#F5A524',
              }}>
              <Text
                textAlign={'center'}
                fontWeight={900}
                color={'white'}
                fontSize={18}>
                Você foi chamado!
              </Text>
            </Badge>
            <Badge backgroundColor={'#17c9647e'}>
              <Text
                fontWeight={'bold'}
                textAlign={'center'}
                style={{
                  marginBottom: 16,
                  color: 'white',
                }}>
                Por favor, dirija-se ao guiche de atendimento para ser atendido.
              </Text>
              <Text
                style={{
                  marginBottom: 8,
                }}
                bold
                color={'white'}
                textAlign={'center'}
                fontSize={18}>
                Informe o código abaixo para o(a) atendente
              </Text>
            </Badge>
            <Badge
              style={{
                backgroundColor: '#9750DD',
              }}>
              <Text
                textAlign={'center'}
                fontWeight={900}
                color={'white'}
                fontSize={28}>
                {code || '0000'}
              </Text>
            </Badge>
          </Modal.Content>
        </Modal>
      </Center>
    );
  }
}
