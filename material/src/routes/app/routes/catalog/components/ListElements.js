import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  catalogsGetRequest,
  catalogsDeleteRequest,
  categoriesGetRequest,
  catalogsGetByCategoryRequest
} from '../../../../../actions';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
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
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      searchValue: 'category',
      inputValue: ''
    };
  }

  componentWillMount() {
    this.props.actions.catalogsGetRequest(number, size, sort);
    this.props.actions.categoriesGetRequest();
  }

  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.catalogsDeleteRequest(id);
  }
  handleSearch(e) {
    e.preventDefault();
    switch (this.state.searchValue) {
      case "category":
        this
          .props
          .actions
          .catalogsGetByCategoryRequest(this.state.inputValue);
        break;
      default:
        this
          .props
          .actions
          .catalogsGetByCategoryRequest();
        break;
    }
  }
  render() {
    let i =0;
    return (
      <article className="article">
        <h2 className="article-title">Lista de catalogos</h2>
        <div className="row">
          <div className="col-xl-12">
            <div className="box box-transparent">
            <form onSubmit={this.handleSearch}>

                <div className="row">
                  <div className="col-xl-5">
                    <div >Búsqueda avanzada</div>
                  </div>
                  <div className="col-xl-7 text-right">
                    <input
                      style={{
                      margin: 5,
                      padding: 5
                    }}
                      type='text'
                      value={this.state.inputValue}
                      onChange={(e) => {
                      this.setState({inputValue: e.target.value})
                    }}/>
                    <select
                      style={{
                      padding: 5,
                      margin: 5,
                      height: 34
                    }}
                      onChange={(e) => {
                      this.setState({searchValue: e.target.value})
                    }}
                      value={this.state.searchValue}>
                      <option value="category">by category</option>
                    </select>
                    <IconButton
                      iconStyle={{
                      color: 'white'
                    }}
                      style={{
                      margin: 5,
                      height: 34,
                      width: 34,
                      backgroundColor: '#49a54e',
                      padding: 5
                    }}
                      type="submit"
                      className="btn btn-primary"><Search/></IconButton>
                  </div>
                </div>
              </form>
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
      categoriesGetRequest,
      catalogsGetByCategoryRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
