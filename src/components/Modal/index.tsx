import {Modal, Button, Center, FormControl, Input} from 'native-base';
import React from 'react';
import {inject, observer} from 'mobx-react';
import {SocketStore} from '../../stores/SocketStore';
import TcpSocket from 'react-native-tcp-socket';

interface IProps {
  setModalVisible: (modal: boolean) => void;
  modal: boolean;
  store: SocketStore;
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
      cpf: e.nativeEvent.text,
    });
  };

  async sendMessage() {
    ``;
    const patientObject = {
      name: this.state.name,
      cpf: this.state.cpf,
    };
    console.log('AFTER:', this.props.store.socket);

    await this.props.store.connect().then(() => {
      console.warn('ended');
      this.props.store.sendMessage('message');
    });
  }

  render() {
    return (
      <Center>
        <Modal
          isOpen={this.props.modal}
          onClose={() => this.props.setModalVisible(!this.props.modal)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Entre na fila</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Nome</FormControl.Label>
                <Input
                  placeholder="Digite seu nome:"
                  onChange={e => this.handleNameChange(e)}
                />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>CPF</FormControl.Label>
                <Input
                  placeholder="Digite seu cpf:"
                  onChange={e => this.handleCpfChange(e)}
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => this.props.setModalVisible(!this.props.modal)}>
                  Cancelar
                </Button>
                <Button onPress={this.sendMessage}>Entrar</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    );
  }
}
