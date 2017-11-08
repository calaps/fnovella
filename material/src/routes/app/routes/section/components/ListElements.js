import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  sectionsGetRequest,
  sectionsDeleteRequest
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
    this.onDeleteButton=this.onDeleteButton.bind(this);
  }

  componentWillMount() {
    this.props.actions.sectionsGetRequest(number, size);
  }

  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.sectionsDeleteRequest(id);
  }

  render() {
    let i =0;
    return (
      <article className="article">
        <h2 className="article-title">Lista de secciones de grados</h2>
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
                      <th className="mdl-data-table__cell--non-numeric">Code</th>
                      <th className="mdl-data-table__cell--non-numeric">Jornada</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      this.props.sections.content? this.props.sections.content.map((section) => {
                        return <ListItem key={section.id} onDelete={this.onDeleteButton}
                                         number={i++}
                                         onEdit={this.props.onEdit}
                                         sectionData={section}/>
                      }): null
                    }
                    </tbody>
                  </table>

                  <Pagination
                    totalPages={this.props.sections.totalPages}
                    totalElements={this.props.sections.totalElements}
                    getRequest={this.props.actions.sectionsGetRequest}/>

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
    sections: state.sections
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      sectionsGetRequest,
      sectionsDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
