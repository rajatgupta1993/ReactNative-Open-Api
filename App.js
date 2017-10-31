

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import RootNavigator from './src/js/modules/app/rootNavigator'
import Loader from './src/js/modules/loader'

export default class App extends Component {
  render() {
   
    return (
      <View style={{ flex: 1 }} >
        <RootNavigator/>
      
      </View>
    );
  }
}
