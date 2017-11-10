import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, Alert, TouchableHighlight, Modal, TextInput, ScrollView, Dimensions, ToastAndroid } from 'react-native';
import { Container, Header, Item, Input, Icon, ActionSheet, Root, Button } from 'native-base';
import * as queries from './queries';
import { object } from 'prop-types';
import Error from '../error';
import Instruments from '../assets/instruments';
import Options from '../assets/options';
import Dropdown from '../../components/dropdown';
import UserInputs from './components/userInputs';
import { checkIfOption } from '../../utils/global';
import ActivityIndicator from '../../components/activityIndicator';
import Stylesheet from '../../../styles/Stylesheet';
import { fetchInstrumentDetails } from '../assets/queries';
//var BUTTONS = ["Option 0", "Option 1", "Option 2", "Option 0", "Option 1", "Option 2", "Option 0", "Option 1", "Option 2", "Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
let orderDuration = ['DayOrder', 'GoodTillCancel', 'ImmediateOrCancel'];
const { width, height } = Dimensions.get('window');

class Orders extends React.PureComponent {
    constructor(props) {
        super(props);
        console.log(props);
        this.actionSheet = null;
        //  const props=this.props.navigation.state.params;
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

        this.handleInstrumentSelection = this.handleInstrumentSelection.bind(this);
        this.handleInstrumentChange = this.handleInstrumentChange.bind(this);
        this.handleAssetTypeChange = this.handleAssetTypeChange.bind(this);
        this.handleOptionRoot = this.handleOptionRoot.bind(this);
        this.handleAccountSelect = this.handleAccountSelect.bind(this);
        this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
        this.roundUptoNDecimals = this.roundUptoNDecimals.bind(this);
        this.showAlert = this.showAlert.bind(this);
    }

    componentDidMount() {

        const { instrument } = this.props;
        queries.fetchAccountInfo(this.props, (response) => {
            this.setState({ accounts: queries.getAccountArray(response) });
            this.handleAccountSelect(this.state.accounts[0]);
        });

        this.handleInstrumentSelection(instrument);
    }

    handleInstrumentSelection(instrument) {
        /* checkIfOption
           true  : simply update state to render option component.
           false : get instrument details.
        */

        if (checkIfOption(instrument.AssetType)) {
            this.handleOptionRoot(instrument);
        } else {
            fetchInstrumentDetails(instrument, this.props, (response) => {
                this.handleInstrumentChange(response);
            });
        }
        // this.setState({ title: instrument.Description });
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
        this.setModalVisible = this.setModalVisible.bind(this);

        this.setState({ updated: !this.state.updated });
    }

    handleProfitBtnClick() {
        this.setState({ takeProfitOpen: !this.state.takeProfitOpen });
    }

    handleLossBtnClick() {
        this.setState({ stopLossOpen: !this.state.stopLossOpen });
    }

