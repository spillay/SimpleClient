import React from 'react';
import ErrorBoundary from '../utils/ErrorBoundary';
import { DynamicForm } from '../DynamicForm/DynamicForm';
import { searchUsersForm } from '../forms/form.json';
import withData from '../backend/withData';
import { SearchUsersQuery } from '../backend/queries';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import UserDeleteModal from '../Modal/UserDeleteModal';
import UserEditModal from '../Modal/UserEditModal';

class SearchUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      errors: [],
      isEditable: undefined,
      selectedUser: undefined
    };
  }

  reload = () => {
    this.forceUpdate();
  };

  checkStage = () => {
    // console.log("checkStage")
    if (this.dynForm === undefined) {
      return true;
    }
    // console.log("before switch :", this.dynForm.state.stage)
    switch (this.dynForm.state.stage) {
      case 'Initial':
      case 'Incomplete':
        return true;
      case 'Complete':
        return false;
      default:
        return true;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.dynForm.checkValidations() === true) {
      var data = this.dynForm.getData();
      this.setState({ submitted: true });
      console.log('now you can submit...', data);
      this.searchUserAsPromise(SearchUsersQuery, data); // search query
    }
  };

  searchUserAsPromise = (SearchUsersQuery, data) => {
    this.readData(SearchUsersQuery, { name: data.username }) // return a promise
      .then(result => {
        // console.log("SearchUsers :",result.data)
        this.setState({ gdata: result });
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  };

  roleFormatter = (cell, row, enumObject, rowIndex) => {
    // console.log('roleFormatter :', row.roles)
    return row.roles.map(r => {
      return r.name;
    });
  };

  buttonFormatterEdit = (cell, row, enumObject, rowIndex) => {
    return (
      <button
        type="button"
        className="btn btn-sm btn-outline-success"
        data-toggle="tooltip"
        data-placement="top"
        title="Edit"
        onClick={this.handleEditUser(row.userId)}
      >
        <i className="fa fa fa-pencil-square-o" aria-hidden="true" />
      </button>
    );
  };

  handleEditUser = userId => {
    // console.log("handleEditUser",userId)
    return e => {
      this.setState({ isEditable: true, selectedUser: userId }); //  loading show text
      console.log(`EditUserId:${userId}`);
    };
  };

  buttonFormatterDelete = (cell, row, enumObject, rowIndex) => {
    return (
      <button
        type="button"
        className="btn btn-sm btn-outline-danger"
        data-toggle="tooltip"
        data-placement="top"
        title="Delete"
        onClick={this.handleDeleteUser(row.userId)}
      >
        <i className="fa fa fa-trash" aria-hidden="true" />
      </button>
    );
  };

  handleDeleteUser = userId => {
    return e => {
      this.setState(() => ({ selectedUser: userId, isEditable: false })); // override the previous value
      console.log(`DeleteUserId:${userId}`);
    };
  };

  handleOpenModal = () => {
    // If the confirmation is true, call the function that
    this.setState(() => ({ selectedUser: undefined })); // override the previous value
  };

  handleCloseModal = () => {
    this.setState(() => ({ selectedUser: undefined })); // override the previous value
  };

  onRowSelect = (row, isSelected, e) => {
    console.log(`is selected: ${isSelected}, UserId = ${row.userId}`);
  };

  render() {
    const selectRowProp = {
      mode: 'radio', //radio or checkbox
      clickToSelect: true,
      hideSelectColumn: true,
      columnWidth: '40px',
      className: 'custom-row-select-bg'
    };

    const options = {
      clearSearch: true,
      clearSearchBtn: this.createCustomClearButton,
      page: 1, // which page you want to show as default
      sizePerPageList: [
        {
          text: '10',
          value: 10
        },
        {
          text: '25',
          value: 25
        },
        {
          text: '35',
          value: 35
        }
      ], // you can change the dropdown list for size per page
      sizePerPage: 10, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3, // the pagination bar size.
      prePage: 'Prev', // Previous page button text
      nextPage: 'Next', // Next page button text
      firstPage: 'First', // First page button text
      lastPage: 'Last', // Last page button text
      paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      paginationPosition: 'bottom' // default is bottom, top and both is all available
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      // alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };

    // <div>{this.getUsers()}</div>
    // <button className="btn btn-primary " onClick={this.onClick}>Load...</button>

    // conditionally render modal
    let modal;
    if (this.state.isEditable === false) {
      modal = (
        <UserDeleteModal
          selectedUser={this.state.selectedUser}
          afterOpenModal={this.handleOpenModal}
          closeModal={this.handleCloseModal}
        />
      );
    }

    if (this.state.isEditable === true) {
      modal = (
        <UserEditModal
          selectedUser={this.state.selectedUser}
          afterOpenModal={this.handleOpenModal}
          closeModal={this.handleCloseModal}
        />
      );
    }

    return (
      <div>
        {modal}
        <main role="main" className="container pt-7">
          <form onSubmit={this.handleSubmit}>
            <ErrorBoundary>
              <div className="row">
                <div className="col-md-6">
                  <div className="error-messages">
                    {this.state.errors.map(error => (
                      <div key={error}>{error}</div>
                    ))}
                  </div>

                  <DynamicForm // configure the form  controls
                    model={searchUsersForm}
                    groups={1} // groups will be 1 to 4 only 1=col-md-12,  2= col-md-6 , 3=col-md-4  4= col-md-3
                    columns="col-md-12"
                    ref={node => (this.dynForm = node)}
                    reload={this.reload}
                  />
                </div>

                <div className="col-md-4 pt-5">
                  <button className="btn btn-primary btn-block">
                    {this.state.submitted ? (
                      <div>
                        <i className="fa fa-spinner fa-spin" />{' '}
                        {'Processing...'}
                      </div>
                    ) : (
                      <i className="fa fa fa-search" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>
            </ErrorBoundary>
            <hr />
          </form>
          {this.state.gdata === undefined && <div>loading...</div>}
          {this.state.gdata !== undefined && (
            <BootstrapTable
              data={this.state.gdata.data.searchUsers}
              version="4"
              hover={true}
              bordered={true}
              condensed={true}
              maxHeight="520px"
              selectRow={selectRowProp}
              pagination={true}
              options={options}
              search={true}
              searchPlaceholder="input something..."
              exportCSV={true}
              csvFileName="table-export"
              tableHeaderClass="custom-table-header"
            >
              <TableHeaderColumn
                dataField="userId"
                isKey={true}
                dataSort={true}
                width="220"
                columnClassName="td-column"
              >
                userId
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name" dataSort={true} width="100">
                First Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="email" dataSort={true} width="180">
                User Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="cellNumber" width="100">
                cellNumber
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="roles"
                dataFormat={this.roleFormatter}
              >
                Roles
              </TableHeaderColumn>
              <TableHeaderColumn
                dataField="button"
                dataFormat={this.buttonFormatterEdit}
                width="40"
              />
              <TableHeaderColumn
                dataField="button"
                dataFormat={this.buttonFormatterDelete}
                width="40"
              />
            </BootstrapTable>
          )}
        </main>
      </div>
    );
  } // end of render()
} // end of SearchUsers

export default withData(SearchUsers);
