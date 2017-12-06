import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import {educatorsGetRequest, educatorsDeleteRequest, educatorsGetRequestBySearch} from '../../../../../actions';
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
    this.onDeleteButton = this
      .onDeleteButton
      .bind(this);
    this.handleSearch = this
      .handleSearch
      .bind(this);
    this.state = {
      inputValue: '',
      searchValue: 'Name'
    }
  }

  componentWillMount() {
    this
      .props
      .actions
      .educatorsGetRequest(number, size);
  }

  handleSearch(e) {
    e.preventDefault();
    switch (this.state.searchValue) {
      case "Id":
        this
          .props
          .actions
          .educatorsGetRequestBySearch(this.state.inputValue, null, null);
        break;
      case "Name":
        this
          .props
          .actions
          .educatorsGetRequestBySearch(null, this.state.inputValue, null);
        break;
      case "Code":
        this
          .props
          .actions
          .educatorsGetRequestBySearch(null, null, this.state.inputValue);
        break;
      default:
        this
          .props
          .actions
          .educatorsGetRequestBySearch();
        break;
    }
  }
  onDeleteButton(id) {
    console.log("id: ", id);
    this
      .props
      .actions
      .educatorsDeleteRequest(id);
  }

  render() {
    let i = 0;
    return (
      <article className="article">
        <h2 className="article-title">Lista de educadores</h2>
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
                      <option value="Name">por Nombre</option>
                      <option value="Id">por ID</option>
                      <option value="Code">By App Code</option>
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
                  <table className="mdl-data-table table-striped">
                    <thead>
                      <tr>
                        <th className="mdl-data-table__cell--non-numeric">#</th>
                        <th className="mdl-data-table__cell--non-numeric">id</th>
                        <th className="mdl-data-table__cell--non-numeric">Nombre</th>
                        <th className="mdl-data-table__cell--non-numeric">Email</th>
                        <th className="mdl-data-table__cell--non-numeric">Genero</th>
                        <th className="mdl-data-table__cell--non-numeric">Departamento</th>
                        <th className="mdl-data-table__cell--non-numeric">Celular</th>
                        <th className="mdl-data-table__cell--non-numeric">App Code</th>
                      </tr>
                    </thead>
                    <tbody>

                      {this.props.teachers.content
                        ? this
                          .props
                          .teachers
                          .content
                          .map((teacher) => {
                            return <ListItem
                              key={teacher.id}
                              onDelete={this.onDeleteButton}
                              number={i++}
                              onEdit={this.props.onEdit}
                              teacherData={teacher}/>
                          })
                        : null
}

                    </tbody>
                  </table>
                  <Pagination
                    totalPages={this.props.teachers.totalPages}
                    totalElements={this.props.teachers.totalElements}
                    getRequest={this.props.actions.educatorsGetRequest}/>
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
  return {teachers: state.educators}
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      educatorsGetRequest,
      educatorsGetRequestBySearch,
      educatorsDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ListElements);
