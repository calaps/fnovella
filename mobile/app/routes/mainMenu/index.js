import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image} from 'react-native';
import { Card, Button } from 'react-native-material-design';
import { TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from "../HomeScreen";

//import HomeScreen from "./src/HomeScreen/index.js";
export default class MainMenu extends Component {
  constructor(props) {
     super(props);
   }

  // Nav options can be defined as a function of the screen's props:
  static navigationOptions = ({ navigation }) => ({
    //title: `Chat with ${navigation.state.params.user}`,
    header: null,
  });
  render() {
    const { navigate } = this.props.navigation;
    // The screen's current route is passed in to `props.navigation.state`:
    const { params } = this.props.navigation.state;
    return <HomeScreen />;
  }
}
