import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  catalogsGetRequest,
  catalogsDeleteRequest,
  categoriesGetRequest
} from '../../../../../actions';
import ListItem from './ListItem';

/** *
 * Fake element list render....
 * */

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteButton=this.onDeleteButton.bind(this);
    this.sortByKey=this.sortByKey.bind(this);
  }

  componentWillMount() {
    this.props.actions.catalogsGetRequest();
    this.props.actions.categoriesGetRequest();
  }

  sortByKey(array, key){
    return array.sort(function(a, b) {
      let x = a[key]; let y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }


  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.catalogsDeleteRequest(id);
  }

  render() {
    let i =0;
    let array  = this.sortByKey(this.props.catalogs,'category');
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
                      array?array.map((catalog) => {
                        return <ListItem key={catalog.id} onDelete={this.onDeleteButton}
                                         number={i++}
                                         category={this.props.categories.filter((category)=>{
                                           return category.id === catalog.category
                                           })}
                                         onEdit={this.props.onEdit}
                                         catalogData={catalog}/>
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
