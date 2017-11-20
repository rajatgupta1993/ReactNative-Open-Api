import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView
} from 'react-native';
import * as queries from './queries';
import Stylesheet from '../../../styles/Stylesheet';
import { TRADE_TYPE } from '../../utils/constants';
import {roundUptoNDecimals} from '../../utils/global';
import _ from 'lodash';

export default class PositionTab extends Component {
    constructor(props) {
         console.log("props in order tab",props);
        super(props);
        this.state = { tradeUpdated: false };
        this.trades = {};
        this.posTrades = {};
        this.tradeSubscription = {};
        this.currentAccountInformation = this.props.currentAccountInformation;
        this.tradeAccountSubscribed = this.currentAccountInformation.AccountId;
         this.tradeTypeId = "NetPositionId";
        this.positionDetails = {};
        this.posTradeSubscription = {};

        this.handleTradeUpdate=this.handleTradeUpdate.bind(this);
        this.handlePositionTradeUpdate=this.handlePositionTradeUpdate.bind(this);
    }

    // this function is for fetching subscription on first load.
    componentDidMount() {
        this.createTradeSubscription();
    }

    // this is for handling account reselection.
    componentWillReceiveProps(newProps) {
        this.currentAccountInformation = newProps.currentAccountInformation;
        if (this.tradeAccountSubscribed !== this.currentAccountInformation.AccountId) {
            this.createTradeSubscription();
        }
    }

    // subscriptions need to be destroyed while navigating away from pages.
    componentWillUnmount() {
        this.disposeSubscription();
    }

    createTradeSubscription() {
        this.disposeSubscription();
        const queryKey = {
            accountKey: this.currentAccountInformation.AccountKey,
            clientKey: this.currentAccountInformation.ClientKey,
        };

        if (this.props.tradeType === TRADE_TYPE.ORDER || this.props.tradeType === TRADE_TYPE.NETPOSITION) {
            queries.createSubscription(
                this.props,
                {
                    accountKey: queryKey.accountKey,
                    clientKey: queryKey.clientKey,
                    fieldGroups: this.props.fieldGroups,
                },
                this.props.tradeType,
                this.handleTradeUpdate,
                (tradeSubscription) => {
                    this.tradeSubscription = tradeSubscription;
                    this.tradeAccountSubscribed = this.currentAccountInformation.AccountId;
                }
            );
        }
        if (this.props.tradeType === TRADE_TYPE.NETPOSITION) {
            const params = {
                'props': this.props,
                'netPositionTradeType': this.props.tradeType,
                'positionTradeType': TRADE_TYPE.POSITION,
                'netPositionTradeCallBack': this.handleTradeUpdate,
                'positionCallBack': this.handlePositionTradeUpdate,
            };
            queries.createSubscriptionAll(
                {
                    accountKey: queryKey.accountKey,
                    clientKey: queryKey.clientKey,
                    fieldGroups: this.props.fieldGroups,
                },
                {
                    accountKey: queryKey.accountKey,
                    clientKey: queryKey.clientKey,
                    fieldGroups: ['DisplayAndFormat', 'PositionBase', 'PositionView'],
                },
                params,
                (tradeSubscription) => {
                    this.tradeSubscription = tradeSubscription;
                    this.tradeAccountSubscribed = this.currentAccountInformation.AccountId;
                },
                (posTradeSubscription) => {
                    this.posTradeSubscription = posTradeSubscription;
                }
            );
        }
    }

    handleTradeUpdate(response) {
        console.log("response from web socket ",response);
        this.trades = queries.getUpdatedTrades(this.trades, this.tradeTypeId, response.Data);
        this.setState({ tradeUpdated: !this.state.tradeUpdated });
    }

    handlePositionTradeUpdate(response) {
        this.posTrades = queries.getUpdatedTrades(this.posTrades, 'PositionId', response.Data);
        if (!_.isEmpty(this.posTrades)) {
            this.positionDetails = _.reduce(this.trades, (result, value) => {
                const NetPositionId = value.NetPositionId;
                const positions = [];
                const positionData = _.map(this.posTrades, (valuePostTrades) => {
                    if (NetPositionId === valuePostTrades.NetPositionId) {
                        positions.push(valuePostTrades);
                    }
                    return positionData;
                });
                result[NetPositionId] = positions;
                return result;
            }, {});
        }
        this.setState({ tradeUpdated: !this.state.tradeUpdated });
    }

    disposeSubscription() {
        if (!_.isEmpty(this.tradeSubscription)) {
            queries.unSubscribe(this.props, this.tradeSubscription, () => {
                this.trades = {};
                this.tradeSubscription = {};
            });
        }
    }

