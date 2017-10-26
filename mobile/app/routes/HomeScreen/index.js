import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import MyProfile from "./../ProfileScreen/MyProfile.js";
import { DrawerNavigator } from "react-navigation";
// import MainScreenNavigator from "../ChatScreen/index.js";
import Profile from "../ProfileScreen/MyProfile.js";
import SideBar from "../../components/SideBar";
import Login from '../auth/Login'
// import LucyChat from "../ChatScreen/LucyChat.js";
const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Profile: { screen: Profile },
    login: { screen: Login }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);

// const HomeScreenRouter = () => {
//   return (
//     <HomeScreen/>
//   )
// };
export default HomeScreenRouter;
