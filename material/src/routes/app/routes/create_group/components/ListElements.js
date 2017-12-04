import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  groupsGetRequest,
  groupsDeleteRequest,
} from '../../../../../actions';
import ListItem from './ListItem';
import Pagination from '../../../../../components/Pagination'

/** *
 * Fake element list render....
 * */
let size = 5; //limit
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
    console.log("id: ", id);
    this.props.actions.groupsDeleteRequest(id);
  }

  render() {
    let i = 1;
    return (
      <article className="article">
        <h2 className="article-title">Lista de grupos</h2>
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
