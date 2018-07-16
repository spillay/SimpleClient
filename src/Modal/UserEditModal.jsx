import React, { Component } from 'react';
import ReactModal from 'react-modal';
import ErrorBoundary from '../utils/ErrorBoundary';
import { DynamicForm } from '../DynamicForm/DynamicForm';
import { signupForm } from '../forms/form.json';
// import logo from '../images/Loader.gif'
import withData from '../backend/withData';
import { editUser } from '../backend/mutations';
import { User } from '../backend/queries';
import { isEmpty } from '../utils/helpers';

import { userEditExclude } from '../forms/exclude.json';

class UserEditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      errors: [],
      valueData: {}
    };
  } // end of constructor

  componentWillMount() {
    this.getUserAsPromise();
  }

  getUserAsPromise = () => {
    const ID = this.props.selectedUser;
    console.log('EditUserId(modal) :', ID);
    this.readData(User, { ID }).then(result => {
      console.log('UserData(Model) :', result.data.getUserById);
      var data = {};
      data['userId'] = result.data.getUserById['userId'];
      data['name'] = result.data.getUserById['name'];
      data['email'] = result.data.getUserById['email'];
      data['password'] = result.data.getUserById['password'];
      data['cellNumber'] = result.data.getUserById['cellNumber'];
      var roles = [];
      result.data.getUserById['roles'].map(e => {
        return roles.push(e.name);
      });
      data['roles'] = roles;
      //   console.log('========================================', data);
      this.setState({ valueData: data });
    });
  };

  reload = () => {
    this.forceUpdate();
  };

  checkStage = () => {
    // console.log("checkStage", this.dynForm)
    if (this.dynForm === null || this.dynForm === undefined) {
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
    // console.log("UserEditModal",e);
    e.preventDefault();
    if (this.dynForm.checkValidations() === true) {
      var data = this.dynForm.getData();
      this.setState({ submitted: true });
      console.log('now you can submit...', data);
      this.editUserAsPromise(editUser, data); // login mutation
      this.props.closeModal();
    }
  };

  editUserAsPromise = (editUser, data) => {
    this.mutateData(editUser, {
      ID: data.userId,
      name: data.name,
      email: data.email,
      password: data.password,
      cellNumber: data.cellNumber,
      roles: data.roles
    }) // return a promise
      .then(result => {
        console.log('After editUser :', result.data);
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  };

  render() {
    // console.log('rendering', this.state.valueData);
    return (
      <div>
        <ReactModal
          isOpen={!!this.props.selectedUser} // Boolean describing if the modal should be shown or not.
          contentLabel="Selected UserId" // String indicating how the content container should be announced to screenreaders
          role="dialog" // String indicating the role of the modal, allowing the 'dialog' role to be applied if desired.
          ariaHideApp={false}
          className="Modal pt-5"
        >
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col">
                  <h6>
                    <i className="fa fa fa-forward" aria-hidden="true" />
                    Edit{' '}
                    <span className="badge badge-success">{`UserId = ${
                      this.props.selectedUser
                    }`}</span>
                  </h6>
                </div>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={this.handleSubmit}>
                <ErrorBoundary>
                  <div className="error-messages">
                    {this.state.errors.map(error => (
                      <div key={error}>{error}</div>
                    ))}
                  </div>
                  {isEmpty(this.state.valueData) && <div>loading...</div>}
                  {!isEmpty(this.state.valueData) && (
                    <DynamicForm // configure the form  controls
                      model={signupForm}
                      valueData={this.state.valueData}
                      exclude={userEditExclude}
                      groups={1} // groups will be 1 to 4 only 1=col-md-12,  2= col-md-6 , 3=col-md-4  4= col-md-3
                      columns="col-md-12"
                      ref={node => (this.dynForm = node)}
                      reload={this.reload}
                    />
                  )}
                </ErrorBoundary>
                <hr />
                <div className="row">
                  <div className="col-md-12 ">
                    <button
                      className="btn btn-primary btn-block"
                      disabled={this.checkStage()}
                    >
                      {this.state.submitted ? (
                        <div>
                          <i className="fa fa-spinner fa-spin" />{' '}
                          {'Processing...'}
                        </div>
                      ) : (
                        <i className="fa fa fa-sign-in" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </form>

              <div className="col-md-6">
                <button
                  className="btn btn-outline-secondary btn-md btn-block custom-button"
                  onClick={this.props.closeModal}
                >
                  Cancel{' '}
                </button>
              </div>

              <hr />
            </div>
          </div>
        </ReactModal>
      </div>
    );
  }
}

ReactModal.setAppElement(document.getElementById('app'));

export default withData(UserEditModal);

/*
<div className="col-md-6">
<button className="btn btn-outline-secondary btn-md btn-block custom-button" onClick={this.props.closeModal}>Cancel </button>
</div>
*/
