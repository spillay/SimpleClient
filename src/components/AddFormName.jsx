import React, { Component } from 'react';
import ErrorBoundary from '../utils/ErrorBoundary';
import logo from '../images/Loader.gif';
import { DynamicForm } from '../DynamicForm/DynamicForm';
import { addFormName } from '../forms/form.json';
import withData from '../backend/withData';
import { addForm } from '../backend/mutations';

class AddFormName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      errors: [],
      valueData: {},
      message: ''
    };
  } // end of constructor

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
      //   console.log('now you can submit...', data);
      this.addFormNameAsPromise(addForm, data); // signup mutation
    }
  };
  addFormNameAsPromise = (addForm, data) => {
    this.mutateData(addForm, { name: data.form }) // return a promise
      .then(result => {
        console.log('addFormControls :', result.data);
        this.setState({ message: 'Success.....' });
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  };

  render() {
    return (
      <div>
        <main role="main" className="container pt-7">
          <div className="row">
            <div className="col-md-6">
              <div className="card" style={{ width: '33rem' }}>
                <div className="card-header">
                  <div className="row">
                    <div className="col-md-12">
                      <img src={logo} width="6.1%" alt="" />{' '}
                      <code>Create Form Name.</code>
                      {this.state.message !== undefined && (
                        <span className="badge badge-success">
                          {this.state.message}
                        </span>
                      )}
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

                      <DynamicForm // configure the form  controls
                        model={addFormName}
                        valueData={this.state.valueData}
                        exclude={undefined}
                        groups={1} // groups will be 1 to 4 only 1=col-md-12,  2= col-md-6 , 3=col-md-4  4= col-md-3
                        columns="col-md-12"
                        ref={node => (this.dynForm = node)}
                        reload={this.reload}
                      />
                    </ErrorBoundary>
                    <hr />
                    <div className="row">
                      <div className="col-md-12 ">
                        <button
                          className="btn btn-outline-primary btn-block"
                          disabled={this.checkStage()}
                        >
                          {this.state.submitted ? (
                            <div>
                              <i className="fa fa-spinner fa-spin" />{' '}
                              {'Processing...'}
                            </div>
                          ) : (
                            <i
                              className="fa fa fa-sign-in"
                              aria-hidden="true"
                            />
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
// make this component wrap with data
export default withData(AddFormName);
