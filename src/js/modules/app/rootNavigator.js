import { StackNavigator } from 'react-navigation';
import UserInfo from '../userInfo/index';
import OrdersContainer from '../orders/ordersContainer';
import SearchInstrument from '../orders/index';
import Home from '../home/home';

const RootNavigator = StackNavigator({    

    Home: {
        screen: Home,
        navigationOptions: {
            headerTitle: 'Home Page',
        },
    },

    AddToken: {
        screen: UserInfo,
        navigationOptions: {
            headerTitle: 'Add Token',
        },
    },

    Orders : {
        screen : OrdersContainer,
         navigationOptions: {
            headerTitle: 'Orders',
        },
    },

    SearchInstrument :{
        screen : SearchInstrument,
         navigationOptions: {
            headerTitle: 'Search Instrument',
        },
    },

   
});

export default RootNavigator;