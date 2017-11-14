import { StackNavigator } from 'react-navigation';
import Home from '../home/home';
import UserInfo from '../userInfo/index';
import TradeContainer from '../trade/tradeContainer';
import SearchInstrument from '../trade/index';
import OrderAndPosition from '../orderAndPosition';


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
        screen : TradeContainer,
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

     OrderAndPosition :{
        screen : OrderAndPosition,
         navigationOptions: {
            headerTitle: 'Order And Position',
        },
    },

   
});

export default RootNavigator;