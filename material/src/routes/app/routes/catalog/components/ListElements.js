import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  catalogsGetRequest,
  catalogsDeleteRequest
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
    this.props.actions.catalogsGetRequest();
  }

  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.programDeleteRequest(id);
  }
  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.catalogsDeleteRequest(id);
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
                      <th className="mdl-data-table__cell--non-numeric">Type</th>
                      <th className="mdl-data-table__cell--non-numeric">Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      this.props.catalogs.map((catalog) => {
                        return <ListItem key={catalog.id} onDelete={this.onDeleteButton}
                                         onEdit={this.props.onEdit}
                                         catalogData={catalog}/>
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
    catalogs: state.catalogs
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      catalogsGetRequest,
      catalogsDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
