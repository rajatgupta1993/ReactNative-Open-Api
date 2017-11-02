import React from 'react';
import {Platform, StyleSheet, Text, View, Button,} from 'react-native';
import { func, array } from 'prop-types';
import * as allAssetTypes from '../../data/allAssetTypes.json';
import { checkIfOption } from '../../utils/global';
import Dropdown from '../../components/dropdown';
import { fetchInstruments, fetchInstrumentDetails } from './queries';

class Instruments extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            optionRoot: null,
            assetTypeTitle: 'Select AssetType',
            title: '',
            instruments: null,
        };
    }

    handleAssetTypeSelection(eventKey) {
        // notify if any UI component using it and want to listen to asset change
        const { onAssetTypeSelected } = this.props;
        if (onAssetTypeSelected) {
            onAssetTypeSelected(eventKey);
        }

        this.setState({ assetTypeTitle: eventKey });
        if (checkIfOption(eventKey)) {
            this.setState({ title: 'Select OptionRoot' });
        } else {
            this.setState({ title: 'Select Instrument' });
        }
        fetchInstruments(eventKey, this.props, (response) => {
            this.setState({ instruments: response.Data });
        });
    }

    handleInstrumentSelection(instrument) {
        /* checkIfOption
           true  : simply update state to render option component.
           false : get instrument details.
        */
        const { onOptionRootSelected, onInstrumentSelected } = this.props;
        if (checkIfOption(instrument.AssetType)) {
            onOptionRootSelected(instrument);
        } else {
            fetchInstrumentDetails(instrument, this.props, (response) => {
                onInstrumentSelected(response);
            });
        }
        this.setState({ title: instrument.Description });
    }

    render() {
        const { assetTypes } = this.props;
        const { assetTypeTitle, instruments, title } = this.state;
        return (
            <View>
                <Dropdown
                    data={assetTypes || allAssetTypes.data}
                    title={assetTypeTitle}
                    promptHeading="Select Asset Type"
                    id="assetTypes"
                    handleSelect={this.handleAssetTypeSelection.bind(this)}
                    
                />
                {
                    instruments &&
                    <Dropdown
                        data={instruments}
                        itemKey="Symbol"
                        value="Description"
                        id="instruments"
                        title={title}
                        handleSelect={this.handleInstrumentSelection.bind(this)}
                    />
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
