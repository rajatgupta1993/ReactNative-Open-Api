import { StackNavigator,DrawerNavigator } from 'react-navigation';
import Home from '../home/home';
import UserInfo from '../userInfo/index';
import TradeContainer from '../trade/tradeContainer';
import SearchInstrument from '../trade/index';
import OrderAndPosition from '../orderAndPosition';
import Test1 from '../../components/test1';
import Test2 from '../../components/test2';



const RootNavigator = StackNavigator({    

    Home: {
        screen: Home,
        navigationOptions: {
            headerTitle: 'Home Page',
            headerStyle: {
                backgroundColor: 'rgba(60,60,60,1)'
            },
            headerTitleStyle : {
                color:'#fff'
            },
        },
    },

    AddToken: {
        screen: UserInfo,
        navigationOptions: {
            headerTitle: 'Add Token',
            headerStyle: {
                backgroundColor: 'rgba(60,60,60,1)'
            },
            headerTitleStyle : {
                color:'#fff'
            },
        },
    },

    Orders : {
        screen : TradeContainer,
         navigationOptions: {
            headerTitle: 'Orders',
            headerStyle: {
                backgroundColor: 'rgba(60,60,60,1)'
            },
            headerTitleStyle : {
                color:'#fff'
            },
        },
    },

    SearchInstrument :{
        screen : SearchInstrument,
         navigationOptions: {
            headerTitle: 'Search Instrument',
            headerStyle: {
                backgroundColor: 'rgba(60,60,60,1)'
            },
            headerTitleStyle : {
                color:'#fff'
            },
        },
    },

     OrderAndPosition :{
        screen : OrderAndPosition,
         navigationOptions: {
            headerTitle: 'Order And Position',
            headerStyle: {
                backgroundColor: 'rgba(60,60,60,1)'
            },
            headerTitleStyle : {
                color:'#fff'
            },
        },
    },

   Drawer :drawerNavigator
},
{initialRouteName: 'Home',});

const drawerNavigator =DrawerNavigator({
    RootNavigator : {screen : RootNavigator},
   screen1: {
        screen : Test1
    },
   screen2: {
        screen : Test2
    }
},
{
    drawerPosition: 'right'
})

export default RootNavigator;