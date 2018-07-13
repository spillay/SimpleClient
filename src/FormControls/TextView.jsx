import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TextView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dirty: false
    };
  }
  onChange = e => {
    // console.log('TextView:onChange', e.target.value);
    this.props.onChange({ target: { value: e.target.value } }, this.props._key);
    this.setState({ dirty: true });
  };
  getColor = () => {
    // console.log("stage",this.props.stage,this.props._key,this.props.errorFor(this.props._key));
    if (this.state.dirty === false) {
      return {};
    } else {
      // console.log(this.state);
      if (this.props.errorFor(this.props._key) === '') {
        return { color: 'green' };
      } else {
        return { color: 'red' };
      }
    }
  };
  getClassName = () => {
    if (this.state.dirty === false) {
      return 'form-control';
    } else {
      if (this.props.errorFor(this.props._key) === '') {
        return 'form-control is-valid';
      } else {
        return 'form-control is-invalid';
      }
    }
  };
  render() {
    return (
      <div key={this.props._key}>
        <div
          key={this.props._key}
          className={this.props.options.icon ? 'input-group mb-2' : ''}
        >
          {this.props.options.icon && (
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i
                  className={this.props.options.icon}
                  style={this.getColor()}
                  aria-hidden="true"
                />
              </span>
            </div>
          )}
          <input
            className={this.getClassName()}
            type={this.props.type}
            key={this.props._key}
            value={this.props.value}
            onChange={e => this.onChange(e)}
            {...this.props.options}
          />
        </div>
        <div className="validation-error">
          {this.props.errorFor(this.props._key)}
        </div>
        <small className="form-text text-muted ">
          ( Please provide valid {this.props.label}. )
        </small>
      </div>
    );
  }
} // end of TextView

TextView.propTypes = {
  _key: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errorFor: PropTypes.func.isRequired
};
