import React from 'react';
import QueueAnim from 'rc-queue-anim';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  programGetRequest,
  getEntityByProgramId
} from '../../../../../../../actions';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import CourseCard from './CourseCard';
import WorkshopCard from './WorkshopCard';
import DivisionCard from './DivisionCard';
import GradeCard from './GradeCard';

const Hero = () => (
  <section className="hero hero-bg-img" style={{backgroundImage: 'url(assets/images-demo/covers/photo-1438893761775-f1db119d27b2.jpg)'}}>
    <div className="hero-inner">
      <div className="hero-content">
        <h1 className="hero-title">Programs</h1>
      </div>
    </div>
  </section>
);

function entityCard(entityType, courses, divisions, grades, workshops){
  switch(entityType){
    case 'course':
      if(courses.content){
        return (courses.content.map((course, index)=>{
            return <CourseCard key={index} course={course}/>
          })
        );
      }
      break;
    case 'division':
      if(divisions.content){
        return (divisions.content.map((division, index)=>{
            return <DivisionCard key={index} division={division}/>
          })
        );
      }
      break;
    case 'grades':
      if(grades.content){
        return (grades.content.map((grade, index)=>{
            return <GradeCard key={index} grade={grade}/>
          })
        );
      }
      break;
    case 'workshop':
      if(workshops.content){
        return (workshops.content.map((workshop, index)=>{
            return <WorkshopCard key={index} workshop={workshop}/>
          })
        );
      }
      break;
  }
}

const ProgramCard = (props) => (
  <Card
    expanded={props.program.id == props.currentExpandedProgramId}
    onExpandChange={(isExpanded)=>{
      if(props.onExpanded){
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
    <CardText expandable={true}>
      {
        entityCard(props.program.clasification, props.courses, props.divisions, props.grades, props.workshops)
      }
    </CardText>
  </Card>
);

let self;
let size = 10; //limit
let number = 0; //page

class Programs extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      size,
      number,
      incrementFactor: 10,
      currentExpandedProgramId: null
    };
    this.loadMore = this.loadMore.bind(this);
    this.onProgramExpanded = this.onProgramExpanded.bind(this);
    self = this;
  }

  async componentWillMount() {
    // type: 2 reflects all programs
    let response = await this.props.actions.programGetRequest(this.state.number, this.state.size);
  }

  async loadMore(){
    await this.props.actions.programGetRequest(this.state.number, this.state.size+this.state.incrementFactor);
    this.setState({
      size: this.state.size+this.state.incrementFactor
    })
  }

  onProgramExpanded(program, isExpanded){
    if(isExpanded){
      let entity = program.clasification;
      if(entity == 'grades'){
        entity = entity.replace('s', '');
      }
      this.props.actions.getEntityByProgramId(program.id, entity);
      this.setState({
        currentExpandedProgramId: program.id
      })
    }
    else{
      this.setState({
        currentExpandedProgramId: null
      })
    }
  }

  render(){
    let programs = this.props.programs.content || [];

    return (
      <section className="page-about chapter">
        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"><Hero /></div>
          <div key="2">
            {
              programs.map((program, index)=>{
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
          </div>
          <div key="3" className="text-center">
            <FlatButton label="Load More" primary={true} onClick={this.loadMore}/>
          </div>
        </QueueAnim>
      </section>
    )
  }
}

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
      getEntityByProgramId
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(Programs);
