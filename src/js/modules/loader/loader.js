import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ActivityIndicator,
    TextInput,
} from 'react-native';
import classNames from 'classnames';
import { bool } from 'prop-types';
import defaultImg from '../../../resources/images/default.gif';

class Loader extends React.PureComponent {
    render() {
      //  const loaderClass = classNames({ 'loader': true, 'hide': !this.props.isLoading });
        return (
            <View style={{flex:1}} >

                <ActivityIndicator
                    animating={this.props.isLoading}
                    color='#bc2b78'
                    size="large"
                    style = {{flex: 1,justifyContent: 'center',alignItems: 'center',height: 80}}
                    />
            </View>
        );
    }
}

//Loader.propTypes = { isLoading: bool };

Loader.defaultProps = { isLoading: false };

export default Loader;
