import {StatusBar, Image, Text, TouchableHighlight} from "react-native";
import React from 'react';
import {
  Button,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Picker,
  Form,
  Item as FormItem
} from "native-base";
import {Card} from 'react-native-material-design';
import {View} from 'react-native';
import {Root} from 'native-base'
import { connect } from  'react-redux';
import {bindActionCreators} from 'redux';

import images from './../../configs/images';
import {logOut} from '../../actions/auth';


const Item = Picker.Item;

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.values = {
      titulo: ' Fundacion F. Novella ',
      nombre: ' Panel de control ',
      programas: ' PROGRAMAS ACTIVOS '
    };
    this.state = {
      selected1: "key1"
    };
    // this.onLogOut= this.onLogOut.bind(this);
  }

  async onLogOut(){
    console.log('in logout');
    let response = await this.props.actions.logOut()
    if(response){
      this.props.navigation.navigate('login');
      console.log('response',this.props.navigation)
    }
  }

  onValueChange(value) {
    console.log("value " + value);
    this.setState({selected1: value});
    if (value == 'key0') {
      this
        .props
        .navigation
        .navigate("Home");
    }
    if (value == 'key1') {
      this
        .props
        .navigation
        .navigate("Profile");
    }
    if (value == 'key2') {
      this.onLogOut();
     }
  }

  render() {
    return (
      <View>
        <Header
          androidStatusBarColor='#66BB6A'
          style={{
          backgroundColor: '#66BB6A',
          marginTop: StatusBar.currentHeight,
          padding: 0
        }}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu"/>
              <Title style={{
                marginLeft: 15
              }}>Perfil</Title>
            </Button>
          </Left>
          <View
            style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginRight: 0,
            paddingRight: 0
          }}>
            <Text
              style={{
              color: 'white',
              fontWeight: 'bold',
              marginRight: 5
            }}>Sergio Andres Ramirez
            </Text>
            <Image
              source={images.user_placeholder}
              style={{
              borderRadius: 70,
              margin: 0,
              padding: 0,
              width: 40,
              height: 40
            }}/>
            <Form
              style={{
              position: 'absolute',
              width: 50,
              height: 50
            }}>
              <Picker
                style={{
                backgroundColor: "#00000000"
              }}
                iosHeader="Select one"
                mode="dropdown"
                note={false}
                selectedValue={this.state.selected1}
                onValueChange={this
                .onValueChange
                .bind(this)}>
                <Item label="Inicio" value="key0"/>
                <Item label="Mi Perfil" value="key1"/>
                <Item label="Cerrar Cesion" value="key2"/>
              </Picker>
            </Form>
          </View>
        </Header>
      </View>
    );
  }
}

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
      logOut
    }, dispatch)
  };
}
export default connect(
  mapStateToProps,mapDispatchToProps
)(AppHeader);