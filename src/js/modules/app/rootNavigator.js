import React from 'react';
import { StackNavigator,DrawerNavigator } from 'react-navigation';
import { Dimensions } from 'react-native';
import Home from '../home/home';
import UserInfo from '../userInfo/index';
import TradeContainer from '../trade/tradeContainer';
import SearchInstrument from '../trade/index';
import OrderAndPosition from '../orderAndPosition';
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

const addToken = StackNavigator({
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


const orderAndPosition = StackNavigator({
     OrderAndPosition : {
        screen : OrderAndPosition,
         navigationOptions: ({ navigation }) => ({
            headerTitle: 'Order & Position',
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

     SearchInstrument :{
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

     TradeScreen : {
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
 
const mainDrawerRoutes ={
    Home: {
        screen:home
    },
    AddToken: {
        screen : addToken
    },
   Trade: {
        screen : searchInstrument
    },
    OrderAndPosition :{
        screen : orderAndPosition
    }
}

export const AppNavigator = DrawerNavigator({...mainDrawerRoutes}, {
  drawerPosition :'right',
  drawerWidth: 0.7*width,
});
  export default AppNavigator;