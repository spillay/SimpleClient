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

  //   userFormatter = (cell, row, enumObject, rowIndex) => {
  //     // console.log('roleFormatter :', row.roles)
  //     return row.user.name;
  //   };

  handleRowSelect = (row, isSelected, e) => {
    console.log(`is selected: ${isSelected}, FormId = ${row.name}`);
    this.setState({ isSelected, form: row.name });
    this.getFormsControlsListAsPromise(row.name);
  };

  getFormsControlsListAsPromise = name => {
    this.readData(FormControlsListQuery, { name }).then(result => {
      // console.log('FormControlsList :', result);
      this.setState({ gdata1: result.data.getFormByName }, () => {
        this.forceUpdate();
      });
    });
  };

  rowClassNameFormat = (row, rowIdx) => {
    // row is whole row object
    // rowIdx is index of row
    return 'tr-bt';
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
              <div className="col-md-12">
                <div className="alert alert-primary" role="alert">
                  Master Form Controls Configuration.....
                </div>{' '}
              </div>{' '}
            </div>

            <div className="row">
              <div className="col-md-2">
                <BootstrapTable
                  data={this.state.gdata}
                  version="4"
                  hover={true}
                  bordered={false}
                  condensed={true}
                  maxHeight="520px"
                  selectRow={selectRow}
                  tableHeaderClass="custom-table-header"
                >
                  <TableHeaderColumn
                    dataField="id"
                    isKey={true}
                    dataSort={true}
                    hidden
                  >
                    FormId
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="name"
                    dataSort={true}
                    columnClassName="td-column-formname"
                  >
                    Form Name
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>

              {this.state.isSelected &&
                !!this.state.gdata1 && (
                  <div className="col-md-6">
                    <FormControlsList data={this.state.gdata1} />
                  </div>
                )}

              {this.state.isSelected &&
                !!this.state.form && (
                  <div className="col-md-4">
                    <AddFormControls form={this.state.form} />
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
