import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  sedesGetByIdRequest
} from '../../../../../../../actions';

import {Card, CardHeader, CardText} from 'material-ui/Card';

class DivisionCard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      expanded: false
    }
  }

  componentWillMount(){
    console.log('division: ', this.props.division);
    if(this.props.division.location){
      this.props.actions.sedesGetByIdRequest(this.props.division.location)
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
          this.props.onExpanded(this.props.division);
        }
      }}>
        <CardHeader
          title={this.props.division.name.toUpperCase()}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <div><strong>Location: </strong> {(this.state.location)?this.state.location.name:this.props.division.location} </div>
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
)(DivisionCard);
