import React, { Component } from 'react';
import { Drawer } from 'native-base';
import SideBar from './SideBar';
import {View} from 'react-native';
import {Button,Container,CardItem, Body,Text,Content,Header,Title,Left,Icon,Right, Picker, Form, Item as FormItem } from "native-base";
const Item = Picker.Item;
export default class LucyChat  extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected1: "key2"
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
    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };



    return (
      <View>
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()} >
      </Drawer>

      <Container>
        <Header style={{backgroundColor:'#66BB6A',margin:0,padding:0,}} >
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
              <Title style={{marginLeft:15}}>Inicio</Title>
            </Button>
          </Left>
          <View  style={{flex: 1,flexDirection: 'row',justifyContent: 'flex-end',alignItems:'center', marginRight:0,paddingRight:0}} >
            <Text style={{color:'white', fontWeight: 'bold',marginRight:5}}>Sergio Andres Ramirez </Text>
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
        </Content>
      </Container>
      </View>

    );
  }
}
