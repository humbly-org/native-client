import {Modal, Button, Center, FormControl, Input} from 'native-base';
import {StyleSheet} from 'react-native';
import React from 'react';
import {inject, observer} from 'mobx-react';

interface IProps {
  setModalVisible: (modal: boolean) => void;
  modal: boolean;
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
    console.warn(this.state.name);
    this.setState({
      name: e.nativeEvent.text,
    });
  };

  handleCpfChange = (e: any) => {
    this.setState({
      cpf: e.nativeEvent.text,
    });
  };

  sendMessage() {
    const patientObject = {
      name: this.state.name,
      cpf: this.state.cpf,
    };
    console.warn(patientObject);
    this.props.setModalVisible(!this.props.modal)
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
