import React, { Component } from 'react';
import withData from '../backend/withData';
import { removeUFC } from '../backend/mutations';

class UserExcludeFormControlsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      isButtonDisabled: true
    };
  } // end of constructor

  handleSubmit = e => {
    e.preventDefault();
    console.log('handleSubmit:', this.state);
    this.removeUserFormControlsAsPromise(removeUFC, {
      user: this.props.user,
      form: this.props.form,
      controls: this.state.selected
    }); //  mutation
  };

  removeUserFormControlsAsPromise = (removeUFC, { user, form, controls }) => {
    this.mutateData(removeUFC, { user, form, controls }) // return a promise
      .then(result => {
        console.log('UserExcludeFormControlsList :', result.data);
        this.setState({ message: 'Success.....' });
      })
      .catch(res => {
        const errors = res.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  };

  /* this method will send true or false to manage button disable beviour */
  isButtonEnable = () => {
    if (this.state.selected.length === 0) {
      this.setState({ isButtonDisabled: true });
    } else {
      this.setState({ isButtonDisabled: false });
    }
  };

  onChange = e => {
    // console.log('Key-checked :',e.target.name);
    // console.log('e.target.checked :', e.target.checked);

    if (e.target.checked === true) {
      this.state.selected.push(e.target.name); // add item into array
      // console.log('checked === true :',this.state)
      this.isButtonEnable();
    }
    if (e.target.checked === false) {
      this.setState(
        {
          selected: this.state.selected.filter(
            d => d !== e.target.name // remove item from array
          )
        },
        () => {
          this.isButtonEnable();
          //   console.log('checked === false :', this.state)
        }
      );
    }
  };

  render() {
    // console.log('UserExcludeFormControlsList :', this.props.data);
    // console.log('render :',this.state)
    var content;
    if (this.props.data !== undefined) {
      content = this.props.data.controls.map((row, idx) => (
        <div key={'ll' + row.key} className="custom-control">
          <label
            key={'ll' + row.key}
            className="custom-control custom-checkbox"
          >
            <input
              className="custom-control-input"
              type="checkbox"
              key={row.key}
              name={row.key}
              disabled={row.required === 'yes'}
              onChange={e => {
                this.onChange(e);
              }}
            />
            <span className="custom-control-indicator" />
            <span className="custom-control-label "> {row.label}</span>
          </label>
        </div>
      ));
    }

    if (this.props.data === undefined) {
      return <div className="pt-7" />;
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              {this.state.message !== undefined && (
                <span className="badge badge-success">
                  {this.state.message}
                </span>
              )}
            </div>
          </div>
          <span className="badge badge-success">
            {this.props.data.user.email}
          </span>
          <div className="row">
            <div className="col-md-12">
              <div className="alert alert-secondary" role="alert">
                User Configuration FormControls.....
              </div>
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            {content}
            <div className="row">
              <div className="col-md-6 ">
                <button
                  className="btn btn-outline-primary btn-block"
                  disabled={this.state.isButtonDisabled}
                >
                  Include / Exclude....
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
} // end of UserFormControlsList

export default withData(UserExcludeFormControlsList);
