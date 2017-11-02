import { StackNavigator } from 'react-navigation';
import UserInfo from '../userInfo/index'
import Orders from '../orders/index'
import Home from '../home/home'

const RootNavigator = StackNavigator({

    Home: {
        screen: Home,
        navigationOptions: {
            headerTitle: 'Test Page',
        },
    },

    AddToken: {
        screen: UserInfo,
        navigationOptions: {
            headerTitle: 'Add Token',
        },
    },

    Orders : {
        screen : Orders,
         navigationOptions: {
            headerTitle: 'Orders',
        },
    }
});

export default RootNavigator;