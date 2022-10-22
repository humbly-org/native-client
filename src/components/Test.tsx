import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Input} from './Input';
class Test extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Input />
        <Text style={styles.headerText}>Class Component</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#806B33',
  },
  headerText: {
    color: '#ffffff',
    fontSize: 20,
  },
});
export default Test;
