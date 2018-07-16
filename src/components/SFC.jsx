import React, { Component } from 'react';
import ErrorBoundary from '../utils/ErrorBoundary';
import { DynamicForm } from '../DynamicForm/DynamicForm';
import { signupForm } from '../forms/form.json';
import { signupFormExclude } from '../forms/exclude.json';
// import logo from '../images/Loader.gif';
import withData from '../backend/withData';
import { addUser } from '../backend/mutations';
// import { Role } from '../backend/queries';

class SFC extends Component {
  constructor(props) {
    super(props);
    // console.log("in LoginView constructor");
    this.state = {
      submitted: false,
      errors: [],
      valueData: {}
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
      this.addUserAsPromise(addUser, data); // signup mutation
    }
  };
  addUserAsPromise = (addUser, data) => {
    signupFormExclude.map((m, indx) => {
      data[m.key] = m.default;
    });
    console.log(data);

    this.mutateData(addUser, data) // return a promise
      .then(result => {
        // console.log('addUser :', result.data);
        this.props.history.push('/dashboard'); // programatically routing
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
            <div className="col-md-12">
              <form onSubmit={this.handleSubmit}>
                <ErrorBoundary>
                  <div className="error-messages">
                    {this.state.errors.map(error => (
                      <div key={error}>{error}</div>
                    ))}
                  </div>

                  <DynamicForm // configure the form  controls
                    model={signupForm}
                    valueData={this.state.valueData}
                    exclude={signupFormExclude}
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
            </div>
          </div>
        </main>
      </div>
    );
  }
}
// make this component wrap with data
export default withData(SFC);

/*
   model={signupForm}
                    exclude={signupFormExclude}
*/
