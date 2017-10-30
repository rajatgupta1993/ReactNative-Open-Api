import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,   
} from 'react-native';

export default class Orders extends Component{

    render(){

        return(
            <View style={{ flex:1,justifyContent:'center', alignItems:'center' }}>
            <Text> THIS IS ORDER PAGE </Text>
            <Text> ORDER PAGE IS COMING SOON </Text>
            </View>
        );
    }
}