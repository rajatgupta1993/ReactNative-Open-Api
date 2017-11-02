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

//import Stylesheet from '../../../styles/Stylesheet'
import PropTypes from 'prop-types';
import _ from 'lodash';

function DataTable(props) {
    const generateTable = (data) => _.map(data, (value, key) => {
        if (!_.isPlainObject(value)) {
            return (
                <View flexWrap={'wrap'}
                    style={{ flex: 1, flexDirection: 'row',  justifyContent:'space-between'}} key={key}>
                    <Text style={{ flex: 3.5, }}
                        numberOfLines={5}
                        flexWrap={'wrap'}
                        ellipsizeMode={'tail'}
                        overflow={'visible'}>{key}</Text>
                        <View style={{width:1, backgroundColor:'#567657',marginVertical:-20}}></View>
                        <View style={{flex:1}}/>
                    <Text style={{ flex: 5.5, }}
                        numberOfLines={5}
                        flexWrap={'wrap'}
                      
                        overflow={'visible'}
                    >{_.isArray(value) ? _.join(value, ', ') : `${value}`}</Text>
                </View>
            );
        }
    });

    return (
        <View style={{ flex: 1 }} >
            {generateTable(props.data)}
        </View>
    );
}
DataTable.propTypes = {
    data: PropTypes.object,
};

export default DataTable;