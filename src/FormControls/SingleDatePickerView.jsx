import React,{Component} from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
// import moment from 'moment/moment';



export class SingleDatePickerView extends Component {

    constructor(props) {
        super(props);
        //this.state = {date:moment()}
        this.state = { value: null,dirty: false }
    }
    onDateChange = (date) => {
        //this.setState({ date: date });
        //this.props.onChange({ target: { value: date.format("MMM Do YYYY") } }, this.props._key)
        this.setState({ value: date, dirty: true }, () => {
            this.props.onChange({ target: { value: this.state.value } }, this.props._key)
        })
    }
    onFocusChange = ({ focused }) => {
        this.setState({ focused })
    }

    render() {
        return (
            <div key={this.props._key} >
                <SingleDatePicker
                    date={this.state.value} // momentPropTypes.momentObj or null  current date
                    onDateChange={this.onDateChange} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={this.onFocusChange}
                    {...this.props.options}
                />
                <div className="validation-error" >{this.props.errorFor(this.props._key)}</div>
                <small className="form-text text-muted ">( Please provide valid {this.props.label}. )</small>
            </div>
        )
    }


}
SingleDatePickerView.propTypes = {
    _key: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errorFor: PropTypes.func.isRequired
}