import {Input, Row, Text, View} from 'native-base';
import {StyleSheet} from 'react-native';
import React from 'react';
import {Button} from '../Button';
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
  }

  render() {
    return (
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
          <Input
            placeholder="Digite seu nomer:"
            onChange={e => this.handleNameChange(e)}
          />
          <Input
            placeholder="Digite seu cpf:"
            onChange={e => this.handleCpfChange(e)}
          />
          <Row>
            <Button
              onPress={() => this.props.setModalVisible(!this.props.modal)}
              title={'close'}
            />
            <Button onPress={this.sendMessage} title={'console'} />
          </Row>
        </View>
      </View>
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
