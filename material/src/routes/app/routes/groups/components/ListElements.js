import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  groupsGetRequest,
  groupsDeleteRequest,
} from '../../../../../actions';
import ListItem from './ListItem';
import Pagination from '../../../../../components/Pagination'

let size = 10; //limit
let number = 0; //page

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteButton = this.onDeleteButton.bind(this);
  }

  componentWillMount() {
    this.props.actions.groupsGetRequest(number, size);
  }

  onDeleteButton(id) {
    this.props.actions.groupsDeleteRequest(id);
  }

  render() {
    let i = 1;
    return (
      <article className="article">

        <div className="container-fluid with-maxwidth">
          <div className="row">
            <div className="col-xl-12">
              <div className="box box-default">
                <div className="box-body">
                  <div className="icon-box ibox-plain ibox-center">
                    <div className="ibox-icon">
                      <a href="javascript:;">
                        <i className="material-icons">insert_chart</i>
                      </a>
                    </div>
                    <h6>Todos los programas</h6>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <h2 className="article-title">Lista de completa</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table">
                    <thead>
                    <tr>
                      <th className="mdl-data-table__cell--non-numeric">#</th>
                      <th className="mdl-data-table__cell--non-numeric">Correlativo</th>
                      <th className="mdl-data-table__cell--non-numeric">Type</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                      this.props.groups.content ? this.props.groups.content.map((group) => {
                        return <ListItem key={group.id} onDelete={this.onDeleteButton}
                                         number={i++}
                                         onEdit={this.props.onEdit}
                                         onView={this.props.onView}
                                         groupData={group}/>
                      }) : null
                    }

                    </tbody>
                  </table>
                  <Pagination
                    totalPages={this.props.groups.totalPages}
                    totalElements={this.props.groups.totalElements}
                    getRequest={this.props.actions.groupsGetRequest}
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
      </article>
    );

  }
}

function mapStateToProps(state) {
  //pass the providers
  return {
    groups: state.groups
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      groupsGetRequest,
      groupsDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
