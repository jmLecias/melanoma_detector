import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './src/screens/Home';
import Detect from './src/screens/Detect';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{title: 'Melanoma Detector'}}/>
        <Stack.Screen name="Detect" component={Detect} options={{title: 'Detect Melanoma'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
