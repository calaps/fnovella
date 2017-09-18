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
      selected1: "key1"
    };
  }
  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
    if(this.state.selected1 == 'key0'){
    this.props.navigation.navigate("Home");
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

      <Button onPress={() => this.props.navigation.navigate('Home')}>
        <Text>Actionsheet</Text>
      </Button>


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




          <Button
            onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Testing ActionSheet"
              },
              buttonIndex => {
                this.setState({ clicked: BUTTONS[buttonIndex] });
              }
            )}
          >
            <Text>Actionsheet</Text>
          </Button>
        </Content>
      </Container>
      </View>

    );
  }
}
