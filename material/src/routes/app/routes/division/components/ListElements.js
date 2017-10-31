import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  workshopsGetRequest,
  workshopsDeleteRequest
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
    this.props.actions.workshopsGetRequest(number, size);
  }

  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.workshopsDeleteRequest(id);
  }

  render() {
    let i = 0;
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
                      <th className="mdl-data-table__cell--non-numeric">Id</th>
                      <th className="mdl-data-table__cell--non-numeric">Name</th>
                      <th className="mdl-data-table__cell--non-numeric">Description</th>
                    </tr>
                    </thead>

                    <tbody>

                    {
                      this.props.workshops.content ? this.props.workshops.content.map((workshop) => {
                        return <ListItem key={workshop.id} onDelete={this.onDeleteButton}
                                         number={i++}
                                         onEdit={this.props.onEdit}
                                         workshopData={workshop}/>
                      }) : null
                    }


                    </tbody>
                  </table>
                  <Pagination
                    totalPages={this.props.workshops.totalPages}
                    totalElements={this.props.workshops.totalElements}
                    getRequest={this.props.actions.workshopsGetRequest}
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
    workshops: state.workshops
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      workshopsGetRequest,
      workshopsDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);