    render() {
        console.log('Trades in position Tab---', this.trades);
        console.log('Position Details in positions Tab---', this.positionDetails);
        return (
            <View style={[Stylesheet.FlexOne,{backgroundColor:'#444',}]} >
              {
                    !_.isEmpty(this.trades) &&
                       <View style={{backgroundColor:'#444'}}>

                            <View style={{flexDirection:'row',paddingHorizontal:15,paddingVertical:7, borderWidth:.5,borderColor:'#000'}}>
                                <View style={{flex:6}}>
                                    <Text style={Stylesheet.Text12BoldWhite}>Instrument</Text>
                                    <Text style={Stylesheet.searchInstrumentRowMinorText}>Description</Text>
                                </View>

                                 <View style={{flex:2}}>
                                    <Text style={Stylesheet.Text12BoldWhite}>P/L</Text>
                                    <Text style={Stylesheet.searchInstrumentRowMinorText}>P/L(EUR)</Text>
                                </View>

                                 <View style={{flex:2,alignItems:'flex-end',paddingRight:10}}>
                                    <Text style={Stylesheet.Text12BoldWhite}>Close Price</Text>
                                    <Text style={Stylesheet.searchInstrumentRowMinorText}>Open Price</Text>
                                </View>
                            </View>
                            <ScrollView>
                          {  _.map(this.trades,(value, key) =>{
                              console.log(value);

                              return (
                                value &&  <View key={key} style={{flexDirection:'row',paddingHorizontal:15,paddingVertical:7, borderBottomWidth:.5,borderBottomColor:'#000'}}>
                                    <View style={{flex:6}}>
                                        <Text style={Stylesheet.Text12BoldWhite}>{value.DisplayAndFormat.Description}</Text>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={Stylesheet.searchInstrumentRowMinorText}>{value.NetPositionBase.Amount}</Text>
                                            <Text style={Stylesheet.searchInstrumentRowMinorText}>{` ${value.NetPositionView.Status}`}</Text>
                                        </View>
                                    </View>
                                    

                                    <View style={{flex:2}}>
                                        <Text style={[Stylesheet.Text12BoldWhite, {color: value.NetPositionView.ProfitLossOnTrade > 0 ? 'green' : 'red'}]}>
                                            {roundUptoNDecimals(value.NetPositionView.ProfitLossOnTrade + value.NetPositionView.TradeCostsTotal,0)}
                                            {` ${value.DisplayAndFormat.Currency}`}
                                        </Text>
                                        <Text style={[Stylesheet.searchInstrumentRowMinorText, {color: value.NetPositionView.ProfitLossOnTradeInBaseCurrency > 0 ? 'green' : 'red'}]}>
                                            {roundUptoNDecimals(value.NetPositionView.ProfitLossOnTradeInBaseCurrency + value.NetPositionView.TradeCostsTotalInBaseCurrency,0)}
                                        </Text>
                                    </View>

                                    { value.SingleAndClosedPositions ? (value.SingleAndClosedPositions[0].PositionBase.Amount>0 ?
                                        <View style={{flex:2,alignItems:'flex-end',paddingRight:10}}>
                                            <Text style={Stylesheet.Text12BoldWhite}>
                                                {value.SingleAndClosedPositions[0].PositionView ? 
                                                    value.SingleAndClosedPositions[0].PositionView.CurrentPrice : ''
                                                }
                                            </Text>
                                            <Text style={Stylesheet.searchInstrumentRowMinorText}>
                                                {value.SingleAndClosedPositions[0].PositionBase ? 
                                                    value.SingleAndClosedPositions[0].PositionBase.OpenPrice: ''}
                                            </Text>
                                        </View> : 
                                        value.SingleAndClosedPositions[1] &&
                                        <View style={{flex:2,alignItems:'flex-end',paddingRight:10}}>
                                            <Text style={Stylesheet.Text12BoldWhite}>
                                                {value.SingleAndClosedPositions[1].PositionView ? 
                                                    value.SingleAndClosedPositions[1].PositionView.CurrentPrice: ''}
                                            </Text>
                                            <Text style={Stylesheet.searchInstrumentRowMinorText}>
                                                {value.SingleAndClosedPositions[1].PositionBase ? 
                                                    value.SingleAndClosedPositions[1].PositionBase.OpenPrice : ''}
                                            </Text>
                                        </View>
                                    ) :
                                    <View style={{flex:2,alignItems:'flex-end',paddingRight:10}}>
                                            <Text style={Stylesheet.Text12BoldWhite}>
                                                {value.NetPositionView.CurrentPrice}
                                            </Text>
                                            <Text style={Stylesheet.searchInstrumentRowMinorText}>
                                                {value.NetPositionBase.OpenPrice}
                                            </Text>
                                        </View>
                                    }
                            </View>
                              )

                          })}
                          </ScrollView>

                        </View>
                }
            </View>
        );
    }
}