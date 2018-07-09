import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import withData from '../backend/withData'
import { Users } from '../backend/queries';
import { deleteUser } from '../backend/mutations';
import { UserDeleteModal } from '../Modal'
import  UserEditModal  from '../Modal/UserEditModal'
class Dashboard extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			errors: [],
			isEditable: undefined,
			selectedUser: undefined
		}
		this.handleDeleteUser = this.handleDeleteUser.bind(this);
		this.handleEditUser = this.handleEditUser.bind(this);

	}

	componentDidMount() {  // is invoked immediately after a component is mounted (inserted into the tree). 
	}
	componentWillMount() {
		this.getUsersAsPromise();
	}


	componentWillReceiveProps(nextProps) {
		// console.log("nextProps:", this.props,nextProps)	
		// if (nextProps.params.id !== this.props.params.id) {
		// 	this.getUsersAsPromise();
		// }
	}
	

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		// if (this.props.userID !== prevProps.userID) {
		//   this.fetchData(this.props.userID);
		// }
		// console.log("prevProps:", prevProps)	
	}
	
	componentWillUpdate (nextProps) {
		//	this.props // the old, current set of props
		//	nextProps // the next set of props that will be in place when the component rendered
		// console.log("old, current :", this.props ," next set of props :" ,nextProps)	

	  }
	

	
	getUsersAsPromise = () => {
		this.readData(Users,{})
			.then(result => {
				console.log("Users :", result)
				this.setState({ gdata: result })
			})

	}

	buttonFormatterEdit(cell, row, enumObject, rowIndex) {
		return (
			<button type="button" className="btn btn-sm btn-outline-success" data-toggle="tooltip" data-placement="top" title="Edit"
				onClick={this.handleEditUser(row.userId)}>
				<i className="fa fa fa-pencil-square-o" aria-hidden="true"></i>
			</button>
		)
	}

	buttonFormatterDelete = (cell, row, enumObject, rowIndex) => {
		return (
			<button type="button" className="btn btn-sm btn-outline-danger" data-toggle="tooltip" data-placement="top" title="Delete"
				onClick={this.handleDeleteUser(row.userId)}>
				<i className="fa fa fa-trash" aria-hidden="true"></i>
			</button>
		)
	}

	handleEditUser = (userId) => {
		console.log("handleEditUser",userId)
		return (e) => {
			this.setState({ isEditable: true, selectedUser: userId })  //  loading show text
			console.log(`EditUserId:${userId}`)


		}
	}


	handleDeleteUser = (userId) => {
		return (e) => {
			this.setState(() => ({ selectedUser: userId, isEditable: false }))  // override the previous value
			console.log(`DeleteUserId:${userId}`)
			this.mutateData(deleteUser, { ID: userId })  // return a promise
				.then(result => {
					this.getUsersAsPromise();
				 }).catch((res) => {
					const errors = res.graphQLErrors.map(error => error.message)
					this.setState({errors})
				  })
		}
	}

	handleOpenModal = () => {
		// If the confirmation is true, call the function that
		this.setState(() => ({ selectedUser: undefined }))  // override the previous value

	}


	handleCloseModal = () => {
		this.setState(() => ({ selectedUser: undefined }))  // override the previous value

	}


	onRowSelect = (row, isSelected, e) => {
		console.log(`is selected: ${isSelected}, UserId = ${row.userId}`);

	}
	getUsers = () => {
		return this.state.gdata.data.getAllUsers
			.map(({ userId, name }) => (
				<div key={userId}>
					<p>{`${userId}: ${name}`}</p>
				</div>
			));
	}



	render() {

console.log("render() :",this.state.gdata)

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
			page: 1,  // which page you want to show as default
			sizePerPageList: [{
				text: '10', value: 10
			}, {
				text: '25', value: 25
			}, {
				text: '35', value: 35
			}], // you can change the dropdown list for size per page
			sizePerPage: 10,  // which size per page you want to locate as default
			pageStartIndex: 1, // where to start counting the pages
			paginationSize: 3,  // the pagination bar size.
			prePage: 'Prev', // Previous page button text
			nextPage: 'Next', // Next page button text
			firstPage: 'First', // First page button text
			lastPage: 'Last', // Last page button text
			paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
			paginationPosition: 'bottom'  // default is bottom, top and both is all available
			// hideSizePerPage: true > You can hide the dropdown for sizePerPage
			// alwaysShowAllBtns: true // Always show next and previous button
			// withFirstAndLast: false > Hide the going to First and Last page button
		}


		// <div>{this.getUsers()}</div>
		// <button className="btn btn-primary " onClick={this.onClick}>Load...</button>

		// conditionally render modal
		let modal;
		if (this.state.isEditable===false) {
			modal = <UserDeleteModal
				selectedUser={this.state.selectedUser}
				afterOpenModal={this.handleOpenModal}
				closeModal={this.handleCloseModal}>
			</UserDeleteModal>;
		}
		
		if (this.state.isEditable===true) {
			modal = <UserEditModal
			selectedUser={this.state.selectedUser}
			afterOpenModal={this.handleOpenModal}
			closeModal={this.handleCloseModal}>
		</UserEditModal>;
		}


		// console.log(this.state)
		if (this.state.gdata === undefined) {
			return (<div className="pt-7"> Loading...</div>)
		} else {
			return (

				<div>
					{modal}
					<main role="main" className="container pt-7">

					<div className='error-messages'>
					{this.state.errors.map(error => <div key={error}>
													  {error}
													</div>)}
						</div>
						<BootstrapTable data={this.state.gdata.data.getAllUsers} version='4'
							hover={true} bordered={true} condensed={true} maxHeight='520px'
							selectRow={selectRowProp}
							pagination={true} options={options}
							search={true} searchPlaceholder='input something...'
							exportCSV={true} csvFileName='table-export'
							tableHeaderClass='custom-table-header'
							>
							<TableHeaderColumn dataField='userId' isKey={true} dataSort={true} width='40'>userId</TableHeaderColumn>
							<TableHeaderColumn dataField='name' dataSort={true}>First Name</TableHeaderColumn>
							<TableHeaderColumn dataField='email' dataSort={true}>User Name</TableHeaderColumn>
							<TableHeaderColumn dataField='cellNumber' width='200'>cellNumber</TableHeaderColumn>
							<TableHeaderColumn dataField='roles' >Roles</TableHeaderColumn>
							<TableHeaderColumn dataField="button" dataFormat={this.buttonFormatterEdit.bind(this)} width='40' ></TableHeaderColumn>
							<TableHeaderColumn dataField="button" dataFormat={this.buttonFormatterDelete.bind(this)} width='40'></TableHeaderColumn>
						</BootstrapTable>

					</main>
				</div>
			);
		}


	}

	//   render () {
	//     return (
	// 		<div>
	// 		<main role="main" className="container pt-7">
	// 				<div className="row">
	// 					<h1> Dashboard...</h1>
	// 				</div>
	// 			</main>
	// 		</div>


	//     )
	//   }

}

// multiple mutation
export default withData(Dashboard);
