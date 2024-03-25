/* eslint-disable prettier/prettier */
import React from 'react';
import Main from './Main';
import Information from './Information';
import Navigation from './Navigation';
import Direction from './Direction';
import Barcode from './GenerateBarcode'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name={'Main'} component={Main} options={{headerShown: false}}/>
        <Stack.Screen name={'Information QR Code'} component={Information}/>
        <Stack.Screen name={'Navigation QR Code'} component={Navigation}/>
        <Stack.Screen name={'Direction QR Code'} component={Direction}/>
        <Stack.Screen name={'Generated QR Code'} component={Barcode}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
