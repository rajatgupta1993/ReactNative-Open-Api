import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import OrdersTab from './ordersTab';
import PositionTab from './positionTab';
import * as queries from './queries';
import Loader from './../loader/loader';

export default class OrderAndPosition extends Component {

  constructor(props) {
        super(props);
           console.log("props in order&position",props);
        this.state = {
            selectedAccount: null,    
        };
        this.tradeTypeId = "OrderId";
        this.handleAccountSelect=this.handleAccountSelect.bind(this);
    }

    componentDidMount() {
        queries.fetchAccountInfo(this.props, (response) => {
            this.setState({ accounts: queries.getAccountArray(response)});
            this.handleAccountSelect(this.state.accounts[0]);
        });
      
    }

       handleAccountSelect(account) {
        this.setState({ selectedAccount: account });
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ selectedAccount: nextProps.selectedAccount });
    }
  render() {
    console.log("states in O&P",this.state);
    const {selectedAccount, accounts} =this.state;
    return (
     (accounts && accounts.length>0)? (<Container>
       
        <Tabs initialPage={0}>
          <Tab heading="Orders">
            <OrdersTab  {...this.props}
                        currentAccountInformation={accounts[0]}
                        tradeType="Order"
                        fieldGroups={['DisplayAndFormat', 'ExchangeInfo']}/>
          </Tab>
          <Tab heading="Positions">
            <PositionTab {...this.props}
                        currentAccountInformation={accounts[0]}
                        tradeType="NetPosition"
                        fieldGroups={['NetPositionView',
                            'NetPositionBase',
                            'DisplayAndFormat',
                            'ExchangeInfo',
                            'SingleAndClosedPositionsBase',
                            'SingleAndClosedPositionsView',
                            'SingleAndClosedPositions'
                        ]}
            />
          </Tab>
        </Tabs>
      </Container>) : null
    );
  }
}