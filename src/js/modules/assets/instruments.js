import React from 'react';
import { Platform, StyleSheet, Text, View, Button, } from 'react-native';
import { func, array } from 'prop-types';
import * as allAssetTypes from '../../data/allAssetTypes.json';
import { checkIfOption } from '../../utils/global';
import Dropdown from '../../components/dropdown';
import { fetchInstruments, fetchInstrumentDetails } from './queries';
import Stylesheet from '../../../styles/Stylesheet'

class Instruments extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            optionRoot: null,
            assetTypeTitle: 'Select AssetType',
            title: '',
            instruments: null,
            dropDownTitle:''
        };
    }

    handleAssetTypeSelection(eventKey, index) {
        // notify if any UI component using it and want to listen to asset change
        if (index != 0) {
            const { onAssetTypeSelected } = this.props;
            if (onAssetTypeSelected) {
                onAssetTypeSelected(eventKey);
            }

            this.setState({ assetTypeTitle: eventKey });
            if (checkIfOption(eventKey)) {
                this.setState({ dropDownTitle: 'Select OptionRoot' });
            } else {
                this.setState({ dropDownTitle: 'Select Instrument' });
            }
            fetchInstruments(eventKey, this.props, (response) => {
                console.log("Instruments on selecting Asset Type", response.Data);
                this.setState({ instruments: response.Data });
            });
        }
    }

    handleInstrumentSelection(instrument, index) {
        /* checkIfOption
           true  : simply update state to render option component.
           false : get instrument details.
        */
        const { onOptionRootSelected, onInstrumentSelected } = this.props;
        if (checkIfOption(instrument.AssetType)) {
            onOptionRootSelected(instrument);
        } else {
            fetchInstrumentDetails(this.state.instruments[index], this.props, (response) => {
                onInstrumentSelected(response);
            });
        }
        this.setState({ title: instrument });
    }

    render() {
        const { assetTypes } = this.props;
        const { assetTypeTitle, instruments, title, dropDownTitle } = this.state;
        return (
            <View>
                <View style={[Stylesheet.BoxUnderline, Stylesheet.XCenter, Stylesheet.YCenter,
                             {height:40, padding:0,paddingHorizontal:20,flexDirection: 'row',backgroundColor:'#000' }]}>
                    <Text style={[Stylesheet.Text12BoldWhite,{ flex: 1 }]}>Select Asset Type </Text>
                    <Dropdown
                        data={assetTypes || allAssetTypes.data}
                        title={assetTypeTitle}
                        promptHeading="Select Asset Type"
                        id="assetTypes"
                        handleSelect={this.handleAssetTypeSelection.bind(this)}

                    />
                </View>
                {
                    (instruments) && (instruments.length !== 0) &&
                    <View style={[Stylesheet.BoxUnderline, Stylesheet.XCenter, Stylesheet.YCenter,
                                { height:40,padding:0,paddingHorizontal:20,flexDirection: 'row',marginTop:5,backgroundColor:'#000'}]}>
                        <Text style={[Stylesheet.Text12BoldWhite,{ flex: 1 }]}>{dropDownTitle} </Text>
                        <Dropdown
                            data={instruments}
                            itemKey="Symbol"
                            value="Description"
                            id="instruments"
                            title={title}
                            promptHeading={title}
                            handleSelect={this.handleInstrumentSelection.bind(this)}
                        />
                    </View>
                }
                {this.props.children}
            </View>
        );
    }
}

Instruments.propTypes = {
    onInstrumentSelected: func.isRequired,
    onAssetTypeSelected: func,
    onOptionRootSelected: func,
    assetTypes: array,
};

//export default bindHandlers(Instruments);
export default Instruments;
