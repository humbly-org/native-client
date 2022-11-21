import {Center, NativeBaseProvider, View} from 'native-base';
import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Header from './src/containers/Header/Header';
import Hospital from './src/containers/Hospital/Hospital';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={backgroundStyle}>
        <Header />
        <Center height={'100%'}>
          <Hospital />
        </Center>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default App;
