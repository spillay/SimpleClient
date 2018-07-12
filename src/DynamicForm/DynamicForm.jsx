import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { run, ruleRunner } from '../FormValidation/ruleRunner';
import {
  required,
  isSDP,
  isDRP,
  isSlider,
  isString,
  isCurrency,
  isCellnumber,
  minLength,
  maxLength,
  emailFormat
} from '../FormValidation/rules';
//import moment from 'moment';
import { TextView } from '../FormControls/TextView.jsx';
import { TextAreaView } from '../FormControls/TextAreaView.jsx';
import { SelectView } from '../FormControls/SelectView.jsx';
import { RadioView } from '../FormControls/RadioView.jsx';
// import { RangeView } from '../FormControls/RangeView.jsx';
import { SliderView } from '../FormControls/SliderView.jsx';
import { CheckboxView } from '../FormControls/CheckboxView.jsx';
import { SingleDatePickerView } from '../FormControls/SingleDatePickerView.jsx';
import { DateRangePickerView } from '../FormControls/DateRangePickerView.jsx';

export class DynamicForm extends Component {
  constructor(props) {
    super(props);
    // console.log("Constructor DynamicForm");
    this.state = {
      validationErrors: {},
      fieldValidations: [],
      fields: this.props.valueData === undefined ? {} : this.props.valueData,
      stage: 'Initial'
    };
    //console.log("Props Iterator");
    this.props.model.map((row, idx) => {
      // row = each formControl , idx=index
      //console.log("key :",row,row.label," - validations : ",row.fieldValidations);
      if (row.fieldValidations) {
        //this.state.fields[row.key] = ""
        let validations = [];
        for (var key in row.fieldValidations) {
          // key = validations like required,minLength
          // console.log(key);
          switch (key) {
            case 'required': {
              if (row.fieldValidations[key] === true) {
                validations.push(required); // push "required function"
              }
              break;
            }
            case 'isDRP': {
              if (row.fieldValidations[key] === true) {
                validations.push(isDRP); // push "required function"
              }
              break;
            }

            case 'isSDP': {
              if (row.fieldValidations[key] === true) {
                validations.push(isSDP); // push "required function"
              }
              break;
            }

            case 'isSlider': {
              if (row.fieldValidations[key] === true) {
                validations.push(isSlider); // push "required function"
              }
              break;
            }

            case 'minLength': {
              validations.push(minLength(row.fieldValidations[key])); // push "minLength function"
              break;
            }
            case 'maxLength': {
              validations.push(maxLength(row.fieldValidations[key]));
              break;
            }
            case 'isCellnumber': {
              validations.push(isCellnumber);
              break;
            }
            case 'isString': {
              validations.push(isString);
              break;
            }
            case 'isCurrency': {
              validations.push(isCurrency);
              break;
            }

            case 'emailFormat': {
              validations.push(emailFormat);
              break;
            }

            default:
              break;
          }
        }
        this.state.fieldValidations.push(
          ruleRunner(row.key, row.label, validations)
        ); // (field, name, validations)
      }
      return '';
    });
    // console.log("End Constructor");
  }

  checkControls = key => {
    if (
      this.state.fields[key] !== undefined &&
      this.state.validationErrors[key] !== undefined
    ) {
      return true;
    } else {
      return false;
    }
  };

  // get the error text for field
  errorFor = key => {
    // console.log("errorfor ", this.state.fields[key])
    if (this.checkControls(key)) {
      return this.state.validationErrors[key] || ''; // error text
    } else {
      return '';
    }
  };

  getData = () => {
    // var data = {};
    // this.props.model.map((row, idx) => {
    //     // console.log("key :", row.key);
    //     return    data[row.key] = this.state.fields[row.key];
    // })
    // return data;
    return this.state.fields;
  };

  getValue = name => {
    console.log('getValue', name, this.props.valueData);

    if (this.state.fields[name] !== undefined) {
      console.log('getValue', this.state.fields[name]);
      return this.state.fields[name];
    } else {
      return '';
    }
    // if (this.props.valueData && this.props.valueData[name] !== undefined ){
    //     console.log("return value")
    //     return this.props.valueData[name]
    // } else {
    //     return ""
    // }
  };

  checkValidations = () => {
    var validationErrors = run(this.state.fields, this.state.fieldValidations);
    if (Object.keys(validationErrors).length === 0) {
      // console.log("no errors")
      return true;
    } else {
      // console.log(" errors")
      return false;
    }
  };

