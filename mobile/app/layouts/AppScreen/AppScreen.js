import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';

// import PathSelection from './../../routes/pathSelection/pathSelection.js';
import Login from './../../routes/auth/Login.js';
import ResetPassword from './../../routes/auth/ResetPassword.js';
import MainMenu from './../../routes/mainMenu'
import Profile from './../../routes/ProfileScreen/index'

const routeConfiguration = {
  // PathSelection: { screen: PathSelection },
  login: {
    screen: Login
  },
  reset: {
    screen: ResetPassword
  },
  menu: {
    screen: MainMenu
  },
  Profile: {
    screen: Profile
  }
}

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'login'
}

export const AppScreen = StackNavigator(routeConfiguration, stackNavigatorConfiguration)
