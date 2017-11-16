import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  sedesGetByIdRequest,
  educatorsGetByIdRequest,
  gradeGetByIdRequest
} from '../../../../../../../actions';

import {Card, CardHeader, CardText} from 'material-ui/Card';

class CourseCard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      expanded: false
    }
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
      gradeGetByIdRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(CourseCard);
