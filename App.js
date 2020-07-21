import React from 'react';
import { Appearance, StatusBar } from 'react-native'
import Routes from './src/routes'

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
 
const light = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
    text: '#fff',
    primary: '#000',
    accent: '#69306D',
    surface: '#0E103D',
  }
}

const dark = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    background: '#131313',
    text: '#fff',
    primary: '#fff',
    accent: '#da7be0',
    surface: '#fff'
  }
}

const colorScheme = Appearance.getColorScheme()

export default function App() {

  return (
    <PaperProvider theme={colorScheme == 'dark' ? dark : light}>
      <StatusBar barStyle={colorScheme == 'dark' ? 'light-content' : 'dark-content'}  backgroundColor={'transparent'}/>
      <Routes />
    </PaperProvider>
  );
}
