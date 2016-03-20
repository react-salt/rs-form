import React, { Component } from 'react';

export default class FormControl extends Component {
    static propTypes = {
        prefixName: React.PropTypes.string,
        name: React.PropTypes.string,
        show: React.PropTypes.oneOfType([
            React.PropTypes.func,
            React.PropTypes.bool
        ]),
    }

    static defaultProps = {
        prefixName: 'salt',
        name: '',
        show: true,
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        let validate = this.props.validate ? this.props.validate(value) : true;
        this.props.onChange(this.props.name, value, validate);
    }

    render() {
        let self = this;
        let { children, formData, name, prefixName, show } = this.props;
        let value = formData[name];
        let ifShow = typeof show === 'boolean' ? show : show(value);

        return (
            <div
                className={`${prefixName}-from-group`}
                style={{display: ifShow ? 'block' : 'none'}}
            >
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {
                            onChange: self.onChange,
                            formData: formData,
                            value: value
                        });
                    })
                }
            </div>
        );
    }
}
