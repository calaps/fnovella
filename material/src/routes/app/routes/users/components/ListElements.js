import React from "react";
import ListItem from "./ListItem";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  usersGetRequest,
  usersDeleteRequest
} from '../../../../../actions';
/** *
 * Fake element list render....
 * */

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteButton=this.onDeleteButton.bind(this)
    }

  componentWillMount(){
    console.log("running component will mount");
    // API action
    this.props.actions.usersGetRequest();
  }

  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.usersDeleteRequest(id);
  }

  render() {
    return (
      <article className="article">
        <h2 className="article-title">Lista de catalogos</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
              <div className="box-header no-padding-h">Basic table</div>
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table">
                    <thead>
                    <tr>
                      <th className="mdl-data-table__cell--non-numeric">FirstName</th>
                      <th className="mdl-data-table__cell--non-numeric">LastName</th>
                      <th className="mdl-data-table__cell--non-numeric">Email</th>
                      <th className="mdl-data-table__cell--non-numeric">CellPhone</th>
                      <th className="mdl-data-table__cell--non-numeric">Gender</th>
                      <th className="mdl-data-table__cell--non-numeric">Date of Birth</th>
                    </tr>
                    </thead>

                    <tbody>


                    {
                      this.props.users.map((user) => {
                        return <ListItem key={user.id} onDelete={this.onDeleteButton}
                                         onEdit={this.props.onEdit}
                                         userData={user}/>
                      })
                    }
                    </tbody>
                  </table>

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
    users: state.users
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      usersGetRequest,
      usersDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);

