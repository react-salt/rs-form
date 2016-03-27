import React, { Component } from 'react';

const STATUS = {
    'success': 'ok',
    'warning': 'warning-sign',
    'error': 'remove'
}

export default class FormControl extends Component {
    static propTypes = {
        name: React.PropTypes.string,
        show: React.PropTypes.oneOfType([
            React.PropTypes.func,
            React.PropTypes.bool
        ]),
        disabled: React.PropTypes.oneOfType([
            React.PropTypes.func,
            React.PropTypes.bool
        ]),
        grid: React.PropTypes.array
    }

    static defaultProps = {
        name: '',
        show: true,
        disabled: false,
        grid: [4, 20]
    }

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        let validate = (this.props.required && !value) ?
                        {type: 'error', content: '此项必填'} :
                        this.props.validate ? this.props.validate(value) : true;
        this.props.onChange(this.props.name, value, validate);
    }

    render() {
        let self = this;
        let { children, formData, name, show, disabled, grid, autoCheck, selfCheck, formValidate } = this.props;
        let value = formData[name];
        let ifShow = typeof show === 'boolean' ? show : show(value);
        let ifDisabled = typeof disabled === 'boolean' ? disabled : disabled(value);
        
        let validate = formValidate[name]; // 本条的验证结果

        let classNames = 'form-group has-feedback ';
        let checkStatus = false;
        if ((autoCheck || selfCheck) && (this.props.required || this.props.validate)) {
            if (validate === true) {
                classNames += 'has-success';
                checkStatus = STATUS['success'];
            } else if (typeof validate === 'object') {
                classNames += 'has-' + validate.type;
                checkStatus = STATUS[validate.type]
            }
        }

        return (
            <div
                className={classNames}
                style={{display: ifShow ? 'block' : 'none'}}
            >
                {
                    React.Children.map(children, (child, index) => {
                        return (
                            <div className={`col-sm-${grid[index] ? grid[index] : '24'}`}>
                                {
                                    React.cloneElement(child, {
                                        onChange: self.onChange,
                                        formData: formData,
                                        value: value,
                                        disabled: ifDisabled
                                    })
                                }
                            </div>
                       )
                    })
                }
                {
                    checkStatus && <i className={`glyphicon glyphicon-${checkStatus} form-control-feedback`} />
                }
            </div>
        );
    }
}