    handlePlaceOrder(BuySell) {
        this.currentOrder.Orders = [];
        console.log("*****", this.state);
        console.log("****CO***", this.currentOrder);
        this.currentOrder.BuySell = BuySell;
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
            ToastAndroid.show('Order placed !! ', ToastAndroid.SHORT);
        });
    }

    roundUptoNDecimals(num, decimal) {

        return Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal);
    }
    handleOrderDurationChange(buttonIndex) {
        this.currentOrder.OrderDuration.DurationType = orderDuration[buttonIndex];
        this.setState({
            updated: !this.state.updated

        });
    }

    handleOrderTypeChange(buttonIndex) {
        this.currentOrder.OrderType = this.state.supportedOrderTypes[buttonIndex];
        this.setState({ updated: !this.state.updated });
    }

    handleOrderPriceChange(text) {
        this.currentOrder.OrderPrice = text;
        this.setState({ updated: !this.state.updated });
    }

    handleOrderQuantityChange(text) {
        this.currentOrder.Amount = text;
        this.setState({ updated: !this.state.updated });
    }

    showAlert(BuySell) {
        Alert.alert(
            'ORDER CONFIRMATION',
            'Do you want to place your order? ',
            [

                { text: 'Cancel', onPress: () => console.log("Alert Closed") },
                { text: 'OK', onPress: () => this.handlePlaceOrder(BuySell) },
            ],

        );
    }

    render() {
        console.log('props in Order', this.props);
        console.log('States in Order', this.state);
        console.log('CurrentOrder in Order', this.currentOrder);
        const { instrument } = this.props;
        let assetType = (instrument && instrument.AssetType === "CfdOnStock") ? "CFD" : instrument.AssetType;
        const DisplayAndFormat = this.state.instrumentInfo ? this.state.instrumentInfo.DisplayAndFormat : null;
        const PriceInfo = this.state.instrumentInfo ? this.state.instrumentInfo.PriceInfo : null;
        const PriceInfoDetails = this.state.instrumentInfo ? this.state.instrumentInfo.PriceInfoDetails : null;
        const InstrumentPriceDetails = this.state.instrumentInfo ? this.state.instrumentInfo.InstrumentPriceDetails : null;
        const Quote = this.state.instrumentInfo ? this.state.instrumentInfo.Quote : null;
        const supportedOrderTypes = this.state.instrumentInfo ? this.state.instrumentInfo.Quote : null;
        const marketStatus = (InstrumentPriceDetails && InstrumentPriceDetails.IsMarketOpen) ? "Market Open" : "Market Closed"
        const netChangeColor = (PriceInfo && PriceInfo.NetChange > 0) ? 'green' : 'red'
        const accountTitle = this.state.selectedAccount ? this.state.selectedAccount.AccountId : 'Select Account';
        return (
            <ScrollView style={{ flex: 1, height: height, width: width }}>
                <View style={[Stylesheet.FlexOne, Stylesheet.AppPaddingX, Stylesheet.AppPaddingTop, { backgroundColor: '#444', height: height, width: width }]}>
                    <Root>
                        <Error>
                            Enter correct access token
                    </Error>
                        {(this.props.isLoading) && (<ActivityIndicator
                            animating={true}
                            color="#4c4cff"
                            size="large"
                        />)}

                        {/* select account dropdown*/}
                        <View style={[Stylesheet.BoxUnderline, Stylesheet.XCenter, Stylesheet.YCenter,
                        { flexDirection: 'row', height: 40, padding: 0, paddingHorizontal: 20, marginTop: 5, backgroundColor: '#000' }]}>
                            <Text style={[Stylesheet.Text12BoldWhite, { flex: 1 }]}>Select Account </Text>
                            <Dropdown
                                promptHeading={accountTitle}
                                handleSelect={this.handleAccountSelect.bind(this)}
                                data={this.state.accounts}
                                itemKey="AccountId"
                                value="AccountId"
                                id="accounts"
                            />
                        </View>

                        {/*1st row , Share name and market*/}
                        {(DisplayAndFormat) && <View style={[Stylesheet.searchInstrumentRow, { flexDirection: 'row', backgroundColor: '#000', marginTop: 2 }]}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={Stylesheet.Text12BoldWhite}>{DisplayAndFormat.Description}</Text>
                                    <Text style={Stylesheet.searchInstrumentRowMinorText}>{assetType}</Text>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={Stylesheet.searchInstrumentRowMinorText}>{DisplayAndFormat.Symbol}</Text>
                                    <Text style={Stylesheet.searchInstrumentRowMinorText}> . </Text>
                                    <Text style={Stylesheet.searchInstrumentRowMinorText}>{DisplayAndFormat.Currency}</Text>
                                </View>
                            </View>
                            <View>
                                <Icon name="md-search" />
                            </View>
                        </View>}


                        {/*Last Traded , Today's change Low/High*/}
                        {(PriceInfo && PriceInfoDetails) && <View style={[Stylesheet.searchInstrumentRow, {
                            flexDirection: 'row',
                            backgroundColor: '#000', marginTop: 2, justifyContent: 'space-between'
                        }]}>

                            <View style={[Stylesheet.XCenter, Stylesheet.YCenter]}>
                                <Text style={Stylesheet.Text12BoldWhite}>{PriceInfoDetails.LastTraded}</Text>
                                <Text style={Stylesheet.searchInstrumentRowMinorText}> Last Traded </Text>
                            </View>

                            <View style={[Stylesheet.XCenter, Stylesheet.YCenter]}>
                                <Text style={[Stylesheet.Text12BoldWhite, { color: netChangeColor }]}>{`${this.roundUptoNDecimals(PriceInfo.NetChange, DisplayAndFormat.Decimals)}/${PriceInfo.PercentChange}%`}</Text>
                                <Text style={Stylesheet.searchInstrumentRowMinorText}> Today's change </Text>
                            </View>

                            <View style={[Stylesheet.XCenter, Stylesheet.YCenter]}>
                                <Text style={Stylesheet.Text12BoldWhite}>{`${PriceInfo.Low}/${PriceInfo.High}`}</Text>
                                <Text style={Stylesheet.searchInstrumentRowMinorText}> Low / High </Text>
                            </View>


                        </View>}


                        {/*Market Status */}
                        {(InstrumentPriceDetails) && <View style={[Stylesheet.searchInstrumentRow, { flexDirection: 'row', backgroundColor: '#000', marginTop: 2 }]}>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Text style={Stylesheet.searchInstrumentRowMinorText}>{marketStatus}</Text>
                                <Text style={Stylesheet.searchInstrumentRowMinorText}>{this.state.instrumentInfo.PriceSource}</Text>
                            </View>

                        </View>}


                        {/*Bid & Ask size*/}
                        <View style={[Stylesheet.searchInstrumentRow, { flexDirection: 'row', backgroundColor: '#000', marginTop: 2, paddingVertical: 4 }]}>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginRight: 5 }}>
                                <Text style={Stylesheet.searchInstrumentRowMinorText}>Size</Text>
                                <Text style={Stylesheet.searchInstrumentRowMinorText}>Bid</Text>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5 }}>
                                <Text style={Stylesheet.searchInstrumentRowMinorText}>Ask</Text>
                                <Text style={Stylesheet.searchInstrumentRowMinorText}>Size</Text>
                            </View>

                        </View>

                        {(Quote && PriceInfoDetails) && <View style={[Stylesheet.searchInstrumentRow, { flexDirection: 'row', backgroundColor: '#000', marginTop: 1, paddingVertical: 4 }]}>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginRight: 5 }}>
                                <Text style={Stylesheet.Text12BoldWhite}>{PriceInfoDetails.BidSize}</Text>
                                <Text style={Stylesheet.Text12BoldWhite}>{this.roundUptoNDecimals(Quote.Bid, DisplayAndFormat.Decimals)}</Text>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 5 }}>
                                <Text style={Stylesheet.Text12BoldWhite}>{this.roundUptoNDecimals(Quote.Ask, DisplayAndFormat.Decimals)}</Text>
                                <Text style={Stylesheet.Text12BoldWhite}>{PriceInfoDetails.AskSize}</Text>
                            </View>

                        </View>}

                        {/*Type & Quantity*/}
                        {/*{(this.state.supportedOrderTypes.length !== 0) && <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ backgroundColor: '#888', flex: 1, marginRight: 5 }}>
                                <Container>
                                    <Root>
                                        <TouchableOpacity
                                            onPress={() =>
                                                ActionSheet.show(
                                                    {
                                                        options: this.state.supportedOrderTypes,
                                                        title: "Select Order Type",

                                                    },
                                                    buttonIndex => {
                                                        this.currentOrder.OrderType = this.state.supportedOrderTypes[buttonIndex];
                                                        this.setState({ updated: !this.state.updated });
                                                    }
                                                )}>
                                            <View style={{ paddingHorizontal: 10 }}>
                                                <Text style={Stylesheet.Text12BoldBlack}>TYPE </Text>
                                                <Text style={[Stylesheet.Text12BoldWhite, { fontSize: 12 }]}>{this.currentOrder.OrderType} </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </Root>
                                </Container>
                            </View>

                            <View style={{ backgroundColor: '#888', flex: 1, marginLeft: 5 }}>
                                <Text style={Stylesheet.Text12BoldBlack}> QUANTITY </Text>
                                <TextInput placeholder="Search"
                                    keyboardType="numeric"
                                    placeholderTextColor="#fff"
                                    underlineColorAndroid="transparent"
                                    onChangeText={(text) => {
                                        this.currentOrder.Amount = text;
                                        this.setState({ updated: !this.state.updated });
                                    }}
                                    value={this.currentOrder.Amount.toString()}
                                    style={{ color: '#fff', fontFamily: 'roboto', fontWeight: '600', height: 35, marginTop: -10, fontSize: 12 }} />
                            </View>


                        </View>}*/}

                        {/*Duration And price */}
                        {/*
                        {(PriceInfoDetails) && <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ backgroundColor: '#888', flex: 1, marginRight: 5 }}>

                                <Root>
                                    <TouchableOpacity
                                        onPress={() =>
                                            ActionSheet.show(
                                                {
                                                    options: orderDuration,
                                                    title: "Select Order Duration",

                                                },
                                                buttonIndex => {
                                                    this.currentOrder.OrderDuration.DurationType = orderDuration[buttonIndex];
                                                    this.setState({ updated: !this.state.updated });
                                                }
                                            )}>
                                        <View style={{ paddingHorizontal: 10 }}>
                                            <Text style={Stylesheet.Text12BoldBlack}>DURATION </Text>
                                            <Text style={[Stylesheet.Text12BoldWhite, { fontSize: 12 }]}>{this.currentOrder.OrderDuration.DurationType} </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Root>
                            </View>

                            <View style={{ backgroundColor: '#888', flex: 1, marginLeft: 5 }}>
                                <Text style={Stylesheet.Text12BoldBlack}> PRICE </Text>
                                <TextInput placeholder="Price"
                                    keyboardType="numeric"
                                    placeholderTextColor="#fff"
                                    underlineColorAndroid="transparent"
                                    onChangeText={(text) => {
                                        this.currentOrder.OrderPrice = text;
                                        this.setState({ updated: !this.state.updated });
                                    }}
                                    value={this.currentOrder.OrderPrice.toString()}
                                    style={{ color: '#fff', fontFamily: 'roboto', fontWeight: '600', height: 35, marginTop: -10, fontSize: 12 }} />
                            </View>


                        </View>}*/}

                        {(PriceInfoDetails) && <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <UserInputs
                                label='DURATION'
                                onChange={this.handleOrderDurationChange.bind(this)}
                                options={orderDuration}
                                componentClass='select'
                                value={this.currentOrder.OrderDuration.DurationType}
                                heading="Select Order Duration"
                            />

                            <View style={{width:10}}/>

                            <UserInputs
                                label='PRICE'
                                onChange={this.handleOrderPriceChange.bind(this)}
                                componentClass='text'
                                value={this.currentOrder.OrderPrice.toString()}
                                placeholder="enter price"
                            />


                        </View>}

                        {(this.state.supportedOrderTypes.length !== 0) && <View style={{ flexDirection: 'row', marginTop: 10,justifyContent:'space-between' }}>
                            <UserInputs options={this.state.supportedOrderTypes}
                                label='TYPE'
                                onChange={this.handleOrderTypeChange.bind(this)}
                                currentOrder={this.currentOrder}
                                componentClass='select'
                                value={this.currentOrder.OrderType}
                                heading="Select Order Type"
                            />
                            
                             <View style={{width:10}}/>

                            <UserInputs
                                label='QUANTITY'
                                onChange={this.handleOrderQuantityChange.bind(this)}
                                componentClass='text'
                                value={this.currentOrder.Amount.toString()}
                                placeholder="Enter Quantity"
                            />


                        </View>}



                        {/*BUY & SELL BUTTON*/}
                        <View style={{ width: width, height: 40, flexDirection: 'row', marginTop: 10, paddingRight: 40 }}>

                            <Button block light
                                style={{ flex: 1, backgroundColor: '#c30101', marginRight: 5, height: 30 }}
                                onPress={() => this.showAlert("sell")}>
                                <Text style={[Stylesheet.Text12BoldWhite, { fontSize: 12, fontWeight: '700' }]}>SELL</Text>
                            </Button>

                            <Button block light
                                style={{ flex: 1, backgroundColor: '#1E90FF', marginLeft: 5, height: 30 }}
                                onPress={() => this.showAlert("buy")}>
                                <Text style={[Stylesheet.Text12BoldWhite, { fontSize: 12, fontWeight: '700' }]} >BUY</Text>
                            </Button>

                        </View>
                    </Root>
                </View>
            </ScrollView >
        );
    }
}

Orders.propTypes = {
    match: object,
    instrument: object,
};

Orders.defaultProps = { match: {} };

//export default bindHandlers(Orders);
export default Orders;