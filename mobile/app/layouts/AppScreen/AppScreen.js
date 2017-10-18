import React , { Component } from 'react';
import { StackNavigator } from 'react-navigation';


import PathSelection from './../../routes/pathSelection/pathSelection.js';
import Login from './../../routes/register/login.js';

  const routeConfiguration = {
    PathSelection: { screen: PathSelection },
    Login: { screen: Login },
  }

// going to disable the header for now
  const stackNavigatorConfiguration = {
    headerMode: 'none',
    initialRouteName: 'PathSelection'
  }

  export const AppScreen = StackNavigator(routeConfiguration,stackNavigatorConfiguration)
