import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';

import Stylesheet from '../../../styles/Stylesheet';
import PropTypes from 'prop-types';
import _ from 'lodash';


function instrumentRow(props) {
    const generateTable = (data) => _.map(data, (value, key) => {
        let assetType= (value.AssetType === "CfdOnStock")? "CFD" : value.AssetType;
        let object = {instrument: value,...props};
        // console.log('object', object);
        // console.log("props in intrument row",props)
            return (
                <TouchableOpacity key ={key} style={Stylesheet.searchInstrumentRow}
                        onPress={() => props.navigation.navigate('Orders',{...object})}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                         <Text style= {Stylesheet.Text12BoldWhite} >{value.Description}</Text>
                          <Text style= {Stylesheet.searchInstrumentRowMinorText} >{assetType}</Text>
                    </View>
                    <View  style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style= {Stylesheet.searchInstrumentRowMinorText} >{value.Symbol}</Text>
                          <Text style= {Stylesheet.searchInstrumentRowMinorText} >{value.ExchangeName} </Text>
                    </View>
                   
                </TouchableOpacity>   
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