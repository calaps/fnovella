import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  privilegesGetAllRequest,
  privilegesDeleteRequest
} from '../../../../../actions';
import ListItem from './ListItem';

/** *
 * Fake element list render....
 * */

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      privileges: []
    };
    this.onDeleteButton = this.onDeleteButton.bind(this);
  }
  componentWillMount() {
    this.props.actions.privilegesGetAllRequest().then(data => {
      this.setState({ privileges: data.data });
    });
  }

  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.privilegesDeleteRequest(id);
  }

  render() {
    let i = 1;
    return (
      <article className="article">
        <h2 className="article-title">Lista de privilegios</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table table-striped">
                    <thead>
                      <tr>
                        <th className="mdl-data-table__cell--non-numeric">#</th>
                        <th className="mdl-data-table__cell--non-numeric">Nombre de privilegio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.state.privileges.map((privilege) => {
                          return <ListItem key={privilege.id}
                            onDelete={this.onDeleteButton}
                            onEdit={this.props.onEdit}
                            number={i++}
                            privilegeData={privilege} />
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
    privileges: state.privileges
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      privilegesGetAllRequest,
      privilegesDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
