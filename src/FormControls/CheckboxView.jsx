import React, { Component } from 'react';
import PropTypes from 'prop-types';

// const options = [
//   { key: "reactjs", label: "ReactJS", value: "reactjs" },
//   { key: "angular", label: "Angular", value: "angular" },
//   { key: "vuejs", label: "VueJS", value: "vuejs" }
// ]

export class CheckboxView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
  }

  onChange = e => {
    // console.log("Key-checked :",e.target.value)
    // console.log('e.target.checked :', e.target.checked);

    if (e.target.checked === true) {
      this.state.selected.push(e.target.value); // add item into array
    }
    if (e.target.checked === false) {
      this.setState(
        {
          selected: this.state.selected.filter(
            d => d !== e.target.value // remove item from array
          )
        },
        () => {
          // console.log('state :',JSON.stringify(this.state))
          this.props.onChange(
            { target: { value: this.state.selected } },
            this.props._key
          );
        }
      );
    }
    // console.log('state :',JSON.stringify(this.state))
    this.props.onChange(
      { target: { value: this.state.selected } },
      this.props._key
    );
  };

  render() {
    const content = this.props.options.map((row, idx) => (
      <div
        key={'ll' + row.key}
        className={
          this.props.opts.inline === true
            ? 'custom-control-inline'
            : 'custom-control'
        }
      >
        <label key={'ll' + row.key} className="custom-control custom-checkbox">
          <input
            className="custom-control-input"
            type="checkbox"
            key={row.key}
            value={row.key}
            onChange={e => {
              this.onChange(e);
            }}
          />
          <span className="custom-control-indicator" />
          <span className="custom-control-label "> {row.label}</span>
        </label>
      </div>
    ));
    return (
      <div>
        {content}
        <div className="validation-error">
          {this.props.errorFor(this.props._key)}
        </div>
      </div>
    );
  }
} // end of CheckboxView

CheckboxView.propTypes = {
  _key: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
  // errorFor: PropTypes.func.isRequired
};
