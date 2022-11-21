import {Center, NativeBaseProvider, View} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';
import Header from './src/containers/Header/Header';
import Hospital from './src/containers/Hospital/Hospital';

export default class App extends React.Component {
  render() {
    return (
      <NativeBaseProvider>
        <SafeAreaView>
          <Header />
          <Center height={'100%'}>
            <Hospital />
          </Center>
        </SafeAreaView>
      </NativeBaseProvider>
    );
  }
}
