import {Modal} from 'react-native';
import {Center, Input} from 'native-base';
import React, {Component} from 'react';
import {Button} from '../../components/Button';
import {parseMessage} from '../../utils';
import {inject, observer} from 'mobx-react';
import {Alert} from 'react-native';
import {QueueEnter} from '../../components/Modal';

interface IProps {
  store?: any;
}

interface IState {
  modal: boolean;
  input: string;
  message: string;
}

@inject('store')
@observer
class Counter extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      modal: false,
      input: '',
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  eventHandler(data: string | Buffer) {
    const message = parseMessage(data);
    console.log(message);
  }

  handleChange(e: any) {
    this.setState({input: e.nativeEvent.text});
  }

  sendMessage() {
    const input = this.state.input;
    this.props.store.sendMessage(input);
  }

  setModalVisible = (visible: boolean) => {
    this.setState({modal: visible});
  };

  render() {
    return (
      <Center>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setModalVisible(!this.state.modal);
          }}>
          <QueueEnter
            modal={this.state.modal}
            setModalVisible={this.setModalVisible}
          />
        </Modal>
        <Input placeholder="For Server" onChange={this.handleChange} />
        <Button
          title={'Open Modal'}
          onPress={() => this.setState({modal: !this.state.modal})}
        />
        <Button title={'Send for server'} onPress={this.sendMessage} />
      </Center>
    );
  }
}

export default Counter;
