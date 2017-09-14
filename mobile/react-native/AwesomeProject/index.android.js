/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Button } from 'react-native-elements'

export default class AwesomeProject extends Component {
  render() {
    return (
      <View style={styles.container}>


      <View style={{
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        width: 300,
        height: 100}}>

        <Image source={require('./img/logo.png')}
        style={{
          scaleY:0.7,
          scaleX:0.7}}/>


        </View>

        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
