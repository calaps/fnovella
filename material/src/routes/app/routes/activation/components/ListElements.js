import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  programActivationsGetRequest,
} from '../../../../../actions';
import ListItem from './ListItem';

class ListElements extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.programActivationsGetRequest();
  }

  render() {
    let i =0;
    return (
      <article className="article">
        <h2 className="article-title">Lista de programas</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
              <div className="box-body no-padding-h">

                <div className="box box-default table-box mdl-shadow--2dp">
                  <table className="mdl-data-table">
                    <thead>
                    <tr>
                      <th className="mdl-data-table__cell--non-numeric">#</th>
                      <th className="mdl-data-table__cell--non-numeric">id</th>
                      <th className="mdl-data-table__cell--non-numeric">Name</th>
                      <th className="mdl-data-table__cell--non-numeric">Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      this.props.programActivations.content?       this.props.programActivations.content.map((program) => {
                        return <ListItem key={program.id}
                                         number={i++}
                                         programActivationsData={program}/>
                      }):null

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
    programActivations: state.programActivations
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      programActivationsGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
