import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import MyProfile from "./../ProfileScreen/MyProfile.js";
import { DrawerNavigator,StackNavigator } from "react-navigation";
// import MainScreenNavigator from "../ChatScreen/index.js";
import Profile from "../ProfileScreen/MyProfile.js";
import SideBar from "../../components/SideBar";
import Login from '../auth/Login';
import AppScreen from '../../layouts/AppScreen/AppScreen';

const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Profile: { screen: Profile },
    login: { screen: Login }
  },{
    
    headerMode:'screen',
    contentComponent: props => <SideBar {...props} />
  }
  // { initialRoute : 'Home' }
);

// const HomeScreenRouter = () => {
//   return (
//     <HomeScreen/>
//   )
// };
export default HomeScreenRouter;
