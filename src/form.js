import React, { Component } from 'react';
import FormControl from './form-control.js';

class Form extends Component {
    static propTypes = {
        prefixName: React.PropTypes.string,
        formData: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onChange: React.PropTypes.oneOfType([
           React.PropTypes.func,
           React.PropTypes.bool
        ]),
    }

    static defaultProps = {
        prefixName: 'salt',
        formData: {},
        onSubmit: () => console.log('请定义onSubmit函数'),
        onChange: false
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    state = {
        formData: this.props.formData
    }

    // 生命周期更新
    componentWillReceiveProps(nextProps) {
        this.setState({
            formData: nextProps.formData
        });
    }

    // 内部更新
    handleChange(name, value) {
        let { formData } = this.state;
        formData[name] = value;
        this.setState({
            formData: formData
        });
        this.props.onChange && this.props.onChange(name, value);
    }

    // 获取数据
    getData(name) {
        if (name) {
            if (typeof name === 'string') {
                name = [name];
            }
            return name.map(item => this.state.formData[item]);
        }
        return this.state.formData;
    }

    // 提交
    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit(this.getData());
    }

    render() {
        let self = this;
        let { children, prefixName, formData } = this.props;

        return (
            <form>
                {
                    React.Children.map(children, (child) => {
                        return React.cloneElement(child, {
                            prefixName: prefixName,
                            formData: formData,
                            onChange: self.handleChange
                        });
                    })
                }
            </form>
        );
    }
}

Form.FormControl = FormControl;
export default Form;
