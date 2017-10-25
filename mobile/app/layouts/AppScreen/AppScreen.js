import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {View} from 'react-native';
// import PathSelection from './../../routes/pathSelection/pathSelection.js';
import Login from './../../routes/auth/Login';
// import CardSection from "../../components/CardSection";
import Spinner from "../../components/Spinner"
import Loader from "../../components/loader/loader"
import ResetPassword from './../../routes/auth/ResetPassword.js';
import MainMenu from './../../routes/mainMenu'
import Profile from './../../routes/ProfileScreen/index'

var authToken;
var initialRoute;
async function getToken(){
  var value = await AsyncStorage.getItem('@Axle:token').then((gettoken)=>{
      authToken= gettoken;
  });
}
if(authToken){
  initialRoute = 'menu'
}else {
  initialRoute = 'login'
}
console.log(initialRoute)
const routeConfiguration = {
  // PathSelection: { screen: PathSelection },
  login: {
    screen: Login,
    navigationOptions: {
      gesturesEnabled: false
    }
  },
  reset: {
    screen: ResetPassword
  },
  menu: {
    screen: MainMenu,
  },
  Profile: {
    screen: Profile
  }
}

// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
    initialRouteName: 'menu'
}

export const AppScreen = StackNavigator(routeConfiguration, stackNavigatorConfiguration);