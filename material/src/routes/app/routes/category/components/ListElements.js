import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  categoriesGetRequest,
  categoriesDeleteRequest
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
    this.props.actions.categoriesGetRequest();
  }

  onDeleteButton(id) {
    console.log("id: ", id);
    this.props.actions.categoriesDeleteRequest(id);
  }

  render() {
    let i =0;
    return (
      <article className="article">
        <h2 className="article-title">Lista de categorias</h2>
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
                      this.props.categories.map((category) => {
                        return <ListItem key={category.id} onDelete={this.onDeleteButton}
                                         number={i++}
                                         onEdit={this.props.onEdit}
                                         categoryData={category}/>
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
    categories: state.categories
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      categoriesGetRequest,
      categoriesDeleteRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ListElements);
