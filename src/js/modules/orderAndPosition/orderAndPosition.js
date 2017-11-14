import React, { Component } from 'react';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import OrdersTab from './ordersTab';
import PositionTab from './positionTab';

export default class OrderAndPosition extends Component {

  constructor(props) {
        super(props);
           console.log("props in order&position",props);
        this.state = {
            selectedAccount: props.selectedAccount,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ selectedAccount: nextProps.selectedAccount });
    }
  render() {
    return (
      <Container>
       
        <Tabs initialPage={0}>
          <Tab heading="Orders">
            <OrdersTab  {...this.props}
                        currentAccountInformation={this.state.selectedAccount}
                        tradeType="Order"
                        fieldGroups={['DisplayAndFormat', 'ExchangeInfo']}/>
          </Tab>
          <Tab heading="Positions">
            <PositionTab />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}