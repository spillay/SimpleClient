import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import withData from '../backend/withData';
import { Forms } from '../backend/queries';
import FormControlsListInitial from './FormControlsListInitial';
import UserExcludeFormControlsList from './UserExcludeFormControlsList';
import {
  FormControlsListQuery,
  UserFormControlsListQuery
} from '../backend/queries';

class UFCConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      controls: []
    };
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

  handleRowSelect = (row, isSelected, e) => {
    console.log(`is selected: ${isSelected}, FormId = ${row.name}`);
    this.setState({ isSelected, form: row.name });
    this.getFormsControlsListAsPromise(row.name);
    this.getUserFormsControlsListAsPromise('bhaskarv20@gmail.com', row.name);
    // this.getDataMerge();
  };

  getFormsControlsListAsPromise = name => {
    this.readData(FormControlsListQuery, { name }).then(result => {
      this.setState({ gdata1: result.data.getFormByName }, () => {
        // this.forceUpdate();
      });
    });
    this.forceUpdate();
  };

  getUserFormsControlsListAsPromise = (user, form) => {
    this.readData(UserFormControlsListQuery, { user, form }).then(result => {
      this.setState({ gdata2: result.data.getUFC }, () => {});
    });
    this.forceUpdate();
  };

  //   getDataMerge = () => {
  //     // console.log('gdata1 :',this.state.gdata1,'gdata2 :',this.state.gdata2)
  //     if (this.state.gdata1 !== undefined) {
  //       this.setState(
  //         {
  //           controls: this.state.gdata1.controls.filter(g1 => {
  //             return g1.id !== '5b5043c7319b8e2540194cea';
  //           })
  //         },
  //         () => {
  //           console.log('state :', this.state);
  //         }
  //       );
  //     }
  //   };

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
                  User Form Controls Configuration.....
                </div>{' '}
              </div>{' '}
            </div>

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
                </BootstrapTable>
              </div>
              {this.state.isSelected &&
                !!this.state.gdata1 && (
                  <div className="col-md-4">
                    <FormControlsListInitial
                      data={this.state.gdata1}
                      user="bhaskarv20@gmail.com"
                      form={this.state.form}
                    />
                  </div>
                )}
              {this.state.isSelected &&
                !!this.state.gdata2 && (
                  <div className="col-md-4">
                    <UserExcludeFormControlsList
                      data={this.state.gdata2}
                      user="bhaskarv20@gmail.com"
                      form={this.state.form}
                    />
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
export default withData(UFCConfiguration);
