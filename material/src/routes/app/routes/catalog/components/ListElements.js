import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  catalogsGetRequest,
  catalogsDeleteRequest,
  categoriesGetRequest
} from '../../../../../actions';
import ListItem from './ListItem';
import Pagination from '../../../../../components/Pagination'

/** *
 * Fake element list render....
 * */
let size = 5; //limit
let number = 0; //page
let sort = 'category';

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteButton=this.onDeleteButton.bind(this);
  }

  componentWillMount() {
    this.props.actions.catalogsGetRequest(number, size, sort);
    this.props.actions.categoriesGetRequest();
  }

  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.catalogsDeleteRequest(id);
  }

  render() {
    let i =0;
    return (
      <article className="article">
        <h2 className="article-title">Lista de catalogos</h2>
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
                      <th className="mdl-data-table__cell--non-numeric">Type</th>
                      <th className="mdl-data-table__cell--non-numeric">Category</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      this.props.catalogs.content ? this.props.catalogs.content.map((catalog) => {
                        return <ListItem key={catalog.id} onDelete={this.onDeleteButton}
                                         number={i++}
                                         category={this.props.categories.filter((category)=>{
                                           return category.id === catalog.category
                                         })}
                                         onEdit={this.props.onEdit}
                                         catalogData={catalog}/>
                      }) : null
                    }
                    </tbody>
                  </table>
                  <Pagination
                    totalPages={this.props.catalogs.totalPages}
                    totalElements={this.props.catalogs.totalElements}
                    getRequest={this.props.actions.catalogsGetRequest}
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
    catalogs: state.catalogs,
    categories: state.categories
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      catalogsGetRequest,
      catalogsDeleteRequest,
      categoriesGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
