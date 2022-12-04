import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {CallbackStateFunctionType} from '../../utils';
import {StyledHeader} from '../../components/Header/Header';

interface IHooksHOCProps {
  state: number;
  setState: (callback: CallbackStateFunctionType) => void;
}

const styles = StyleSheet.create({
  backButton: {
    width: 66,
    height: 58,
    transform: [{rotate: '180deg'}],
  },
  text: {
    fontSize: 30,
    marginEnd: 10,
  },
});

class Header extends Component {
  render() {
    return (
      <StyledHeader>
        <TouchableOpacity>
          <Image
            style={styles.backButton}
            source={require('../../assets/arrow.png')}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Hospitais</Text>
      </StyledHeader>
    );
  }
}

export default Header;
