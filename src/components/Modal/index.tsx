import {Modal, Button, Center, FormControl, Input, Text} from 'native-base';
import React from 'react';
import Toast from 'react-native-toast-message';
import {inject, observer} from 'mobx-react';
import {RootStore} from '../../stores/RootStore';
import {cpfMask} from '../../utils/cpfCode';

interface IProps {
  setModalVisible: (modal: boolean) => void;
  modal: boolean;
  store?: RootStore;
}

interface IState {
  name: string;
  cpf: string;
}

@inject('store')
@observer
export class QueueEnter extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      cpf: '',
      name: '',
    };
    this.handleCpfChange = this.handleCpfChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleNameChange = (e: any) => {
    this.setState({
      name: e.nativeEvent.text,
    });
  };

  handleCpfChange = (e: any) => {
    this.setState({
      cpf: cpfMask(e),
    });
  };

  async sendMessage() {
    const patientObject = {
      name: this.state.name,
      cpf: this.state.cpf.replace(/[^0-9]/g, ''),
    };
    Promise.resolve(this.props.store?.socketStore.connect())
      .then(() => {
        this.props.store?.socketStore.enterQueue(patientObject);
      })
      .finally(() => {
        if (this.props.store?.queueStore.getState() === 'onHold') {
          this.props.setModalVisible(false);
        }
      });
  }

  render() {
    const {modal, setModalVisible} = this.props;
    const {name, cpf} = this.state;

    return (
      <Center>
        <Modal isOpen={modal} onClose={() => setModalVisible(!modal)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header
              borderBottomWidth={0}
              paddingRight={4}
              borderWidth={0}>
              <Text bold fontSize="xl" paddingRight={8}>
                Preencha abaixo para entrar na fila:
              </Text>
            </Modal.Header>
            <Modal.Body>
              <FormControl>
                <Text bold fontSize="xl">
                  Nome
                </Text>
                <Input
                  fontSize={'xl'}
                  placeholder="Ex: João da Silva"
                  onChange={e => this.handleNameChange(e)}
                />
              </FormControl>
              <FormControl mt="3">
                <Text bold fontSize="xl">
                  CPF
                </Text>
                <Input
                  value={this.state.cpf}
                  maxLength={14}
                  fontSize={'xl'}
                  placeholder="Ex: 000.000.000-00"
                  onChangeText={e => this.handleCpfChange(e)}
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer
              display={'flex'}
              textAlign={'center'}
              alignItems="center"
              justifyContent={'center'}
              borderTopWidth={0}>
              <Button.Group space={2}>
                <Button variant="ghost" onPress={() => setModalVisible(!modal)}>
                  Cancelar
                </Button>
                <Button
                  isDisabled={name.length < 4 || cpf.length < 11}
                  backgroundColor={'#17C964'}
                  onPress={this.sendMessage}>
                  <Text color="white" bold>
                    Entrar
                  </Text>
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  }
}
