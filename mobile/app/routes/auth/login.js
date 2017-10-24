import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar
} from 'react-native';
import {Card, Button} from 'react-native-material-design';
import {TextInput, KeyboardAvoidingView} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {connect} from 'react-redux'; //to pass functions
import {bindActionCreators} from 'redux';
import {loginRequest} from '../../actions/auth';
// import  main_menu  from './main_menu';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    correo: 'Correo electronico',
    contrasena: 'Contrasena'
  }
  constructor(props) {
    super(props);
    this.state = {
      correo: 'Correo electronico',
      contrasena: 'Contrasena'
    };
    this.object = {
      textColor: '#66BB6A'
    };
    this.boton_abajo = {
      textColor: '#FFFFFF'
    };
    this.onSubmit = this
      .onSubmit
      .bind(this);
  }

  static navigationOptions = {
    //title: `Loggin`,
    header: null
  };
  onSubmit(e) {
    e.preventDefault();
    // // if(this.isValid()){   //reset errros object and disable submit button
    // this.setState({ errors: {}, isLoading: true });   //
    // this.context.router.history.push('/');

    let data = {
      email: this.state.email,
      password: this.state.password
    };
    //   //we store  a function in the props console.log(this.props);
    this
      .props
      .actions
      .loginRequest(data)
      .then((response) => {
        //Save the default object as a provider
        if (response) {
          console.log('success');
          this
            .props
            .navigation
            .navigate('menu', {user: 'Lucy'});
          // self.context.router.push('/app/dashboard');
        }
      }, (error) => {
        console.log("An Error occur with the Rest API", error);
        // self.setState({ errors: { ...this.state.errors, apiErrors: error.error },
        // isLoading: false });
      });

    // } else {   console.log(this.state.errors); }

  }
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content"/>
        <View
          style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <View
            style={{
            flexDirection: 'column-reverse',
            position: 'absolute',
            backgroundColor: 'transparent',
            width: 300,
            height: 480
          }}>

            <View
              style={{
              flexDirection: 'column-reverse',
              position: 'relative',
              backgroundColor: '#66BB6A',
              width: 300,
              height: 200
            }}>
              <Button
                onPress={() => navigate('reset', {user: 'Lucy'})}
                overrides={this.boton_abajo}
                text='Ha olvidado su contrasena?'/>
            </View>
            
          </View>
          <Card
            elevation={7}
            style={{
            position: 'absolute',
            margin: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            width: 280,
            height: 370
          }}>
            <Card.Body>
              <Image
                style={{
                transform: [
                  {
                    scaleY: 0.8
                  }, {
                    scaleX: 0.8
                  }
                ]
              }}
                source={require('../../assets/images/logo.png')}/>
              <TextInput
                underlineColorAndroid={'#D7D7D7'}
                style={{
                marginTop: 50,
                marginLeft: 20,
                marginRight: 20,
                height: 40
              }}
                value={this.state.email}
                onChangeText={(email) => this.setState({email})}
                placeholder={this.state.correo}/>

              <TextInput
                underlineColorAndroid={'#D7D7D7'}
                style={{
                marginRight: 20,
                marginLeft: 20,
                marginTop: 25,
                height: 40
              }}
                value={this.state.password}
                onChangeText={(password) => this.setState({password})}
                placeholder={this.state.contrasena}/>
              <View
                style={{
                marginRight: 10,
                height: 80,
                alignSelf: 'flex-end',
                flexDirection: 'column-reverse'
              }}>
                <Button overrides={this.object} text='INICIAR SEISION' 
                onPress={() => navigate('menu', {user: 'Lucy'})}
                onPress={this.onSubmit}/>
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
    backgroundColor: '#F5FCFF'
  }
});

function mapStateToProps(state) {
  //pass the providers
  return {auth: state.auth}
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      loginRequest
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);