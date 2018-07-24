import React, { Component } from 'react';
import withData from '../backend/withData';
import { addFCT } from '../backend/mutations';
import { formControlType } from '../forms/form.json';
import ErrorBoundary from '../utils/ErrorBoundary';
import { DynamicForm } from '../DynamicForm/DynamicForm';

class AddFormControlType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      submitted: false,
      errors: [],
      valueData: {},
      message: '',
      isButtonDisabled: true
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
      console.log('now you can submit...', data);
      this.addFormControlTypeAsPromise(addFCT, data); //  mutation
    }
  };

  addFormControlTypeAsPromise = (addFCT, data) => {
    this.mutateData(addFCT, data) // return a promise
      .then(result => {
        // console.log('AddFormControlType :', result.data);
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
              {this.state.message !== undefined && (
                <span className="badge badge-success">
                  {this.state.message}
                </span>
              )}

              <form onSubmit={this.handleSubmit}>
                <ErrorBoundary>
                  <div className="error-messages">
                    {this.state.errors.map(error => (
                      <div key={error}>{error}</div>
                    ))}
                  </div>

                  <DynamicForm // configure the form  controls
                    model={formControlType}
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
                        <i className="fa fa fa-sign-in" aria-hidden="true" />
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }
} // end of AddFormControlType

export default withData(AddFormControlType);
