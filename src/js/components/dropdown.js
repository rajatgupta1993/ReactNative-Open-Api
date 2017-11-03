import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    ActivityIndicator,
    Picker,
} from 'react-native';

import Stylesheet from '../../styles/Stylesheet'
import PropTypes from 'prop-types';
import _ from 'lodash';

function Dropdown({ data, title, id, itemKey, value, handleSelect,promptHeading }) {
    debugger;
    return (

        <Picker
            onValueChange={handleSelect}
            mode='dialog'
            prompt={promptHeading}
            selectedValue={title}
            style={{flex:1.5,}}
           
           >
            {_.map(data, (item) => (
                <Picker.Item label={itemKey ? item[itemKey] : item}
                             value={value ? item[value] : item}
                             key={id} />)
            )}
        </Picker>
    );
}

Dropdown.propTypes = {
    data: PropTypes.array,
};

export default Dropdown;