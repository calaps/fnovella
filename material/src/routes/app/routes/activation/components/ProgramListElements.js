import React from "react";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  programGetRequest,
  programActivationsGetRequest,
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
    console.log("XDXDXDXD KEY XDXDXD: "+ key);
    this.setState({
      selectedRow: key,
      programId: this.props.programs.content[key[0]].id,
      clasification: this.props.programs.content[key[0]].clasification
    });
  }

  componentWillMount() {
    this.props.actions.programActivationsGetRequest(number, size).then(() => {
      this.props.actions.programGetRequest(number, size);
    });
  }

  render() {
    let tableRows = [];
    let data = {
      programId: this.state.programId,
      programClasification: this.state.clasification
    };
    let findMatch = '';
    let sameYearActivation = false;
    let numberRow = -1;
    const currentYear = (new Date).getFullYear();
    for (let i = 0; i < this.props.programs.numberOfElements; i++) {
      // Does it have an activation?
      findMatch = this.props.programActivations.content.findIndex((element) => {
        return element.programId === this.props.programs.content[i].id;
      });
      if (findMatch !== -1) { // If activation exist then it is the same year?
        sameYearActivation = (this.props.programActivations.content[findMatch].year === currentYear);
      }
      if (findMatch === -1) {
        numberRow = numberRow +1;
        tableRows.push(
          <TableRow key={numberRow} selected={this.state.selectedRow.indexOf(numberRow) !== -1}>
            <TableRowColumn>key: {numberRow}</TableRowColumn>
            <TableRowColumn>{this.props.programs.content[i].name}</TableRowColumn>
            <TableRowColumn>{this.props.programs.content[i].description}</TableRowColumn>
          </TableRow>
        );
      } else if (sameYearActivation === false) {
        numberRow = numberRow +1;
        tableRows.push(
          <TableRow key={numberRow} selected={this.state.selectedRow.indexOf(numberRow) !== -1}>
            <TableRowColumn>key: {numberRow}</TableRowColumn>
            <TableRowColumn>{this.props.programs.content[i].name}</TableRowColumn>
            <TableRowColumn>{this.props.programs.content[i].description}</TableRowColumn>
          </TableRow>
        );
      }
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
            label='cancelar'
            style={{marginRight: 12}}
            onTouchTap={this.props.handleCancel}
          />
          <RaisedButton
            label='siguiente'
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
    programs: state.programs,
    programActivations: state.programActivations
  }
}

/* Map Actions to Props */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      programGetRequest,
      programActivationsGetRequest
    }, dispatch)
  };
}

module.exports = connect(
  mapStateToProps, mapDispatchToProps
)(ProgramsListElements);
