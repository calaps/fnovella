import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  sedesGetByIdRequest
} from '../../../../../../../actions';

import {Card, CardHeader, CardText} from 'material-ui/Card';

class WorkshopCard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      expanded: false
    }
  }

  componentWillMount(){
    console.log('workshop: ', this.props.workshop);
    if(this.props.workshop.location){
      this.props.actions.sedesGetByIdRequest(this.props.workshop.location)
        .then((response)=>{
          this.setState({
            location: response.data
          })
        })
    }
  }

  render(){
    return(
      <Card onExpandChange={(isExpanded)=>{
        if(isExpanded && this.props.onExpanded){
          this.props.onExpanded(this.props.workshop);
        }
      }}>
        <CardHeader
          title={this.props.workshop.name.toUpperCase()}
          subtitle={this.props.workshop.description[0].toUpperCase() + this.props.workshop.description.substring(1)}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <div><strong>Location: </strong> {(this.state.location)?this.state.location.name:this.props.workshop.location} </div>
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
      sedesGetByIdRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(WorkshopCard);
