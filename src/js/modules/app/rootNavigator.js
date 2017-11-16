import React from 'react';
import { StackNavigator,DrawerNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';
import Home from '../home/home';
import UserInfo from '../userInfo/index';
import TradeContainer from '../trade/tradeContainer';
import SearchInstrument from '../trade/index';
import OrderAndPosition from '../orderAndPosition';
import Test1 from '../../components/test1';
import Test2 from '../../components/test2';
import { Icon, } from 'native-base';
const { width, height } = Dimensions.get('window');


const home = StackNavigator({
     Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'Home Page',
            headerRight: <Icon name="menu" size={35}
                                style={{padding:10,color:'white'}}
                               onPress={ () => navigation.navigate('DrawerOpen') } />,
            headerStyle: {
                backgroundColor: 'rgba(60,60,60,1)'
            },
            headerTitleStyle : {
                color:'#fff'
            },
         
        }),
    },
});

const AddToken = StackNavigator({
       AddToken: {
        screen: UserInfo,
          navigationOptions: ({ navigation }) => ({
            headerTitle: 'Add Token',
            headerRight: <Icon name="menu" size={35}
                                style={{padding:10,color:'white'}}
                               onPress={ () => navigation.navigate('DrawerOpen') } />,
            headerStyle: {
                backgroundColor: 'rgba(60,60,60,1)'
            },
            headerTitleStyle : {
                color:'#fff'
            },
         
        }),
    },
});


const Trade = StackNavigator({
     Orders : {
        screen : TradeContainer,
         navigationOptions: ({ navigation }) => ({
            headerTitle: 'Trade',
            headerRight: <Icon name="menu" size={35}
                                style={{padding:10,color:'white'}}
                               onPress={ () => navigation.navigate('DrawerOpen') } />,
            headerStyle: {
                backgroundColor: 'rgba(60,60,60,1)'
            },
            headerTitleStyle : {
                color:'#fff'
            },
         
        }),
    },
});

const searchInstrument = StackNavigator({
     Orders : {
        screen : SearchInstrument,
         navigationOptions: ({ navigation }) => ({
            headerTitle: 'Search Instrument',
            headerRight: <Icon name="menu" size={35}
                                style={{padding:10,color:'white'}}
                               onPress={ () => navigation.navigate('DrawerOpen') } />,
            headerStyle: {
                backgroundColor: 'rgba(60,60,60,1)'
            },
            headerTitleStyle : {
                color:'#fff'
            },
         
        }),
    },
});

const RootNavigator = StackNavigator({    

    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            headerTitle: 'Home Page',
            headerRight: <Icon name="menu" size={35}
                                style={{padding:10,color:'white'}}
                               onPress={ () => navigation.navigate('DrawerOpen') } />,
            headerStyle: {
                backgroundColor: 'rgba(60,60,60,1)'
            },
            headerTitleStyle : {
                color:'#fff'
            },
         
        }),
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
},
);

const mainDrawerRoutes ={
    Home: {
        screen:home
    },
    AddToken: {
        screen : AddToken
    },
   SearchInstrument: {
        screen : searchInstrument
    }
}

export const AppNavigator = DrawerNavigator({...mainDrawerRoutes}, {
  drawerPosition :'right',
  drawerWidth: 0.7*width,
});
export default AppNavigator;