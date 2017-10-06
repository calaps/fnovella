import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  sedesGetRequest,
  sedesDeleteRequest
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
    this.props.actions.sedesGetRequest();
  }
  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.sedesDeleteRequest(id);
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
                      <th className="mdl-data-table__cell--non-numeric">#</th>
                      <th className="mdl-data-table__cell--non-numeric">Material</th>
                      <th>Quantity</th>
                      <th>Unit price</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                      this.props.locations.map((location) => {
                        return <ListItem key={location.id} onDelete={this.onDeleteButton}
                                         onEdit={this.props.onEdit}
                                         locationData={location}/>
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
    locations: state.sedes
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      sedesGetRequest,
      sedesDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
