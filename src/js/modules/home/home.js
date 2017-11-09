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
            justifyContent: 'center', alignItems: 'center' }]} >
                <Button style={{}}
                    title="Enter Access Token"
                    onPress={() => this.props.navigation.navigate('AddToken')} />
                <View style={{ height: 20, }}></View>
                <Button style={{ marginTop: 20, padding: 5 }}
                    title="Orders"
                    onPress={() => this.props.navigation.navigate('SearchInstrument')} />
            </View>
        );
    }
}