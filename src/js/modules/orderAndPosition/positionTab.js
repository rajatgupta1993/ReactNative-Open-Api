import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
import Stylesheet from '../../../styles/Stylesheet';

export default class PositionTab extends Component {

    render() {
        return (

            <View style={[Stylesheet.FlexOne, Stylesheet.YCenter, Stylesheet.XCenter, { flex: 1, 
            justifyContent: 'center', alignItems: 'center' }]} >
               <Text> Position Tab </Text>
            </View>
        );
    }
}