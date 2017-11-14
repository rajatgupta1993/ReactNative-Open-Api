import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
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
        this.tradeTypeId = `${this.props.tradeType}Id`;
        this.positionDetails = {};
        this.posTradeSubscription = {};
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
        return (

            <View style={[Stylesheet.FlexOne, Stylesheet.YCenter, Stylesheet.XCenter, { flex: 1, 
            justifyContent: 'center', alignItems: 'center' }]} >
               <Text> Orders Tab </Text>
            </View>
        );
    }
}