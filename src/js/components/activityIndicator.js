import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ActivityIndicator
} from 'react-native';
import Stylesheet from '../../styles/Stylesheet'
import PropTypes from 'prop-types';

export default function activityIndicator({animating,color,size}){

    return (
        <ActivityIndicator
                    animating={animating}
                    color={color}
                    size={size}
                    style={[Stylesheet.ActivityIndicator,Stylesheet.ScreenWidthHeight]}
                />
    )
}

activityIndicator.propTypes = {
    data: PropTypes.array,
};