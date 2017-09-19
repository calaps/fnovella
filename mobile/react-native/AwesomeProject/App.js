import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image, StatusBar } from 'react-native';
import { Card, Button } from 'react-native-material-design';
import { TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import  pass_recover  from './src/pass_recover';
import  main_menu  from './main_menu';

export default class AwesomeProject extends React.Component {
  constructor(props) {
     super(props);
     this.state = { correo: 'Correo electronico' ,contrasena: 'Contrasena'   };
     this.object = {textColor:'#66BB6A'};
     this.boton_abajo = {textColor:'#FFFFFF'};
   }

  static navigationOptions = {
    //title: `Loggin`,
    header: null,
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
      <StatusBar
          backgroundColor="black"
          barStyle="light-content"
          />
      <View
        style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'}}>

        <View
                  style={{
                   flexDirection :'column-reverse',
                    position:'absolute',
                    backgroundColor:'transparent',
                    width:300,
                    height:480
                    }}
                  >

                    <View
                      style={{
                       flexDirection :'column-reverse',
                      position:'relative',
                      backgroundColor:'#66BB6A',
                      width:300,
                      height:200}}>
                    <Button
                    onPress={() => navigate('recover', { user: 'Lucy' })}
                      overrides={this.boton_abajo}
                     text='Ha olvidado su contrasena?'  />
                    </View>

                  </View>
        <Card
          elevation={7}
          style={{

            position:'absolute',
            margin:'auto',
            justifyContent: 'center',
            alignItems: 'center',
            width:280,
            height:370
            }}
          >
               <Card.Body>

            <Image
            style={{
            transform:[{scaleY:0.8},{scaleX:0.8}] }}
            source={require('./img/logo.png')}
            />


            <TextInput
            underlineColorAndroid={'#D7D7D7'}
            style={{
              marginTop:50,
              marginLeft:20,
              marginRight:20,
              height: 40}}
              onChangeText={(correo) => this.setState({correo})}
              placeholder={this.state.correo}
              />

              <TextInput
              underlineColorAndroid={'#D7D7D7'}
              style={{
                marginRight:20,
                marginLeft:20,
                marginTop:25,
                height: 40}}
                onChangeText={(contrasena) => this.setState({contrasena})}
                placeholder={this.state.contrasena}
                />

               <View style={{
                 marginRight:10,
                 height:80,
                 alignSelf: 'flex-end',
                 flexDirection :'column-reverse'
               }}>
               <Button
                 overrides={this.object}
                text='INICIAR SEISION' onPress={() => navigate('menu', { user: 'Lucy' })} />
               </View>
               </Card.Body>
        </Card>
        </View>
        </View>


      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
  });



const SimpleApp = StackNavigator({
  Home   : {screen:AwesomeProject},
  recover: {screen: pass_recover },
  menu   : {screen: main_menu},
})

AppRegistry.registerComponent('AwesomeProject', () => SimpleApp);
