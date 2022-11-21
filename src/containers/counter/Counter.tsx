import {Input} from 'native-base';
import React, {Component} from 'react';
import {Text, Button} from 'react-native';
import {socket} from '../../store/context';

interface IProps {}

interface IState {
  counter: number;
  input: string;
}

class Counter extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      counter: 0,
      input: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  handleChange(e: any) {
    this.setState({input: e.nativeEvent.text});
  }

  sendMessage() {
    const message = this.state.input;
    console.log(message);
    try {
      socket.write(message + '\n');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <>
        <Text>{this.state.counter}</Text>
        <Text>{this.state.input}</Text>
        <Input placeholder="something" onChange={this.handleChange} />
        <Button
          title={'add'}
          onPress={() => this.setState({counter: this.state.counter + 1})}
        />
        <Button
          title={'dump'}
          onPress={() => this.setState({counter: this.state.counter - 1})}
        />
        <Button title={'subtract'} onPress={this.sendMessage} />
      </>
    );
  }
}

export default Counter;
