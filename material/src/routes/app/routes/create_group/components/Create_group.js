import React from 'react';
import HorizontalLinearStepper from './HorizontalLinearStepper';
import QueueAnim from 'rc-queue-anim';
import ListElements from './ListElements';

const optionsName = "Activación de grupo";

class MainOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-12">

              <div className="box-body">
                <div className="icon-box ibox-plain ibox-center">
                  <div className="ibox-icon">
                    <a href="javascript:;"><i className="material-icons">book</i></a>
                  </div>
                  <h5>{optionsName}s</h5>
                </div>
              </div>

            </div>
          </div>

        </div>
      </article>
    )
  };
}

class Create_group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "VIEW_ELEMENT",
      groupData: {}
    };
    this.onEditGroup = this.onEditGroup.bind(this);
    this.onViewGroup = this.onViewGroup.bind(this);
    this.changeView = this.changeView.bind(this); //bind this element
  }

  componentWillMount() {
    if (this.props.location.query.typeCategory) {
      this.changeView('ADD_ELEMENT', false);
    }
  }

  onEditGroup(groupData) {
    /*this.setState({groupData});
    this.changeView('ADD_ELEMENT', false);*/
  }

  onViewGroup(id) {
    /*this.setState({groupData});
    this.changeView('ADD_ELEMENT', false);*/
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
        return <HorizontalLinearStepper changeView={this.changeView} groupData={this.state.groupData} />;
      case "VIEW_ELEMENT":
        return <ListElements onEdit={this.onEditGroup} onView={this.onViewGroup}/>;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className="container-fluid no-breadcrumbs page-dashboard">

        <QueueAnim type="bottom" className="ui-animate">
          <div key="1"><MainOptions changeView={this.changeView}/></div>
          <hr/>
          <div key="2">{this.activeView()}</div>
        </QueueAnim>

      </div>
    );
  }
}

module.exports = Create_group;
