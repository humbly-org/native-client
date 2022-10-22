import React, {Component} from 'react';
import {Text} from 'react-native';
import {withHooksHOC} from '../utils';

interface IHooksHOCProps {
  state: number;
  setState: (state: number) => void;
}

class HooksHOC extends Component<IHooksHOCProps> {
  render() {
    return (
      <Text onPress={() => this.props.setState(this.props.state + 1)}>
        {this.props.state}
      </Text>
    );
  }
}

export default withHooksHOC(HooksHOC);
