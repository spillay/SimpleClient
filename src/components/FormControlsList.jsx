import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import withData from '../backend/withData';

class FormControlsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  } // end of constructor
  typeFormatter = (cell, row, enumObject, rowIndex) => {
    return row.type.name;
  };
  columnClassNameFormat = (fieldValue, row, rowIdx, colIdx) => {
    // fieldValue is column value
    // row is whole row object
    // rowIdx is index of row
    // colIdx is index of column
    return fieldValue === 'yes' ? 'required-yes' : 'required-no';
  };

  rowClassNameFormat = (row, rowIdx) => {
    // row is whole row object
    // rowIdx is index of row
    return row.mandatory === 'yes' ? 'required-yes' : 'required-no';
  };

  render() {
    if (this.props.data === undefined) {
      return <div className="pt-7" />;
    } else {
      return (
        <div>
          {this.props.data.name}
          <BootstrapTable
            data={this.props.data.controls}
            version="4"
            hover={true}
            bordered={true}
            condensed={true}
            maxHeight="520px"
            pagination={true}
            search={true}
            searchPlaceholder="input something..."
            exportCSV={true}
            csvFileName="table-export"
            tableHeaderClass="custom-table-header"
            trClassName={this.rowClassNameFormat}
          >
            <TableHeaderColumn
              dataField="id"
              isKey={true}
              dataSort={true}
              hidden
            >
              ControlId
            </TableHeaderColumn>
            <TableHeaderColumn dataField="key" dataSort={true}>
              Key
            </TableHeaderColumn>
            <TableHeaderColumn dataField="label" dataSort={true} width="250">
              Label
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="type.name"
              dataSort={true}
              dataFormat={this.typeFormatter}
            >
              Type
            </TableHeaderColumn>
            <TableHeaderColumn dataField="mandatory" dataSort={true}>
              mandatory
            </TableHeaderColumn>
          </BootstrapTable>
        </div>
      );
    }
  }
} // end of FormControlsList

export default withData(FormControlsList);

/*
columnClassName={ this.columnClassNameFormat }
*/
