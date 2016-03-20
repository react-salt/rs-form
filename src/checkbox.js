import React, { Component } from 'react';
import { createFragment } from 'rs-util';

export default class Checkbox extends Component {
    static propTypes = {
        value: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.array
        ]),
    }

    static defaultProps = {
        value: []
    }

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        let value = e.target.value;
        let values = this.props.value && Array.isArray(this.props.value) ? this.props.value.slice() : [];

        if (values.indexOf(value) > -1) {
            values.splice(values.indexOf(value), 1);
        } else {
            values.push(value);
        }
        this.props.onChange(values);
    }

    renderCheckbox(value, name) {
        return (
            <label>
                <input
                    type="checkbox"
                    value={value}
                    onClick={this.handleClick}
                    checked={this.props.value && this.props.value.indexOf(value) > -1}
                />
                {name}
            </label>
        );
    }

    render() {
        let { options } = this.props;
        let tmp = {};

        if (Array.isArray(options)) {
            for (let value of options) {
                tmp['rs-checkbox' + value.value] = this.renderCheckbox(value.value, value.name);
            }
        } else {
            for (let value of Object.keys(options)) {
                tmp['rs-checkbox' + value.toString()] = this.renderCheckbox(value, options.value);
            }
        }

        return <div>{ createFragment(tmp) }</div>;
    }
}
