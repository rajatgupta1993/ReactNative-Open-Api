import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,   
} from 'react-native';

import Stylesheet from '../../../styles/Stylesheet' 

export default class AddToken extends Component{

    render(){
        return (
            <View style={[Stylesheet.YCenter, Stylesheet.XCenter, Stylesheet.FlexOne]}>
            <Text>This is screen 1 </Text>
            </View>
        )
    }
}