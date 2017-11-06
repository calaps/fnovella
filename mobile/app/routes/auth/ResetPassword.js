import React , { Component }from 'react';
import {AppRegistry,TextInput, TouchableHighlight,StyleSheet,Text,View,Image,Dimensions,KeyboardAvoidingView} from 'react-native';
import { Card, Button } from 'react-native-material-design';
import { StackNavigator } from 'react-navigation';

import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';
import {forgotPassword} from '../../actions'
// import config from './../../config/config';

/* Actions */
import { loginRequest } from './../../actions/auth';

let self;
let window = Dimensions.get("window");
class ResetPassword extends Component {
  //************************************** Constructor start*****************************//
  constructor(props){
    super(props);
    this.state = { 
      correo: 'Correo electronico' ,
      comentario: 'Ingresa tu correo electronico principal. Te enviaremos un correo electronico con tu nueva contrasena para restaurar la contrasena.',  
      email: '',
      error:'',
    };
    this.object = {textColor:'#66BB6A'};
    this.boton_abajo = {textColor:'#FFFFFF'};
    this.onReset = this.onReset.bind(this);
    self= this;
  }
  static navigationOptions = ({ navigation }) => ({
    //title: `Chat with ${navigation.state.params.user}`,
    header: null,
  });

  onReset(e){
    e.preventDefault();
    let data = {
      email:this.state.email
    }
    this.props.actions.forgotPassword(data)
        .then(response => console.log(response))
        .catch(error => console.log(error));

      alert('We have sent a password to this email:\n' + this.state.email);
  }
  render(){
    const { navigate, goBack } = this.props.navigation;
    return (
          <KeyboardAvoidingView behavior='padding' style={styles.container}>
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
                          source={require('../../assets/images/logo.png')}
                    />


                    <TextInput
                      underlineColorAndroid={'#D7D7D7'}
                      style={{
                        marginTop:50,
                        marginLeft:25,
                        marginRight:25,
                        height: 40}}
                      onChangeText={(email) => this.setState({email})}
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
                            text='INICIO DE SESION' onPress={() => navigate('login')} />
                        </View>
                        <Button
                          onPress={this.onReset}
                          overrides={this.object}
                          text='RESET'  />
                      </View>

                    </View>
                  </Card.Body>
                </Card>
              </View>
            </KeyboardAvoidingView>

    )
  }
  //************************************** Render end*****************************//
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5FCFF',
    },
  });
  
/* Map state to props */
function mapStateToProps(state){
    return {
        auth: state.auth,
    }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            loginRequest,
            forgotPassword
        }, dispatch)
    };
}

/* Connect Component with Redux */
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)