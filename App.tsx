import {Button, Text, NativeBaseProvider, Column} from 'native-base';
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {SocketStore} from './src/stores/SocketStore';
import Feather from 'react-native-vector-icons/Feather';
import {Provider} from 'mobx-react';
import Toast, {ToastShowParams} from 'react-native-toast-message';
import Header from './src/containers/Header/Header';
import HospitalList from './src/containers/HospitalList';
import {RootStore} from './src/stores/RootStore';

// import Counter from './src/containers/counter/Counter';
export default class App extends React.Component {
  rootStore: RootStore;
  constructor(props: any) {
    super(props);
    this.rootStore = new RootStore();
  }

  toastConfig = {
    success: ({text1, text2, ...rest}: ToastShowParams) => (
      <View
        style={{
          margin: 4,
          padding: 10,
          borderRadius: 8,
          width: '90%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: '#17C964',
        }}>
        <Feather
          name={'check-circle'}
          color={'white'}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginRight: 6,
          }}
          size={32}
        />
        <View>
          <Text color={'white'} bold fontSize={'xl'}>
            {text1}
          </Text>
          <Text color={'white'} fontSize={'xs'}>
            {text2}
          </Text>
        </View>
      </View>
    ),
    info: ({text1, text2, ...rest}: ToastShowParams) => (
      <View
        style={{
          margin: 4,
          padding: 10,
          borderRadius: 8,
          width: '90%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: '#F5A524',
        }}>
        <Feather
          name={'message-circle'}
          color={'white'}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginRight: 6,
          }}
          size={32}
        />
        <View>
          <Text color={'white'} bold fontSize={'xl'}>
            {text1}
          </Text>
          <Text color={'white'} fontSize={'xs'}>
            {text2}
          </Text>
        </View>
      </View>
    ),
    error: ({text1, text2, ...rest}: ToastShowParams) => (
      <View
        style={{
          margin: 4,
          padding: 10,
          borderRadius: 8,
          width: '90%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: '#F31260',
        }}>
        <Feather
          name={'message-circle'}
          color={'white'}
          style={{
            marginRight: 6,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
          size={32}
        />
        <View>
          <Text color={'white'} bold fontSize={'xl'}>
            {text1}
          </Text>
          <Text color={'white'} fontSize={'xs'}>
            {text2}
          </Text>
        </View>
      </View>
    ),
  };

  render() {
    return (
      <Provider store={this.rootStore}>
        <NativeBaseProvider>
          <SafeAreaView>
            <Header />
            <HospitalList />
          </SafeAreaView>
          <Toast config={this.toastConfig} />
        </NativeBaseProvider>
      </Provider>
    );
  }
}
