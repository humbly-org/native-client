import React, {Component} from 'react';
import {Text, Button} from 'react-native';
import {CallbackStateFunctionType} from '../../utils';
import {counterHOC} from './CounterStates';

interface IHooksHOCProps {
  state: number;
  setState: (callback: CallbackStateFunctionType) => void;
}

class Counter extends Component<IHooksHOCProps> {
  render() {
    console.log(this.props.state);

    return (
      <>
        <Text>{this.props.state}</Text>
        <Button
          title={'add'}
          onPress={() => this.props.setState((prev: number) => prev + 1)}
        />
        <Button
          title={'subtract'}
          onPress={() => this.props.setState((prev: number) => prev - 1)}
        />
      </>
    );
  }
}

export default counterHOC(Counter);
