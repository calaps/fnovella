import React from "react";
import {StatusBar, Image, Text, TouchableHighlight} from "react-native";
import {
  Button,
  Container,
  CardItem,
  Body,
  Content,
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
import {NativeModules, processColor} from 'react-native';
import StatusBox from '../dashboard/statusBoxes'; 
import DetailsBox from '../dashboard/detailsBox';
import AppHeader from '../../components/header/AppHeader'
import images from './../../configs/images';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  dashboardStatBoxesGetRequest
} from '../../actions';
import Footer from '../../components/footer';

const Item = Picker.Item;
const {StatusBarManager} = NativeModules;

class HomeScreen extends React.Component {
  componentDidMount() {
    StatusBarManager.setColor(processColor('#000000'), false);
  }
  constructor(props) {
    super(props);
    this.values = {
      titulo: ' Fundacion F. Novella ',
      nombre: ' Panel de control ',
    };

    this.state = {
      selected1: "key0"
    };
  }

  componentWillMount() {
    this.props.actions.dashboardStatBoxesGetRequest();
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
    console.log(this.props.dashboard)
    var statusBoxes=[
      {
        id:1,
        title:' PROGRAMAS ACTIVOS ',
        icon: 'clipboard',  
        number: this.props.dashboard.programs
      },{
        id:2,
        title: ' ALUMINOS INSCRITORS ',
        icon:'people',
        number: this.props.dashboard.students
      },{
        id:3,
        title:' DOCENTES ACTIVOS ',
        icon: 'school',
        number: this.props.dashboard.instructors
      },{
        id:4,
        title:' CANTIDAD DE CURSOS ',
        icon: 'paper',
        number: this.props.dashboard.courses
      }
    ];
    var detailsBoxes=[
      {
        id:1,
        title:' PROGRAMAS ',
        icon: 'clipboard',  
        desc: 'Crear, eliminar y visualizar programas. Los programas son la base principal de la estructura de la fundación.'
      },{
        id:2,
        title: ' DOCENTES ',
        icon:'school',
        desc: 'Crear, eliminar y visualizar docentes. Los docentes son los instructures que se asigna a cada grado, curso o taller.'
      },{
        id:3,
        title:' ALUMINOS ',
        icon: 'people',
        desc: 'Crear, eliminar y visualizar alumnos. Los alumnos son los estudiantes asignados a las secciones, tallers, grados o cursos.'
      },{
        id:4,
        title:' PERSONAL ',
        icon: 'person',
        desc: 'Crear, eliminar y visualizar personal. (Eston son los usuarios de la aplicación, capaces de editar o modificar la información).'
      },{
        id:5,
        title:' AYUDA ',
        icon: 'people',
        desc: 'Si necesitas ayuda acerca del funcionamiento de la aplicación puedes hacer click aqui para obtener respuesta a preguntas frecuentes'
      },{
        id:6,
        title:' CATALOGOS ',
        icon: 'person',
        desc: 'Crear, eliminar y visualizar catalogos. Los catalogos son estructuras de datos con variables de información para el programa.'
      }
    ];
   
    return (
      <Container>
        <AppHeader navigation={this.props.navigation}/>
        <Content padder>

          <Card
            elevation={7}
            style={{
            paddingLeft: 0,
            paddingRight: 0,
            height: 300,
            paddingBottom: 0,
            marginBottom:0
          }}>

            <View style={{
              flex: 1
            }}>
              <View style={{
                flex: .65
              }}>
                <Image
                  source={images.dashboard}
                  style={{
                  position: 'absolute',
                  paddingBottom: 370 *.30,
                  resizeMode: 'cover'
                }}/>
                <View
                  style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <Text
                    style={{
                    textAlign: 'center',
                    fontSize: 35,
                    color: 'white'
                  }}>{this.values.titulo}</Text>
                  <Text
                    style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: 'white'
                  }}>{this.values.nombre}</Text>
                </View>
              </View>
            </View>
          </Card>

          {
            statusBoxes.map((statusBox)=>{
              return <StatusBox key={statusBox.id} statusBox={statusBox} />
            })
          } 
          {
            detailsBoxes.map((detailsBox)=>{
              return <DetailsBox key={detailsBox.id} detailsBox={detailsBox} />
            })
          } 
          
          <Footer />
        </Content>
      </Container>
    );
  }
}


function mapStateToProps(state) {
  //pass the providers
  return {
    dashboard: state.dashboard
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      dashboardStatBoxesGetRequest,
    }, dispatch)
  };
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(HomeScreen);