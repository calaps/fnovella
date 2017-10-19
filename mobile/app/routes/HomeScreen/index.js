import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import MyProfile from "./../ProfileScreen/MyProfile.js";
// import MainScreenNavigator from "../ChatScreen/index.js";
import Profile from "../ProfileScreen/MyProfile.js";
// import SideBar from "../SideBar/SideBar.js";
// import LucyChat from "../ChatScreen/LucyChat.js";
import { DrawerNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Profile: { screen: MyProfile }
  },
//   {
//     contentComponent: props => <SideBar {...props} />
//   }
);
export default HomeScreenRouter;
