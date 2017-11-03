import React from 'react';
import { Platform, StyleSheet, Text, View, Button, } from 'react-native';
import * as queries from './queries';
import { object } from 'prop-types';
import Error from '../error';
import Instruments from '../assets/instruments';
import Options from '../assets/options';
import Dropdown from '../../components/dropdown';
import { checkIfOption } from '../../utils/global';
import ActivityIndicator from '../../components/activityIndicator'
import Stylesheet from '../../../styles/Stylesheet'
//var BUTTONS = ["Option 0", "Option 1", "Option 2", "Option 0", "Option 1", "Option 2", "Option 0", "Option 1", "Option 2", "Option 0", "Option 1", "Option 2", "Delete", "Cancel"];


class Orders extends React.PureComponent {
    constructor() {
        super();

        // currentOrder contains minimum required parameters for placing an order
        this.currentOrder = {
            // default values on UI.
            Uic: '',
            AssetType: '',
            OrderType: 'Market',
            OrderPrice: 0.0,
            OrderDuration: { DurationType: 'DayOrder' },
            Amount: 0,
            AccountKey: '',
            BuySell: 'Buy',

            /* possible order relations
               IfDoneMaster   -   If Done Orders is a combination of an entry order and conditional orders
                                  If the order is filled, then a (slave) stop loss, limit or trailing stop
                                  will automatically be attached to the new open position
               IfDoneSlave    -   If Done Orders is a combination of an entry order and conditional orders
                                  If the order is filled, then a (slave) stop loss, limit or trailing stop
                                  will automatically be attached to the new open position
               IfDoneSlaveOco -   Slave order with OCO. See OCO.
               Oco            -   One-Cancels-the-Other Order (OCO). A pair of orders stipulating that if
                                    one order is executed, then the other order is automatically canceled
               StandAlone     -   No relation to other order
            */
            OrderRelation: 'StandAlone',
            ToOpenClose: 'ToOpen',
            Orders: [],

            // currently sample works for StandAlone orders only. Work to be done for other OrderRelations
        };

        this.takeProfitPrice = 0.0;
        this.stopLossPrice = 0.0;
        this.stopLossOrderType = 'StopLimit';

        this.state = {
            updated: false,
            responseData: {},
            selectedOptionSpace: null,
            selectedAccount: null,
            accounts: [],
            instrumentInfo: null,
            supportedOrderTypes: [],
            takeProfitOpen: false,
            stopLossOpen: false,
            optionRoot: null,
        };
    }

    componentDidMount() {
        queries.fetchAccountInfo(this.props, (response) => {
            this.setState({ accounts: queries.getAccountArray(response) });
        });
    }

    handleInstrumentChange(instrument) {
        queries.fetchInfoPrices(instrument, this.props, (response) => {
            this.currentOrder.Amount = response.Quote.Amount;
            this.currentOrder.Uic = response.Uic;
            this.currentOrder.AssetType = response.AssetType;
            this.currentOrder.OrderPrice = response.Quote.Ask ? response.Quote.Ask : 0.0;
            this.currentOrder.OrderType = instrument.SupportedOrderTypes[0];
            this.setState({
                supportedOrderTypes: instrument.SupportedOrderTypes,
                instrumentInfo: response,
            });
        });
    }

    handleAssetTypeChange(assetType) {
        if (!checkIfOption(assetType)) {
            this.setState({ optionRoot: null });
        }
    }

    handleOptionRoot(optionRoot) {
        this.setState({ optionRoot });
    }

    handleAccountSelect(account) {
        this.currentOrder.AccountKey = account.AccountKey;
        this.setState({ selectedAccount: account });
    }

    handleValueChange(event) {
        const updatedValues = queries.getUpdatedValues(event, {
            currentOrder: this.currentOrder,
            takeProfitPrice: this.takeProfitPrice,
            stopLossPrice: this.stopLossPrice,
            stopLossOrderType: this.stopLossOrderType,
        }, this.Ask, this.Bid);
        this.currentOrder = updatedValues.currentOrder;
        this.takeProfitPrice = updatedValues.takeProfitPrice;
        this.stopLossPrice = updatedValues.stopLossPrice;
        this.stopLossOrderType = updatedValues.stopLossOrderType;

        this.setState({ updated: !this.state.updated });
    }

    handleProfitBtnClick() {
        this.setState({ takeProfitOpen: !this.state.takeProfitOpen });
    }

    handleLossBtnClick() {
        this.setState({ stopLossOpen: !this.state.stopLossOpen });
    }

    handlePlaceOrder() {
        this.currentOrder.Orders = [];
        if (this.state.takeProfitOpen) {
            // Setup related order
            const order = queries.getRelatedOrder('Limit', this.takeProfitPrice, this.currentOrder);
            this.currentOrder.Orders.push(order);
        }
        if (this.state.stopLossOpen) {
            // Setup another related order
            const order = queries.getRelatedOrder(this.stopLossOrderType, this.stopLossPrice, this.currentOrder);
            order.StopLimitPrice = this.stopLossPrice;
            this.currentOrder.Orders.push(order);
        }
        queries.postOrder(this.currentOrder, this.props, (response) => {
            this.setState({ responseData: response });
        });
    }

    render() {
        console.log('props in Order', this.props);
        console.log('States in Order', this.state);
        const accountTitle = this.state.selectedAccount ? this.state.selectedAccount.AccountId : 'Select Account';
        return (
            <View style={[Stylesheet.FlexOne, Stylesheet.BlackBg,Stylesheet.AppPaddingX,Stylesheet.AppPaddingTop]}>

                <Error>
                    Enter correct access token using
                 </Error>
                {(this.props.isLoading) && (<ActivityIndicator
                    animating={true}
                    color='#4c4cff'
                    size="large"
                />)}
                <Instruments
                    {...this.props}
                    onInstrumentSelected={this.handleInstrumentChange.bind(this)}
                    onOptionRootSelected={this.handleOptionRoot.bind(this)}
                    onAssetTypeSelected={this.handleAssetTypeChange.bind(this)}
                >

                    {/* select account dropdown*/}
                    <View style={[Stylesheet.BoxUnderline,Stylesheet.XCenter,Stylesheet.YCenter,
                                 { flexDirection: 'row',height:40,padding:0,paddingHorizontal:20,marginTop:5,backgroundColor:'#000' }]}>
                        <Text style={[Stylesheet.Text12BoldWhite,{ flex: 1 }]}>Select Account </Text>
                        <Dropdown
                            promptHeading={accountTitle}
                            handleSelect={this.handleAccountSelect.bind(this)}
                            data={this.state.accounts}
                            itemKey="AccountId"
                            value="AccountId"
                            id="accounts"
                        />
                    </View>
                </Instruments>  

            </View>
        );
    }
}

Orders.propTypes = { match: object };

Orders.defaultProps = { match: {} };

//export default bindHandlers(Orders);
export default Orders