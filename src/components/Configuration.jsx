import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import withData from '../backend/withData';
import { Forms } from '../backend/queries';
import FormControlsList from './FormControlsList';
import { FormControlsListQuery } from '../backend/queries';
import AddFormControls from './AddFormControls';

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  } // end of constructor

  componentWillMount() {
    this.getFormsAsPromise();
  }

  getFormsAsPromise = () => {
    this.readData(Forms, {}).then(result => {
      console.log('Forms :', result);
      this.setState(
        { gdata: result.data.getForms },
        () => {
          this.forceUpdate();
        }
        // return result.data.getAllUsers
      );
    });
  };

  userFormatter = (cell, row, enumObject, rowIndex) => {
    // console.log('roleFormatter :', row.roles)
    return row.user.name;
  };

  handleRowSelect = (row, isSelected, e) => {
    console.log(`is selected: ${isSelected}, FormId = ${row.id}`);
    this.setState({ isSelected });
    this.getFormsControlsListAsPromise(row.id);
  };

  getFormsControlsListAsPromise = ID => {
    this.readData(FormControlsListQuery, { ID }).then(result => {
      // console.log('FormControlsList :', result);
      this.setState({ gdata1: result.data.getFormById }, () => {
        this.forceUpdate();
      });
    });
  };

  render() {
    const selectRow = {
      mode: 'radio', // single select
      clickToSelect: true,
      hideSelectColumn: false, // the radio/checkbox column will be hide
      onSelect: this.handleRowSelect, // click callback
      className: 'custom-row-select-bg'
    };

    if (this.state.gdata === undefined) {
      return <div className="pt-7"> Loading...</div>;
    } else {
      return (
        <div>
          <main role="main" className="container pt-7">
            <div className="row">
              <div className="col-md-4">
                <BootstrapTable
                  data={this.state.gdata}
                  version="4"
                  hover={true}
                  bordered={true}
                  condensed={true}
                  maxHeight="520px"
                  selectRow={selectRow}
                  pagination={true}
                  // options={options}
                  search={true}
                  searchPlaceholder="input something..."
                  exportCSV={true}
                  csvFileName="table-export"
                  tableHeaderClass="custom-table-header"
                >
                  <TableHeaderColumn
                    dataField="id"
                    isKey={true}
                    dataSort={true}
                    hidden
                    columnClassName="td-column"
                  >
                    FormId
                  </TableHeaderColumn>
                  <TableHeaderColumn dataField="name" dataSort={true}>
                    Form Name
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="user.name"
                    dataSort={true}
                    dataFormat={this.userFormatter}
                  >
                    User Name
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>

              {this.state.isSelected && (
                <div className="col-md-4">
                  <FormControlsList data={this.state.gdata1} />
                </div>
              )}

              {this.state.isSelected && (
                <div className="col-md-4">
                  <AddFormControls form={this.state.gdata1} />
                </div>
              )}
            </div>
          </main>
        </div>
      );
    }
  }
}
// make this component wrap with data
export default withData(Configuration);
