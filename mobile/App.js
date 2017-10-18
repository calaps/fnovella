import React, {Component} from 'react';
import AppRoute from './app/index.js';
import { Provider } from 'react-redux';

import configureStore from './app/store/configureStore';
import initialState from './app/store/initialState';

const store = configureStore(initialState);

export default class App extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (<Provider store={store}>
      <AppRoute />
    </Provider>);
  }
}
