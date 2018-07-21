import React, { Component } from 'react';
import withData from '../backend/withData';

class FormControlsListInitial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
  } // end of constructor
  componentWillMount() {
    // console.log('componentWillMount :',this.props.data)
    if (this.props.data !== undefined) {
      this.props.data.controls.map((row, idx) => {
        //   console.log('row.id :',row.id)
        if (row.mandatory === 'yes') {
          this.state.selected.push(row.id); // add item into array
        }
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('handleSubmit:', this.state);
  };
  onChange = e => {
    // console.log('Key-checked :',e.target.name);
    // console.log('e.target.checked :', e.target.checked);

    if (e.target.checked === true) {
      this.state.selected.push(e.target.name); // add item into array
      // console.log('checked === true :',this.state)
    }
    if (e.target.checked === false) {
      this.setState(
        {
          selected: this.state.selected.filter(
            d => d !== e.target.name // remove item from array
          )
        },
        () => {
          //   console.log('checked === false :', this.state)
        }
      );
    }
  };

  render() {
    // console.log('FormControlsListInitial :', this.props.data);
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
              key={row.id}
              name={row.id}
              disabled={row.mandatory === 'yes'}
              onChange={e => {
                this.onChange(e);
              }}
            />
            <span className="custom-control-indicator" />
            <span className="custom-control-label ">
              {' '}
              {row.label} (<code>{row.type.name}</code>)
            </span>
          </label>
        </div>
      ));
    }

    if (this.props.data === undefined) {
      return <div className="pt-7" />;
    } else {
      return (
        <div>
          <span className="badge badge-secondary">{this.props.data.name} </span>
          <div className="row">
            <div className="col-md-12">
              <div className="alert alert-secondary" role="alert">
                Master Form Controls.....
              </div>
            </div>
          </div>

          <form onSubmit={this.handleSubmit}>
            {content}
            <div className="row">
              <div className="col-md-4 ">
                <button className="btn btn-primary btn-block">
                  Submit....
                </button>
              </div>
            </div>
          </form>
        </div>
      );
    }
  }
} // end of FormControlsListInitial

export default withData(FormControlsListInitial);
