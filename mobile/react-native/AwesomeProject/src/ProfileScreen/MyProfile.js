import React from "react";
import { StatusBar, Image,Text, TouchableHighlight} from "react-native";
import {Button,Container,CardItem, Body,Content,Header,Title,Left,Icon,Right, Picker, Form, Item as FormItem } from "native-base";
import { Card } from 'react-native-material-design';
import {View} from 'react-native';
import {Root} from 'native-base'

const Item = Picker.Item;

export default class MyProfile extends React.Component {
  constructor(props) {
     super(props);
     this.values = { titulo: ' Fundacion F. Novella ',
                    nombre: ' Panel de control ',
                    programas: ' PROGRAMAS ACTIVOS '   };
                    this.state = {
                      selected1: "key1"
                    };
    }

    onValueChange(value: string) {
      console.log("value "+value);
      this.setState({
           selected1: value
         });
         if(value == 'key0'){
           this.props.navigation.navigate("Home");
         }
         if(value == 'key1'){
           this.props.navigation.navigate("Profile");
         }
         if(value == 'key2'){
           this.props.navigation.navigate("Chat");
         }
    }

  render() {
    return (
      <Container>
      <Header androidStatusBarColor='#000' style={{backgroundColor:'#66BB6A',margin:0,padding:0,}} >
        <Left>
          <Button
            transparent
            onPress={() => this.props.navigation.navigate("DrawerOpen")}
          >
            <Icon name="menu" />
            <Title style={{marginLeft:15}}>Perfil</Title>
          </Button>
        </Left>
        <View  style={{flex: 1,flexDirection: 'row',justifyContent: 'flex-end',alignItems:'center', marginRight:0,paddingRight:0}} >
          <Text style={{color:'white', fontWeight: 'bold',marginRight:5}}>Sergio Andres Ramirez </Text>
          <Image source={require('../../img/g1.jpg')} style={{borderRadius: 70,margin:0,padding:0, width:40,height:40, resizeMode: 'contain'}} />
          <Form style={{position:'absolute', width:50,height:50}}>
            <Picker
              style={{ backgroundColor:"#00000000" }}
              iosHeader="Select one"
              mode="dropdown"
              note={false}
              selectedValue={this.state.selected1}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Item label="Inicio" value="key0"/>
              <Item label="Mi Perfil" value="key1" />
              <Item label="Cerrar Cesion" value="key2" />
            </Picker>
          </Form>
        </View>
      </Header>

        <Content padder>

          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop:5,
            alignItems: 'center',
          }}>

          <Image source={require('../../img/g1.jpg')} style={{borderRadius: 70,margin:0,padding:0, width:150,height:150, resizeMode: 'contain'}} />
          <Text style={{marginTop:5, color:"grey",  fontWeight: 'bold', fontSize: 25}} >Sergio Ramirez</Text>
          <Text style={{ color:"grey", fontSize: 15, textAlign: 'center'}} >Instructor de resistencia de materiales. En funacion Carlos F.Novella</Text>

            <View style={{
              height:50,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
                <View style={{marginTop:10,position:'absolute',width:900,height:1,top:25, backgroundColor: 'grey'}} />
                <Text style={{ color:"grey", borderColor:'grey',backgroundColor:'white', borderRadius: 5,padding:5, marginTop:20, borderWidth: 1, fontSize: 10, textAlign: 'center'}} >CURSOS COMPLETADOS</Text>
              </View>

          </View>

          <View style={{
              marginTop:10,
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center', 
            }}>
            <Text style={{ height: 20, marginBottom:5}}> Calculo de esfuerzos </Text>
            <View style={{alignItems: 'center',flexDirection: 'column',justifyContent: 'center',height: 20, borderColor:'grey',marginLeft:10,marginRight:10,borderRadius: 40,borderWidth: 1, backgroundColor: 'skyblue'}} >
              <Text style={{ height: 20, fontWeight: 'bold',color:"black"}}> 100 % </Text>
            </View>
          </View>

          <View style={{
              marginTop:10,
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Text style={{ height: 20, marginBottom:5}}> Análisis resistente </Text>
            <View style={{alignItems: 'center',flexDirection: 'column',justifyContent: 'center',height: 20, borderColor:'grey',marginLeft:10,marginRight:10,borderRadius: 40,borderWidth: 1, backgroundColor: 'skyblue'}} >
              <Text style={{ height: 20, fontWeight: 'bold',color:"black"}}> 100 % </Text>
            </View>
          </View>

          <View style={{
              marginTop:10,
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <Text style={{ height: 20, marginBottom:5}}> Análisis de rigidez </Text>
            <View style={{alignItems: 'center',flexDirection: 'column',justifyContent: 'center',height: 20, borderColor:'grey',marginLeft:10,marginRight:10,borderRadius: 40,borderWidth: 1, backgroundColor: 'skyblue'}} >
              <Text style={{ height: 20, fontWeight: 'bold',color:"black"}}> 100 % </Text>
            </View>
          </View>



        </Content>
      </Container>
    );
  }
}
