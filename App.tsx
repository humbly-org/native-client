import {NativeBaseProvider} from 'native-base';
import {SafeAreaView} from 'react-native';
import Counter from './src/containers/counter/Counter';
import React from 'react';
import {SocketStore} from './src/stores/SocketStore';
import {Provider} from 'mobx-react';

// import Counter from './src/containers/counter/Counter';

export default class App extends React.Component {
  store: SocketStore;
  constructor(props: any) {
    super(props);
    this.store = new SocketStore();
  }
  render() {
    return (
      <Provider store={this.store}>
        <NativeBaseProvider>
          <SafeAreaView>
            <Counter />
          </SafeAreaView>
        </NativeBaseProvider>
      </Provider>
    );
  }
}
