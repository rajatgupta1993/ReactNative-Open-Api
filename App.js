

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Stylesheet from './src/styles/Stylesheet';

import AppNavigator from './src/js/modules/app/rootNavigator'
import Loader from './src/js/modules/loader';

export default class App extends Component {
  render() {
   
    return (
      <View style={[Stylesheet.FlexOne, { flex: 1 }]} >
        <AppNavigator/>
      
      </View>
    );
  }
}
