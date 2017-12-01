import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import {
  sedesGetByIdRequest,
  educatorsGetByIdRequest,
  sectionsGetByGradeIdRequest,
  gradesDeleteRequest
} from '../../../../../../../actions';

import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import SectionCard from './SectionCard';

class GradeCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
    this.onEditGrade = this.onEditGrade.bind(this);
    this.onDeleteGrade = this.onDeleteGrade.bind(this);
  }

  componentWillMount() {
    console.log('grade: ', this.props.grade);
    if (this.props.grade.location) {
      this.props.actions.sedesGetByIdRequest(this.props.grade.location)
        .then((response) => {
          this.setState({
            location: response.data
          })
        })
    }
    if (this.props.grade.instructorId) {
      this.props.actions.educatorsGetByIdRequest(this.props.grade.instructorId)
        .then((response) => {
          this.setState({
            instructor: response.data
          })
        })
    }
    if (this.props.grade.id) {
      this.props.actions.sectionsGetByGradeIdRequest(this.props.grade.id)
        .then((response) => {
          this.setState({
            sections: response.data
          })
        })
    }
  }

  onEditGrade(grade) {
    this.context.router.push({
      pathname: '/app/grade',
      query: {
        id : grade.id
      }
    })
  }

  onDeleteGrade(id) {
    this.props.actions.gradesDeleteRequest(id);
  }

  render() {
    let sections = this.state.sections || [];

    return (
      <Card onExpandChange={(isExpanded) => {
        if (isExpanded && this.props.onExpanded) {
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
        <CardActions
          style={{float: 'right', marginTop: '-62px', marginRight: '50px'}}>
          <FlatButton label="Editar" onClick={() => {
            this.onEditGrade(this.props.grade)
          }}/>
          <FlatButton label="Eliminar" onClick={() => {
            this.onDeleteGrade(this.props.grade.id)
          }}/>
        </CardActions>
        <CardText expandable={true}>
          <div>
            <strong>Ubicación: </strong> {(this.state.location) ? this.state.location.name : this.props.grade.location}
          </div>
          <div>
            <strong>Instructor: </strong> {(this.state.instructor) ? (this.state.instructor.firstName + ' ' + this.state.instructor.firstLastname)
            : (this.props.grade.instructorId) ? this.props.grade.instructorId : 'N/A'} </div>
          <div>
            {
              sections.map((section, index) => {
                return <SectionCard
                  key={index}
                  section={section}
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
GradeCard.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  //pass the providers
  return {}
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      sedesGetByIdRequest,
      educatorsGetByIdRequest,
      sectionsGetByGradeIdRequest,
      gradesDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(GradeCard);
