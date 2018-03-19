import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import {
  sedesGetByIdRequest,
  divisionsDeleteRequest
} from '../../../../../../../actions';

import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class DivisionCard extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      expanded: false
    };
    this.onEditDivision = this.onEditDivision.bind(this);
    this.onDeleteDivision = this.onDeleteDivision.bind(this);
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

  onEditDivision(division) {
    this.context.router.push({
      pathname: '/app/division',
      query: {
        id : division.id
      }
    })
  }

  onDeleteDivision(id) {
    this.props.actions.divisionsDeleteRequest(id);
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
        <CardActions
          style={{float: 'right', marginTop: '-52px', marginRight: '50px'}}>
          <FlatButton label="Editar" onClick={() => {
            this.onEditDivision(this.props.division)
          }}/>
          <FlatButton label="Eliminar" onClick={() => {
            this.onDeleteDivision(this.props.division.id)
          }}/>
        </CardActions>
        <CardText expandable={true}>
          <div><strong>Location: </strong> {(this.state.location)?this.state.location.name:this.props.division.location} </div>
        </CardText>
      </Card>
    )
  }
}

//To get the routers
DivisionCard.contextTypes = {
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
      divisionsDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(DivisionCard);
