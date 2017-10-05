import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  programGetRequest,
  programDeleteRequest
} from '../../../../../actions';
import ListItem from './ListItem';
/** *
 * Fake element list render....
 * */

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteButton=this.onDeleteButton.bind(this);
  }
  componentWillMount() {
    // type: 2 reflects all programs
    this.props.actions.programGetRequest(null, {type: 2});
  }
  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.programDeleteRequest(id);
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
                      <th className="mdl-data-table__cell--non-numeric">Name</th>
                      <th className="mdl-data-table__cell--non-numeric">Audience</th>
                      <th className="mdl-data-table__cell--non-numeric">Decription</th>
                      <th className="mdl-data-table__cell--non-numeric">Clasification</th>
                    </tr>
                    </thead>

                    <tbody>

                    {
                      this.props.programs.map((program) => {
                        return <ListItem key={program.id} onDelete={this.onDeleteButton}
                                         onEdit={this.props.onEdit}
                                         programData={program}/>
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
    programs: state.programs
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      programGetRequest,
      programDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
