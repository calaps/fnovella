import React from 'react';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import QueueAnim from 'rc-queue-anim';
import ListElements from './ListElements';
import GroupDetails from './GroupDetails';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  groupGetByEntityIdRequest
} from '../../../../../actions';
import PropTypes from 'prop-types';

class Groups extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'VIEW_LIST',
      groupData: {}
    };
    this.onEditGroup = this.onEditGroup.bind(this);
    this.onViewGroup = this.onViewGroup.bind(this);
    this.changeView = this.changeView.bind(this);
    this.getGroup = this.getGroup.bind(this);
    this.onRouterPush = this.onRouterPush.bind(this);
  }

  componentWillMount() {
    if (this.props.location.query.add === 'true') {
      this.changeView('ADD_ELEMENT', false);
    }
    else if(this.props.location.query.view === 'true'){
      let typeCategory = this.props.location.query.typeCategory;
      switch (typeCategory){
        case 'workshop':
          this.getGroup(typeCategory,this.props.location.query.id);
          break;
        case 'section':
          this.getGroup(typeCategory,this.props.location.query.id);
          break;
        case 'division':
          this.getGroup(typeCategory,this.props.location.query.id);
          break;
        case 'course':
          this.getGroup(typeCategory,this.props.location.query.id);
          break;
      }
    }
  }

  getGroup(type, id){
    this.props.actions.groupGetByEntityIdRequest(type, id)
      .then(
        (response)=>{
          if(response){
            this.onViewGroup(response.data.content[0])
          }
        }
      );
  }

  onEditGroup(groupData) {
    /* this.setState({groupData});
    this.changeView('ADD_ELEMENT', false); */
  }

  onViewGroup(groupData) {
    if(this.props.location.query.view === 'true'){
      this.setState({groupData});
      this.changeView('VIEW_GROUP', false);
    }else{
      switch(groupData.typeCategory){
        case 'workshop':
          this.onRouterPush(groupData,groupData.workshopId);
          break;
        case 'section':
          this.onRouterPush(groupData,groupData.section);
          break;
        case 'division':
          this.onRouterPush(groupData,groupData.divisionId);
          break;
        case 'course':
          this.onRouterPush(groupData,groupData.courseId);
          break;
    }
  }
  }

  onRouterPush(groupData, id){
      this.context.router.push({
        pathname: '/app/groups',
        query: {
          id: id,
          typeCategory: groupData.typeCategory,
          view: 'true'
        }
      });
    this.setState({groupData});
    this.changeView('VIEW_GROUP', false);
  }

  changeView(data, reset = true) {
    if (reset) {
      this.setState({groupData: {}})
    }
    this.setState({active: data});
  }

  activeView() {
    switch (this.state.active) {
      case 'ADD_ELEMENT':
        return <HorizontalLinearStepper changeView={this.changeView} groupData={this.state.groupData}/>;
      case 'VIEW_LIST':
        return <ListElements onEdit={this.onEditGroup} onView={this.onViewGroup}/>;
      case 'VIEW_GROUP':
        return <GroupDetails groupData={this.state.groupData}/>;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">

        <QueueAnim type="bottom" className="ui-animate">
          <div key="2">{this.activeView()}</div>
        </QueueAnim>

      </div>
    );
  }
}

Groups.contextTypes = {
  router: PropTypes.object.isRequired
};

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      groupGetByEntityIdRequest
    }, dispatch)
  };
}

module.exports = connect(
  null,
  mapDispatchToProps,
)(Groups);
