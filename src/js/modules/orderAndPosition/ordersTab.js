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
import _ from 'lodash';

export default class OrdersTab extends Component {
     constructor(props) {
         console.log("props in order tab",props);
        super(props);
        this.state = { tradeUpdated: false };
        this.trades = {};
        this.posTrades = {};
        this.tradeSubscription = {};
        this.currentAccountInformation = this.props.currentAccountInformation;
        this.tradeAccountSubscribed = this.currentAccountInformation.AccountId;
         this.tradeTypeId = "OrderId";
        this.positionDetails = {};
        this.posTradeSubscription = {};

        this.handleTradeUpdate=this.handleTradeUpdate.bind(this);
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
    }

    handleTradeUpdate(response) {
        console.log("response from web socket ",response);
        this.trades = queries.getUpdatedTrades(this.trades, this.tradeTypeId, response.Data);
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

        console.log("data in orders tab",this.trades);
        return (

            <View style={[Stylesheet.FlexOne,{backgroundColor:'#444',}]} >
              {
                    !_.isEmpty(this.trades) &&
                       <View style={{backgroundColor:'#444'}}>

                            <View style={{flexDirection:'row',paddingHorizontal:15,paddingVertical:7, borderWidth:.5,borderColor:'#000'}}>
                                <View style={{flex:6}}>
                                    <Text style={Stylesheet.Text12BoldWhite}>Instrument</Text>
                                    <Text style={Stylesheet.searchInstrumentRowMinorText}>Buy/Sell - Type</Text>
                                </View>

                                 <View style={{flex:2}}>
                                    <Text style={Stylesheet.Text12BoldWhite}>Amount</Text>
                                    <Text style={Stylesheet.searchInstrumentRowMinorText}>Price</Text>
                                </View>

                                 <View style={{flex:2,alignItems:'flex-end',paddingRight:10}}>
                                    <Text style={Stylesheet.Text12BoldWhite}>Stop</Text>
                                    <Text style={Stylesheet.searchInstrumentRowMinorText}>Limit</Text>
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
                                            <Text style={Stylesheet.searchInstrumentRowMinorText}>{value.BuySell}</Text>
                                            <Text style={Stylesheet.searchInstrumentRowMinorText}>{` - ${value.OpenOrderType}`}</Text>
                                        </View>
                                    </View>

                                    <View style={{flex:2}}>
                                        <Text style={Stylesheet.Text12BoldWhite}>{value.Amount}</Text>
                                        <Text style={Stylesheet.searchInstrumentRowMinorText}>{value.Price?value.Price : "-"}</Text>
                                    </View>

                                    <View style={{flex:2,alignItems:'flex-end',paddingRight:10}}>
                                        <Text style={Stylesheet.Text12BoldWhite}>Stop</Text>
                                        <Text style={Stylesheet.searchInstrumentRowMinorText}>Limit</Text>
                                    </View>
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