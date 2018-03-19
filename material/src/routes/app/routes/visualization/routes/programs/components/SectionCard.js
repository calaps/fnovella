import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import {
  sedesGetByIdRequest,
  coursesGetBySectionIdRequest,
  sectionsDeleteRequest
} from '../../../../../../../actions';

import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import CourseCard from './CourseCard';

class SectionCard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      expanded: false
    };
    this.onEditSection = this.onEditSection.bind(this);
    this.onDeleteSection = this.onDeleteSection.bind(this);
  }

  componentWillMount(){
    if(this.props.section.location){
      this.props.actions.sedesGetByIdRequest(this.props.section.location)
        .then((response)=>{
          this.setState({
            location: response.data
          })
        })
    }
    if(this.props.section.id){
      this.props.actions.coursesGetBySectionIdRequest(this.props.section.id)
        .then((response)=>{
          this.setState({
            courses: response.data
          })
        })
    }
  }

  onEditSection(section) {
    this.context.router.push({
      pathname: '/app/section',
      query: {
        id : section.id
      }
    })
  }

  onDeleteSection(id) {
    this.props.actions.sectionsDeleteRequest(id);
  }

  render(){
    let courses = this.state.courses || [];

    return(
      <Card onExpandChange={(isExpanded)=>{
        if(isExpanded && this.props.onExpanded){
          this.props.onExpanded(this.props.section);
        }
      }}>
        <CardHeader
          title={'Section '+this.props.section.name.toUpperCase()}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions
          style={{float: 'right', marginTop: '-52px', marginRight: '50px'}}>
          <FlatButton label="Editar" onClick={() => {
            this.onEditSection(this.props.section)
          }}/>
          <FlatButton label="Eliminar" onClick={() => {
            this.onDeleteSection(this.props.section.id)
          }}/>
        </CardActions>
        <CardText expandable={true}>
          <div><strong>Ubicación: </strong> {(this.state.location)?this.state.location.name:this.props.section.location} </div>
          <div><strong>Jornada: </strong> {this.props.section.jornada} </div>
          <div><strong>Code: </strong> {this.props.section.code} </div>
          <div>
            {
              courses.map((course, index) => {
                return <CourseCard
                  key={index}
                  course={course}
                />;
              })
            }
          </div>
        </CardText>
      </Card>
    )
  }
}

//To get the routers
SectionCard.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  //pass the providers
  return {
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      sedesGetByIdRequest,
      coursesGetBySectionIdRequest,
      sectionsDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(SectionCard);
