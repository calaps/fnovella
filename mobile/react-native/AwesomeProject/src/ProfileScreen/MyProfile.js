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
        <Header style={{backgroundColor:'#66BB6A',margin:0,padding:0,}} >
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



        <Card
          elevation={7}
          style={{
            paddingLeft:0,
            paddingRight:0,
            height:500
            }}
          >

          <View style={{flex: 1}}>
             <View style={{flex: .65, }}>
               <Image source={require('../../img/dashboard.jpg')} style={{position:'absolute', paddingBottom: 370*.30, resizeMode: 'cover' }} />
               <View style={{
                 flex: 1,
                 flexDirection: 'column',
                 justifyContent: 'center',
                 alignItems: 'center',
               }}>
               <Text style={{textAlign: 'center', fontSize: 35, color:'white'}}>{this.values.titulo}</Text>
               <Text style={{textAlign: 'center', fontSize: 20, color:'white'}}>{this.values.nombre}</Text>
              </View>
             </View>

             <View style={{flex:.35, backgroundColor:'white', justifyContent: 'center',}}>

             <View style={{position:'absolute',width:900,height:1, backgroundColor: 'grey'}} />

             <View style={{flex: 1, backgroundColor:'#00000000',flexDirection: 'column',justifyContent: 'space-between',alignItems: 'center',}}>
               <Text style={{flex: 1 , fontSize: 40, marginTop:5,marginBottom:15 }} >11</Text>
               <Text style={{textAlign: 'center', fontSize: 10, height:25, backgroundColor:'white', borderRadius: 10, paddingLeft:5,paddingTop:5, paddingRight:5,  borderWidth:1,borderColor:'grey'}} >{this.values.programas}</Text>
               <Icon style={{flex: 1, marginTop:20,color:'#12B9C9'}} name="calendar"/>
             </View>

         </View>

           </View></Card>

           <Card
             elevation={7}
             style={{
               paddingLeft:0,
               paddingRight:0,
               height:500
               }}
             >



             <View style={{flex: 1}}>
                <View style={{flex: .65, }}>
                  <Image source={require('../../img/dashboard.jpg')} style={{position:'absolute', paddingBottom: 370*.30, resizeMode: 'cover' }} />
                  <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{textAlign: 'center', fontSize: 35, color:'white'}}>{this.values.titulo}</Text>
                  <Text style={{textAlign: 'center', fontSize: 20, color:'white'}}>{this.values.nombre}</Text>
                 </View>
                </View>

                <View style={{flex:.35, backgroundColor:'white', justifyContent: 'center',}}>

                <View style={{position:'absolute',width:900,height:1, backgroundColor: 'grey'}} />

                <View style={{flex: 1, backgroundColor:'#00000000',flexDirection: 'column',justifyContent: 'space-between',alignItems: 'center',}}>
                  <Text style={{flex: 1 , fontSize: 40, marginTop:5,marginBottom:15 }} >11</Text>
                  <Text style={{textAlign: 'center', fontSize: 10, height:25, backgroundColor:'white', borderRadius: 10, paddingLeft:5,paddingTop:5, paddingRight:5,  borderWidth:1,borderColor:'grey'}} >{this.values.programas}</Text>
                  <Icon style={{flex: 1, marginTop:20,color:'#12B9C9'}} name="calendar"/>
                </View>

            </View>

              </View></Card>

      
        </Content>
      </Container>
    );
  }
}
