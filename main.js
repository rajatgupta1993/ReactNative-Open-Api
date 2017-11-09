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
import userInfoReducer from './src/js/modules/userInfo/reducer';
import errorReducer from './src/js/modules/error/reducer';
import loaderReducer from './src/js/modules/loader/reducer';

import Loader from './src/js/modules/loader/index';
import RootNavigator from './src/js/modules/app/rootNavigator';
import App from './App'

const reducer = combineReducers({
  userInfo: userInfoReducer,
  error: errorReducer,
  loader: loaderReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));
export default class Main extends Component {
  render() {
    console.log('Mterwa');
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    );
  }
}

