import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import {
  sedesGetByIdRequest,
  workshopsDeleteRequest
} from '../../../../../../../actions';

import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class WorkshopCard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      expanded: false
    };
    this.onEditWorkshop = this.onEditWorkshop.bind(this);
    this.onDeleteWorkshop = this.onDeleteWorkshop.bind(this);
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

  onEditWorkshop(workshop) {
    this.context.router.push({
      pathname: '/app/workshop',
      query: {
        id : workshop.id
      }
    })
  }

  onDeleteWorkshop(id) {
    this.props.actions.workshopsDeleteRequest(id);
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
        <CardActions
          style={{float: 'right', marginTop: '-62px', marginRight: '50px'}}>
          <FlatButton label="Editar" onClick={() => {
            this.onEditWorkshop(this.props.workshop)
          }}/>
          <FlatButton label="Eliminar" onClick={() => {
            this.onDeleteWorkshop(this.props.workshop.id)
          }}/>
        </CardActions>
        <CardText expandable={true}>
          <div><strong>Ubicación: </strong> {(this.state.location)?this.state.location.name:this.props.workshop.location} </div>
        </CardText>
      </Card>
    )
  }
}

//To get the routers
WorkshopCard.contextTypes = {
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
      workshopsDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(WorkshopCard);
