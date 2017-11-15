import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
import Stylesheet from '../../../styles/Stylesheet';

export default class Home extends Component {

    render() {
        return (

            <View style={[Stylesheet.FlexOne, Stylesheet.YCenter, Stylesheet.XCenter, { flex: 1, 
            justifyContent: 'center', alignItems: 'center',backgroundColor:'#444' }]} >
                <Button style={{paddingHorizontal:5,}}
                    title="Enter Access Token"
                    color='#222'
                    onPress={() => this.props.navigation.navigate('AddToken')} />
                <View style={{ height: 20, }}></View>
                <Button style={{ marginTop: 20, padding: 5 }}
                    title="Orders"
                      color='#222'
                    onPress={() => this.props.navigation.navigate('SearchInstrument')} />
            </View>
        );
    }
}