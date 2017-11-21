import React from 'react';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import {
  programGetRequest,
  getEntityByProgramId,
  programDeleteRequest
} from '../../../../../../../actions';

import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import CourseCard from './CourseCard';
import WorkshopCard from './WorkshopCard';
import DivisionCard from './DivisionCard';
import GradeCard from './GradeCard';

const Hero = () => (
  <section className="hero hero-bg-img"
           style={{backgroundImage: 'url(assets/images-demo/covers/photo-1438893761775-f1db119d27b2.jpg)'}}>
    <div className="hero-inner">
      <div className="hero-content">
        <h1 className="hero-title">Programs</h1>
      </div>
    </div>
  </section>
);

function entityCard(entityType, courses, divisions, grades, workshops) {
  switch (entityType) {
    case 'course':
      if (courses.content) {
        return (courses.content.map((course, index) => {
            return <CourseCard key={index} course={course}/>
          })
        );
      }
      break;
    case 'division':
      if (divisions.content) {
        return (divisions.content.map((division, index) => {
            return <DivisionCard key={index} division={division}/>
          })
        );
      }
      break;
    case 'grades':
      if (grades.content) {
        return (grades.content.map((grade, index) => {
            return <GradeCard key={index} grade={grade}/>
          })
        );
      }
      break;
    case 'workshop':
      if (workshops.content) {
        return (workshops.content.map((workshop, index) => {
            return <WorkshopCard key={index} workshop={workshop}/>
          })
        );
      }
      break;
  }
}

const ProgramCard = (props) => (
  <Card
    expanded={props.program.id === props.currentExpandedProgramId}
    onExpandChange={(isExpanded) => {
      if (props.onExpanded) {
        props.onExpanded(props.program, isExpanded);
      }
    }}
  >
    <CardHeader
      title={props.program.name.toUpperCase()}
      subtitle={props.program.clasification.toUpperCase()
      + ' - ' + props.program.description[0].toUpperCase() + props.program.description.substring(1)}
      actAsExpander={true}
      showExpandableButton={true}
    />
    <CardActions
      style={{float: 'right', marginTop: '-62px', marginRight: '50px'}}>
      <FlatButton label="Agregar" onClick={() => {
        self.onAddNewProgram(props.program.clasification)
      }}/>
      <FlatButton label="Editar" onClick={() => {
        self.onEditProgram(props.program)
      }}/>
      <FlatButton label="Eliminar" onClick={() => {
        self.handleDialogBox(props.program)
      }}/>
    </CardActions>
    <CardText expandable={true}>
      {
        entityCard(props.program.clasification, props.courses, props.divisions, props.grades, props.workshops)
      }
    </CardText>
  </Card>
);

const customContentStyle = {
  width: '50%',
  maxWidth: 'none',
};

let self;
let size = 10; //limit
let number = 0; //page

class Programs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      size,
      number,
      incrementFactor: 10,
      currentExpandedProgramId: null,
      dialogBoxOpen: false,
      programToBeDelete: ''
    };
    this.loadMore = this.loadMore.bind(this);
    this.onProgramExpanded = this.onProgramExpanded.bind(this);
    this.handleDialogBox = this.handleDialogBox.bind(this);
    this.onEditProgram = this.onEditProgram.bind(this);
    this.onDeleteProgram = this.onDeleteProgram.bind(this);
    this.onAddNewProgram = this.onAddNewProgram.bind(this);
    self = this;
  }

  async componentWillMount() {
    // type: 2 reflects all programs
    let response = await this.props.actions.programGetRequest(this.state.number, this.state.size);
  }

  async loadMore() {
    await this.props.actions.programGetRequest(this.state.number, this.state.size + this.state.incrementFactor);
    this.setState({
      size: this.state.size + this.state.incrementFactor
    })
  }

  onProgramExpanded(program, isExpanded) {
    if (isExpanded) {
      let entity = program.clasification;
      if (entity == 'grades') {
        entity = entity.replace('s', '');
      }
      this.props.actions.getEntityByProgramId(program.id, entity);
      this.setState({
        currentExpandedProgramId: program.id
      })
    }
    else {
      this.setState({
        currentExpandedProgramId: null
      })
    }
  }

  handleDialogBox(program) {
    this.setState({
      dialogBoxOpen: !this.state.dialogBoxOpen,
      programToBeDelete: program,
    });
  }

  onEditProgram(program) {
    this.context.router.push({
      pathname: '/app/program',
      query: {
        id : program.id
      }
    })
  }

  onDeleteProgram() {
    this.props.actions.programDeleteRequest(this.state.programToBeDelete.id);
    this.setState({
      dialogBoxOpen: !this.state.dialogBoxOpen,
      programToBeDelete: '',
    });
  }

  onAddNewProgram(classification) {
    this.context.router.push({
      pathname: '/app/program',
      query: {
        classification : classification
      }
    })
  }

  render() {
    let programs = this.props.programs.content || [];

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleDialogBox}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={this.onDeleteProgram}
      />,
    ];

    return (
      <section className="page-about chapter">
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"><Hero/></div>
          <div key="2">
            {
              programs.map((program, index) => {
                return <ProgramCard
                  key={index}
                  program={program}
                  onExpanded={self.onProgramExpanded}
                  currentExpandedProgramId={self.state.currentExpandedProgramId}
                  courses={self.props.courses}
                  divisions={self.props.divisions}
                  grades={self.props.grades}
                  workshops={self.props.workshops}
                />;
              })
            }
            <div>
              <Dialog
                title="Are you sure?"
                actions={actions}
                modal={true}
                contentStyle={customContentStyle}
                open={this.state.dialogBoxOpen}
              >
                Deleting this program will cause deletion of {this.state.programToBeDelete.clasification} too.
              </Dialog>
            </div>
          </div>
          <div key="3" className="text-center">
            <FlatButton label="Load More" primary={true} onClick={this.loadMore}/>
          </div>
        </QueueAnim>
      </section>
    )
  }
}

//To get the routers
Programs.contextTypes = {
  router: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  //pass the providers
  return {
    programs: state.programs,
    courses: state.courses,
    divisions: state.divisions,
    grades: state.grades,
    workshops: state.workshops
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      programGetRequest,
      getEntityByProgramId,
      programDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(Programs);
