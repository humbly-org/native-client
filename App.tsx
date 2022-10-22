import {Center, NativeBaseProvider} from 'native-base';
import React from 'react';
import {SafeAreaView, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import HooksHOC from './src/containers/hooksHOC';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={backgroundStyle}>
        <Center height={'100%'}>
          <HooksHOC />
        </Center>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default App;
