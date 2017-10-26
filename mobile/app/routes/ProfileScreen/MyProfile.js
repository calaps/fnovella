import React from "react";
import {StatusBar,ScrollView, Image, Text, TouchableHighlight} from "react-native";
import {
  Button,
  Container,
  CardItem,
  Body,
  Content,
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

import AppHeader from '../../components/header/AppHeader'
import images from './../../configs/images';


const Item = Picker.Item;

class MyProfile extends React.Component {
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
      this
        .props
        .navigation
        .navigate("Chat");
    }
  }

  render() {
    var {user} =this.props;
    return (
      <Container>
        <AppHeader navigation={this.props.navigation} />
        <Content padder>
    <ScrollView style={{paddingBottom:10}}>
          <View
            style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: 5,
            alignItems: 'center'
          }}>
            <Image
              source={images.user_placeholder}
              style={{
              // borderRadius: 70,
              margin: 0,
              padding: 0,
              width: 180,
              height: 180
            }}/>
         </View>
            <Text
              style={{
              marginTop: 5,
              color: "black",
              fontWeight: 'bold',
              fontSize: 25
            }}>Informacion</Text>
            <View style={{marginTop:10,marginBottom:10, backgroundColor:'green',height:2,width:140}}></View>
          <View
            style={{
            marginTop: 10,
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Text
              style={{
              height: 20,
              marginBottom: 5,
              fontWeight:'bold'
            }}>
            Tipo de Privilegio:
              <Text style={{fontWeight:'normal'}}> Administrador</Text>
            </Text>
            
            <Text
              style={{
              height: 20,
              marginBottom: 5,
              fontWeight:'bold'
            }}>
            Nombre completo: 
              <Text style={{fontWeight:'normal'}}> {user?(user.firstName + ' ' + user.firstLastName):' '}</Text>
            </Text>
            
            <Text
              style={{
              height: 20,
              marginBottom: 5,
              fontWeight:'bold'
            }}>
            Email:
              <Text style={{fontWeight:'normal'}}> {user?user.email:' '}</Text>
            </Text>
            
            <Text
              style={{
              height: 20,
              marginBottom: 5,
              fontWeight:'bold'
            }}>
            Fecha de Nacimento:
              <Text style={{fontWeight:'normal'}}> {user?user.bornDate:' '}</Text> 
            </Text>
            
            <Text
              style={{
              height: 20,
              marginBottom: 5,
              fontWeight:'bold'
            }}>
            Nationalidad:
              <Text style={{fontWeight:'normal'}}> {user?user.nationality:' '}</Text> 
            </Text>

            <Text
              style={{
              height: 20,
              marginBottom: 5,
              fontWeight:'bold'
            }}>
            Departmento:
              <Text style={{fontWeight:'normal'}}> {user?user.department:' '}</Text>  
            </Text>

            <Text
              style={{
              height: 20,
              marginBottom: 5,
              fontWeight:'bold'
            }}>
            Genero: 
              <Text style={{fontWeight:'normal'}}> {user?user.gender:' '}</Text> 
            </Text>
            
            <Text
              style={{
              height: 20,
              marginBottom: 5,
              fontWeight:'bold'
            }}>
            Codigo de cemro: 
              <Text style={{fontWeight:'normal'}}> {user?user.cemproCode:' '}</Text>  
            </Text>
          </View>
           <Text
              style={{
              marginTop: 5,
              color: "black",
              fontWeight: 'bold',
              fontSize: 25
            }}>Opciones</Text>
            <View style={{marginTop:10,marginBottom:10, backgroundColor:'green',height:2,width:110}}>

            </View>
          <Button style={{margin:5}} block info><Text style={{color:'white'}}>CAMBIAR CONTRASENA</Text></Button>
          <Button style={{margin:5}} block info><Text style={{color:'white'}}>EDITAR MI INFORMACION</Text></Button>
        </ScrollView>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.auth.user
  }
}

export default connect(
  mapStateToProps,null
)(MyProfile);