  onChange = (e, key) => {
    // console.log(`key : ${key}  - e: ${e}`, e);
    var localFields = { ...this.state.fields };
    localFields[key] = e.target.value;
    // console.log('localFields(onChange()) :', localFields);
    this.setState({ fields: localFields, stage: 'Incomplete' }, () => {
      // call back function
      this.setState(
        {
          validationErrors: run(this.state.fields, this.state.fieldValidations)
        },
        () => {
          // console.log(`newState onChange() :${JSON.stringify(this.state)}`) // print new state
          if (Object.keys(this.state.validationErrors).length === 0) {
            this.setState({ stage: 'Complete' }, () => {
              this.props.reload();
            });
          } else {
            this.setState({ stage: 'Incomplete' }, () => {
              this.props.reload();
            });
          }
        }
      ); // validation check
    });
  }; // end of onChange()

  renderForm = () => {
    let model = this.props.model;
    const { groups, columns } = this.props;

    //step 1:
    let rows = [...Array(Math.ceil(model.length / groups))]; // calculate the number of rows, given  items per row
    // console.log(`columns :${groups} - No of Rows :${ Math.ceil(model.length / groups)}`)

    //step 2:
    let modelRows = rows.map((row, idx) => {
      return model.slice(idx * groups, idx * groups + groups); // The result is an array of arrays (rows of items).
    });

    const content = modelRows.map((row, idx) => (
      <div className="form-row" key={idx}>
        {row.map((m, idx) => {
          let { key, type, label, header, opts, options } = m;
          //m.value = this.state.fields[key];
          let input;
          var valData = this.getValue(key);
          console.log('valData', valData);
          if (type === 'text' || 'email' || 'password' || 'number') {
            input = (
              <TextView
                _key={key}
                label={label}
                value={valData}
                type={type}
                stage={this.state.stage}
                errorFor={this.errorFor}
                onChange={this.onChange}
                options={options}
              />
            );
          }

          if (type === 'textarea') {
            input = (
              <TextAreaView
                _key={key}
                value={valData}
                label={label}
                type={type}
                stage={this.state.stage}
                errorFor={this.errorFor}
                onChange={this.onChange}
                options={options}
              />
            );
          }

          if (type === 'select') {
            input = (
              <SelectView
                _key={key}
                label={label}
                value={valData}
                header={header}
                errorFor={this.errorFor}
                onChange={this.onChange}
                opts={opts}
                options={options}
              />
            );
          }

          if (type === 'range') {
            // input = <RangeView _key={key} type={type} label={label} errorFor={this.errorFor} onChange={this.onChange} options={options} />
            input = (
              <SliderView
                _key={key}
                value={valData}
                label={label}
                errorFor={this.errorFor}
                onChange={this.onChange}
                options={options}
              />
            );
          }

          if (type === 'radio') {
            // console.log("radio :",options);
            input = (
              <RadioView
                _key={key}
                value={valData}
                options={options}
                opts={opts}
                errorFor={this.errorFor}
                onChange={this.onChange}
              />
            );
          }

          if (type === 'checkbox') {
            // console.log('checkbox :', valData);
            input = (
              <CheckboxView
                _key={key}
                value={valData}
                options={options}
                opts={opts}
                errorFor={this.errorFor}
                onChange={this.onChange}
              />
            );
          }

          if (type === 'SingleDatePicker') {
            input = (
              <SingleDatePickerView
                _key={key}
                value={valData}
                label={label}
                errorFor={this.errorFor}
                onChange={this.onChange}
                options={options}
              />
            );
          }
          if (type === 'DateRangePicker') {
            input = (
              <DateRangePickerView
                _key={key}
                value={valData}
                label={label}
                errorFor={this.errorFor}
                onChange={this.onChange}
                options={options}
              />
            );
          }
          return (
            <div key={idx} className={'form-group ' + columns}>
              <label key={'l' + key} htmlFor={key}>
                {m.label} :
              </label>
              {input}
            </div>
          );
        })}
      </div>
    ));
    return <div>{content}</div>;
  };

  render() {
    return <div>{this.renderForm()}</div>;
  }
}
DynamicForm.propTypes = {
  model: PropTypes.array.isRequired,
  reload: PropTypes.func.isRequired
};
