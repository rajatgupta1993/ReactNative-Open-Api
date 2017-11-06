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

import Stylesheet from '../../../styles/Stylesheet'
import PropTypes from 'prop-types';
import _ from 'lodash';

function instrumentRow(props) {
    const generateTable = (data) => _.map(data, (value, key) => {
        let assetType= (value.AssetType === "CfdOnStock")? "CFD" : value.AssetType;
        
            return (
                <View key ={key} style={Stylesheet.searchInstrumentRow}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                         <Text style= {Stylesheet.Text12BoldWhite} >{value.Description}</Text>
                          <Text style= {Stylesheet.searchInstrumentRowMinorText} >{assetType}</Text>
                    </View>
                    <View  style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style= {Stylesheet.searchInstrumentRowMinorText} >{value.Symbol}</Text>
                          <Text style= {Stylesheet.searchInstrumentRowMinorText} >{value.ExchangeName} </Text>
                    </View>
                   
                </View>   
            );
        
    });

    return (
        <View style={{ flex: 1 }} >
            {generateTable(props.data)}
        </View>
    );
}
instrumentRow.propTypes = {
    data: PropTypes.array,
};

export default instrumentRow;