import React from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {ActionSheet, Root, } from 'native-base';
import Stylesheet from '../../../../styles/Stylesheet';
import PropTypes from 'prop-types';

function getSelectCtrl(props) {
    return (<Root>
        <View style={{ backgroundColor: '#888', flex: 1, }} id={props.label}>
            <TouchableOpacity
                onPress={() =>
                    ActionSheet.show(
                        {
                            options: props.options,
                            title: props.heading,
                        },
                        buttonIndex => props.onChange(buttonIndex)
                    )}>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={Stylesheet.Text12BoldBlack}>{props.label} </Text>
                    <Text style={[Stylesheet.Text12BoldWhite, { fontSize: 12 }]}>{props.value} </Text>
                </View>
            </TouchableOpacity>
        </View>
    </Root>)
}

function getTextCtrl(props) {
    return (
        <View style={{ backgroundColor: '#888', flex: 1, }}  >
            <Text style={Stylesheet.Text12BoldBlack}> {props.label} </Text>
            <TextInput placeholder={props.placeholder}
                keyboardType="numeric"
                placeholderTextColor="#fff"
                underlineColorAndroid="transparent"
                onChangeText={(text) => props.onChange(text)}
                value={props.value}
                style={{ color: '#fff', fontFamily: 'roboto', fontWeight: '600', height: 35, marginTop: -10, fontSize: 12 }} />
        </View>
    )
}

function userInput(props) {
    return (
        <View style={{ flex: 1,height:40,  backgroundColor: '#76545600' }} >
            {props.componentClass === 'select' ? getSelectCtrl(props) : getTextCtrl(props)}
        </View>
    );
}
userInput.propTypes = {
    data: PropTypes.array,
};

export default userInput;