import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import {
  sedesGetByIdRequest,
  educatorsGetByIdRequest,
  gradeGetByIdRequest,
  coursesDeleteRequest
} from '../../../../../../../actions';

import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class CourseCard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      expanded: false
    };
    this.onEditCourse = this.onEditCourse.bind(this);
    this.onDeleteCourse = this.onDeleteCourse.bind(this);
  }

  componentWillMount(){
    console.log('course: ', this.props.course);
    if(this.props.course.location){
      this.props.actions.sedesGetByIdRequest(this.props.course.location)
        .then((response)=>{
          this.setState({
            location: response.data
          })
        })
    }
    if(this.props.course.instructorId){
      this.props.actions.educatorsGetByIdRequest(this.props.course.instructorId)
        .then((response)=>{
          this.setState({
            instructor: response.data
          })
        })
    }
    if(this.props.course.grade){
      this.props.actions.gradeGetByIdRequest(this.props.course.grade)
        .then((response)=>{
          this.setState({
            grade: response.data
          })
        })
    }
  }

  onEditCourse(course) {
    this.context.router.push({
      pathname: '/app/course',
      query: {
        id : course.id
      }
    })
  }

  onDeleteCourse(id) {
    this.props.actions.coursesDeleteRequest(id);
  }

  render(){
    return(
      <Card
        onExpandChange={(isExpanded)=>{
          if(isExpanded && this.props.onExpanded){
            this.props.onExpanded(this.props.course);
          }
        }}>
        <CardHeader
          title={this.props.course.name.toUpperCase()}

          subtitle={this.props.course.description[0].toUpperCase() + this.props.course.description.substring(1)}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardActions
          style={{float: 'right', marginTop: '-62px', marginRight: '50px'}}>
          <FlatButton label="Editar" onClick={() => {
            this.onEditCourse(this.props.course)
          }}/>
          <FlatButton label="Eliminar" onClick={() => {
            this.onDeleteCourse(this.props.course.id)
          }}/>
        </CardActions>
        <CardText expandable={true}>
          <div><strong>Location: </strong> {(this.state.location)?this.state.location.name:this.props.course.location} </div>
          <div><strong>Grade: </strong> {(this.state.grade)?this.state.grade.name:this.props.course.grade} </div>
          <div><strong>Instructor: </strong> {(this.state.instructor)?(this.state.instructor.firstName + ' ' + this.state.instructor.firstLastname)
            :(this.props.course.instructorId)?this.props.course.instructorId:'N/A'} </div>
          <div><strong>Open Course: </strong> {this.props.course.openCourse?'Yes':'No'} </div>
        </CardText>
      </Card>
    )
  }
}

//To get the routers
CourseCard.contextTypes = {
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
      educatorsGetByIdRequest,
      gradeGetByIdRequest,
      coursesDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(CourseCard);
