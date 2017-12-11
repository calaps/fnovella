import React from 'react';
import QueueAnim from 'rc-queue-anim';
import EditForm from './EditForm';
import ListElements from './ListElements';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'; //for user prop-types
import {bindActionCreators} from 'redux';
import {
  sectionGetByIdRequest,
} from '../../../../../actions';

const optionsName = "Sección";

class MainOptions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <article className="article padding-lg-v article-bordered">
        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-3">

              <div className="box-body">
                <div className="icon-box ibox-plain ibox-center">
                  <div className="ibox-icon">
                    <a href="javascript:;"><i className="material-icons">view_week</i></a>
                  </div>
                  <h5>{optionsName}es</h5>
                </div>
              </div>

            </div>
            <div className="col-xl-9">
              <div className="row">

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div onClick={() => this.props.changeView("VIEW_ELEMENT")}
                           className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon">
                          <a href="javascript:;"><i className="material-icons">remove_red_eye</i></a>
                        </div>
                        <h6>Visualizar {optionsName}</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div onClick={() => this.props.changeView("ADD_ELEMENT")}
                           className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon">
                          <a href="javascript:;"><i className="material-icons">add_circle_outline</i></a>
                        </div>
                        <h6>Agregar {optionsName}</h6>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4">
                  <div className="box box-default">
                    <div className="box-body">
                      <div className="icon-box ibox-plain ibox-center">
                        <div className="ibox-icon">
                          <a href="#/app/grade"><i className="material-icons">library_books</i></a>
                        </div>
                        <h6>Grados</h6>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </article>
    )
  };
}


class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "VIEW_ELEMENT",
      sectionData: {}
    };
    this.changeView = this.changeView.bind(this); //bind this element
    this.onEditCatalog = this.onEditCatalog.bind(this);
    this.onCreateGroup = this.onCreateGroup.bind(this);
    this.onViewGroup = this.onViewGroup.bind(this);
  }

  componentWillMount() {
    if (this.props.location.query.id) {
      this.props.actions.sectionGetByIdRequest(this.props.location.query.id)
        .then((response) => {
          this.onEditCatalog(response.data);
        });
    }
  }

  onEditCatalog(sectionData) {
    this.setState({sectionData});

    this.changeView('ADD_ELEMENT', false);
  }

  changeView(data, reset = true) {
    if (reset) {
      this.setState({sectionData: {}})
    }
    this.setState({active: data});
  }

  onCreateGroup(sectionId) {
    this.context.router.push({
      pathname: '/app/groups',
      query: {
        sectionId: sectionId,
        typeCategory: 'section',
        add : 'true'
      }
    })
  }

  onViewGroup(sectionId) {
    this.context.router.push({
      pathname: '/app/groups',
      query: {
        id: sectionId,
        typeCategory: 'section',
        view : 'true'
      }
    })
  }

  activeView() {
    switch (this.state.active) {
      case 'ADD_ELEMENT':
        return <EditForm changeView={this.changeView} sectionData={this.state.sectionData}/>;
      case "VIEW_ELEMENT":
        return <ListElements onEdit={this.onEditCatalog} onViewGroup={this.onViewGroup} onCreateGroup={this.onCreateGroup}/>;
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

//To get the routers
Section.contextTypes = {
  router: PropTypes.object.isRequired
};

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      sectionGetByIdRequest
    }, dispatch)
  };
}

module.exports = connect(
  null,
  mapDispatchToProps,
)(Section);
