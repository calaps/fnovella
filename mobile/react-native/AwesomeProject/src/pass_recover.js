import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image} from 'react-native';
import { Card, Button } from 'react-native-material-design';
import { TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import  AwesomeProject  from '../App.js';

export default class  pass_recover  extends React.Component {
  constructor(props) {
     super(props);
     this.state = { correo: 'Correo electronico' ,comentario: 'Ingresa tu correo electronico principal. Te enviaremos un correo electronico con tu nueva contrasena para restaurar la contrasena.'   };
     this.object = {textColor:'#66BB6A'};
     this.boton_abajo = {textColor:'#FFFFFF'};
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
    return (
        //get data sended from home
        //<Text>Chat with {params.user}</Text>
        <View style={styles.container}>
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
                        height:200}}/>

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
              source={require('../img/logo.png')}
              />


              <TextInput
              underlineColorAndroid={'#D7D7D7'}
              style={{
                marginTop:50,
                marginLeft:25,
                marginRight:25,
                height: 40}}
                onChangeText={(correo) => this.setState({correo})}
                placeholder={this.state.correo}
                />

                 <Text
                 style={{
                   textAlign: 'center', // <-- the magic
                   fontWeight: 'bold',
                   fontSize: 12,
                   marginLeft:20,
                   marginRight:20}}
                 >{this.state.comentario}</Text>

                 <View style={{
                   marginRight:10,
                   height:80,
                   alignSelf: 'flex-end',
                   flexDirection :'column-reverse'
                 }}>

            <View style={{flex: 1, flexDirection: 'row' ,alignItems: 'flex-end'}}>
                   <View style={{position:'absolute', right:60}}>
                   <Button
                     overrides={this.object}
                                                           //  THIS VARIABLES COMES FROM const { navigate } = this.props.navigation;
                     text='INICIO DE SESION' onPress={() => navigate('Home', { user: 'Lucy' })} />
                   </View>
                   <Button
                     overrides={this.object}
                     text='RESET'  />
                 </View>

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

//const SimpleApp = StackNavigator({
//  recover: { screen: pass_recover },
//  Home   : { screen:AwesomeProject},
//})
