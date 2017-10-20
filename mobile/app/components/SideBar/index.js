import React from "react";
import { AppRegistry, Image, StatusBar } from "react-native";
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon
} from "native-base";
import {SidebarHeader} from '../header'
const routes = [
  {
    name:'Menu de Programa',
    divider:true
  },{
    name:'Panel de control',
    icon:'home'
  },{
    name:'MyProfile',
    icon:'person',
    path:'Profile'
  },{
    name:'Progaramas',
    icon:'clipboard'
  },{
    name:'Activaciones',
    icon:'cloud-done'
  },{
    name:'Participants',
    icon:'people'
  },{
    name:'Educadors',
    icon:'school'
  },{
    name:'Indicadores',
    icon:'md-pie'
  },{
    name:'Visualizacion',
    icon:'eye'
  },{
    name:'Menu de applicaion',
    divider:true
  },{
    name:'Catlogos',
    icon:'md-grid'
  },{
    name:'Sedes',
    icon:'pin'
  },{
    name:'Privilegios',
    icon:'hand'
  },{
    name:'Usuarios',
    icon:'person'
  },{
    name:'Menu de apoyo',
    divider:true
  },{
    name:'Preguentas frecuentes',
  },{
    name:'Terminos y condiciones',
  },{
    name:'Ayuda & Soporte',
    icon:'help'
  }
];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <SidebarHeader />
        <Content>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem itemDivider={data.divider}
                  button
                  onPress={() => this.props.navigation.navigate(data.path)}
                >
              
                {data.icon ? <Icon style={{marginRight:20}} name={data.icon} />:null}
                  <Text>{data.name}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}
