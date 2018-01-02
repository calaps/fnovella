import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  programGetRequest
} from '../../../../../actions';
import Pagination from '../../../../../components/Pagination';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from 'material-ui/Table';

let size = 10; //limit
let number = 0; //page

class ProgramsListElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: [],
      programId: null,
      clasification: 'no data',
    };
    {/* Makes a Bind of the actions, onChange, onSummit */
    }
    this.onRowSelection = this.onRowSelection.bind(this);
  }

  onRowSelection(key) {
    this.setState({
      selectedRow: key,
      programId: this.props.programs.content[key[0]].id,
      clasification: this.props.programs.content[key[0]].clasification
    });
  }

  componentWillMount() {
    this.props.actions.programGetRequest(number, size);
  }

  render() {
    let tableRows = [];
    let data = {
      programId: this.state.programId,
      programClasification: this.state.clasification
    };
    for (let i = 0; i < this.props.programs.numberOfElements; i++) {
      tableRows.push(
        <TableRow key={i} selected={this.state.selectedRow.indexOf(i) !== -1}>
          <TableRowColumn>{[i + 1]}</TableRowColumn>
          <TableRowColumn>{this.props.programs.content[i].name}</TableRowColumn>
          <TableRowColumn>{this.props.programs.content[i].description}</TableRowColumn>
        </TableRow>
      )
    }
    return (
      <div>
        <Table onRowSelection={this.onRowSelection}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>#</TableHeaderColumn>
              <TableHeaderColumn>Nombre</TableHeaderColumn>
              <TableHeaderColumn>Descripción</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            deselectOnClickaway={false}
          >
            {tableRows}
          </TableBody>
          <TableFooter>
            <Pagination
              totalPages={this.props.programs.totalPages}
              totalElements={this.props.programs.totalElements}
              getRequest={this.props.actions.programGetRequest}
            />
          </TableFooter>
        </Table>
        <div style={{marginTop: 12}}>
          <FlatButton
            label='Cancelar'
            style={{marginRight: 12}}
            onTouchTap={this.props.handleCancel}
          />
          <RaisedButton
            label='Continuar'
            primary
            onTouchTap={() => {
              this.props.handleNext(data)
            }}
          />
        </div>
      </div>
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
      programGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ProgramsListElements);
