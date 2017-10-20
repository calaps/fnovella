import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  programGetRequest,
  programDeleteRequest
} from '../../../../../actions';
import ListItem from './ListItem';
import Pagination from '../../../../../components/Pagination'
/** *
 * Fake element list render....
 * */
let size = 20; //limit
let number = 0; //skip
let currentPage = 0;

class ListElements extends React.Component {
  constructor(props) {
    super(props);
    this.onDeleteButton=this.onDeleteButton.bind(this);
    // this.getNext=this.getNext.bind(this);
    // this.getPrev=this.getPrev.bind(this);
  }

  // getPrev(){
  //   if(currentPage > 0){
  //     this.props.actions.programGetRequest(currentPage,number - 1,size);
  //     currentPage--;
  //   }
  // }
  // getNext(){
  //   if(currentPage === this.props.programs.totalElements){
  //     //do nothing
  //   }
  //   else if(currentPage < this.props.programs.totalElements){
  //     this.props.actions.programGetRequest(currentPage,number + 1,size);
  //     currentPage++;
  //   }
  // }
  componentWillMount() {
    // type: 2 reflects all programs
    this.props.actions.programGetRequest(currentPage,number,size);
  }
  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.programDeleteRequest(id);
  }

  render() {
    let i = 0;
    console.log('programs',this.props.programs);
    return (
      <article className="article">
        <h2 className="article-title">Lista de programas</h2>
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
                      <th className="mdl-data-table__cell--non-numeric">Id</th>
                      <th className="mdl-data-table__cell--non-numeric">Name</th>
                      <th className="mdl-data-table__cell--non-numeric">Audience</th>
                      <th className="mdl-data-table__cell--non-numeric">Decription</th>
                      <th className="mdl-data-table__cell--non-numeric">Clasification</th>
                    </tr>
                    </thead>

                    <tbody>

                     {
                      this.props.programs.content?this.props.programs.content.map((program) => {
                        return <ListItem key={program.id} onDelete={this.onDeleteButton}
                                         number={i++}
                                         onEdit={this.props.onEdit}
                                         programData={program}/>
                      }):null
                     }


                    </tbody>
                  </table>
                  <Pagination
                    //size={size}
                    //number={number}
                    //currentPage={currentPage}
                    totalElements={this.props.programs.totalElements}
                    range={this.props.programs.totalPages}
                    getRequest={this.props.actions.programGetRequest}
                  //  onClickNext={this.getNext}
                  // onClickPrev={this.getPrev}
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
