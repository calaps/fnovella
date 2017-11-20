import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  sedesGetByIdRequest,
  coursesGetBySectionIdRequest
} from '../../../../../../../actions';

import {Card, CardHeader, CardText} from 'material-ui/Card';

import CourseCard from './CourseCard';

class SectionCard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      expanded: false
    }
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
        <CardText expandable={true}>
          <div><strong>Location: </strong> {(this.state.location)?this.state.location.name:this.props.section.location} </div>
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
      coursesGetBySectionIdRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(SectionCard);
