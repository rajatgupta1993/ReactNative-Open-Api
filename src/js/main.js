import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import userInfoReducer from './modules/userInfo/reducer';

import RootNavigator from './modules/app/rootNavigator';

const reducer = combineReducers({
  userInfo: userInfoReducer
});

const store = createStore(reducer, applyMiddleware(thunk));
export default class Main extends Component {
  render() {
    return (
         <Provider store={store}>
             <RootNavigator/>
        </Provider>
    );
  }
}

