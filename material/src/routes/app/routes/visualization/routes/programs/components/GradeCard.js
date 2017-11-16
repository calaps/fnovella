import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  sedesGetByIdRequest,
  educatorsGetByIdRequest
} from '../../../../../../../actions';

import {Card, CardHeader, CardText} from 'material-ui/Card';

class GradeCard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      expanded: false
    }
  }

  componentWillMount(){
    console.log('grade: ', this.props.grade);
    if(this.props.grade.location){
      this.props.actions.sedesGetByIdRequest(this.props.grade.location)
        .then((response)=>{
          this.setState({
            location: response.data
          })
        })
    }
    if(this.props.grade.instructorId){
      this.props.actions.educatorsGetByIdRequest(this.props.grade.instructorId)
        .then((response)=>{
          this.setState({
            instructor: response.data
          })
        })
    }
  }

  render(){
    return(
    <Card onExpandChange={(isExpanded)=>{
      if(isExpanded && this.props.onExpanded){
        this.props.onExpanded(props.grade);
      }
    }}>
      <CardHeader
        title={this.props.grade.name.toUpperCase()}
        subtitle={this.props.grade.level.toUpperCase()
        + ' - ' + this.props.grade.description[0].toUpperCase() + this.props.grade.description.substring(1)}
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <div><strong>Location: </strong> {(this.state.location)?this.state.location.name:this.props.grade.location} </div>
        <div><strong>Instructor: </strong> {(this.state.instructor)?(this.state.instructor.firstName + ' ' + this.state.instructor.firstLastname)
          :(this.props.grade.instructorId)?this.props.grade.instructorId:'N/A'} </div>
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
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(GradeCard);
