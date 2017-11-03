import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';

export default class Home extends Component {

    constructor() {
        super();
        console.log("construc");
    }


    onButtonPressed() {
        console.log("5");
    }

    componentWillMount() {
        console.log("willMount");
    }

    componentDidMount() {
        console.log("didMount");
    }

    shouldComponentUpdate() {
        console.log("should");
        return true;
    }

    componentWillReceiveProps(){
        console.log("recv props");
    }

    componentWillUpdate(){
        console.log("willUpdate");
    }

    componentDidUpdate(){
        console.log("didUpdate");
    }

    componentWillUnmount(){
            console.log("WillUnMount");
    }



    render() {
        return (

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Button style={{}}
                    title="Enter Access Token"
                    onPress={() => this.props.navigation.navigate('AddToken')} />
                <View style={{ height: 20, }}></View>
                <Button style={{ marginTop: 20, padding: 5 }}
                    title="Orders"
                    onPress={() => this.props.navigation.navigate('Orders')} />
            </View>
        )
    }
}