import {Center, NativeBaseProvider} from 'native-base';
import React from 'react';
import {SafeAreaView} from 'react-native';

import Counter from './src/containers/counter/Counter';

export default class App extends React.Component {
  render() {
    return (
      <NativeBaseProvider>
        <SafeAreaView>
          <Center height={'100%'}>
            <Counter />
          </Center>
        </SafeAreaView>
      </NativeBaseProvider>
    );
  }
}
