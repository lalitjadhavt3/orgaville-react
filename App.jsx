import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import {StatusBar} from 'react-native';
import {ContextProvider} from './src/context/Context';
const App = () => {
  return (
    <ContextProvider>
      <NavigationContainer>
        <StatusBar
          animated={true}
          backgroundColor="transparent"
          barStyle={'dark-content'}
          translucent={true}
        />
        <StackNavigator />
      </NavigationContainer>
    </ContextProvider>
  );
};
export default App;
