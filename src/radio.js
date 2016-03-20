import React, { Component } from 'react';
import { createFragment } from 'rs-util';

export default class Radio extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.props.onChange(e.target.value);
    }

    renderRadio(value, name) {
        return (
            <label>
                <input
                    type="radio"
                    value={value}
                    onClick={this.handleClick}
                    checked={this.props.value === value}
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
                tmp['rs-radio' + value.value] = this.renderRadio(value.value, value.name);
            }
        } else {
            for (let value of Object.keys(options)) {
                tmp['rs-radio' + value.toString()] = this.renderRadio(value, options.value);
            }
        }

        return <div>{ createFragment(tmp) }</div>;
    }
}
