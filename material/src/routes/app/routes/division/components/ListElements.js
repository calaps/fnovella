import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  divisionsGetRequest,
  divisionsDeleteRequest
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
    // type: 2 reflects all programs
    this.props.actions.divisionsGetRequest(number, size);
  }

  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.divisionsDeleteRequest(id);
  }

  render() {
    let i = 1;
    return (
      <article className="article">
        <h2 className="article-title">Lista de talleres</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table">
                    <thead>
                    <tr>
                      <th className="mdl-data-table__cell--non-numeric">#</th>
                      <th className="mdl-data-table__cell--non-numeric">Name</th>
                      <th className="mdl-data-table__cell--non-numeric">Description</th>
                    </tr>
                    </thead>

                    <tbody>

                    {
                      this.props.divisions.content ? this.props.divisions.content.map((division) => {
                        return <ListItem key={i} onDelete={this.onDeleteButton}
                                         number={i++}
                                         onEdit={this.props.onEdit}
                                         onCreateGroup={this.props.onCreateGroup}
                                         divisionData={division}/>
                      }) : null
                    }


                    </tbody>
                  </table>
                  <Pagination
                    totalPages={this.props.divisions.totalPages}
                    totalElements={this.props.divisions.totalElements}
                    getRequest={this.props.actions.divisionsGetRequest}
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
    divisions: state.divisions
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      divisionsGetRequest,
      divisionsDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);

