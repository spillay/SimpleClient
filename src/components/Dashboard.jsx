import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import withData from '../backend/withData';
import { Users } from '../backend/queries';
import UserDeleteModal from '../Modal/UserDeleteModal';
import UserEditModal from '../Modal/UserEditModal';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      isEditable: undefined,
      selectedUser: undefined
    };
  }

  componentWillMount() {
    this.getUsersAsPromise();
  }

  getUsersAsPromise = () => {
    this.readData(Users, {}).then(result => {
      console.log('Users :', result);
      this.setState(
        { gdata: result.data.getAllUsers },
        () => {
          this.forceUpdate();
        }
        // return result.data.getAllUsers
      );
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
      // console.log(`EditUserId:${userId}`)
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
    console.log('handleCloseModal.........');
    this.getUsersAsPromise();
    this.setState(() => ({ selectedUser: undefined })); // override the previous value
  };

  onRowSelect = (row, isSelected, e) => {
    console.log(`is selected: ${isSelected}, UserId = ${row.userId}`);
  };

  renderShowsTotal = (start, to, total) => {
    return (
      <p style={{ color: 'green' }}>
        From {start} to {to}, totals is {total}&nbsp;&nbsp;
      </p>
    );
  };

  getUsers = () => {
    return this.state.gdata.data.getAllUsers.map(({ userId, name }) => (
      <div key={userId}>
        <p>{`${userId}: ${name}`}</p>
      </div>
    ));
  };

  render() {
    // console.log("render() :",this.state.gdata)

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

    // console.log(this.state)
    if (this.state.gdata === undefined) {
      return <div className="pt-7"> Loading...</div>;
    } else {
      return (
        <div>
          {modal}
          <main role="main" className="container pt-7">
            <div className="error-messages">
              {this.state.errors.map(error => <div key={error}>{error}</div>)}
            </div>
            <BootstrapTable
              data={this.state.gdata}
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
                isKey={true}
                dataField="email"
                dataSort={true}
                columnClassName="td-column"
                width="180"
              >
                User Name
              </TableHeaderColumn>
              <TableHeaderColumn dataField="name" dataSort={true} width="100">
                First Name
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
          </main>
        </div>
      );
    }
  }
}

export default withData(Dashboard);
