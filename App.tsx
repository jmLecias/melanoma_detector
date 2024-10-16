import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { DetectProvider } from './src/hooks/useDetect';

import Tabs from './src/components/Tabs';

function App() {
  return (
    <NavigationContainer>
      <DetectProvider>
        <Tabs />
      </DetectProvider>
    </NavigationContainer>
  );
}

export default App;
