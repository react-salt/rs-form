import React, { Component } from 'react';
import { Text, Radio, Checkbox, Textarea } from 'rs-input';
import Select from 'rs-select';

import Form from '../src/form.js';
import FormControl from '../src/form-control.js';
import Tips from '../src/tips.js';

export default class Demo extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onValidate = this.onValidate.bind(this);
        this.onSubmitAuto = this.onSubmitAuto.bind(this);
    }

    state = {
        data: {}
    }

    onSubmitAuto(data) {
        console.log(data);
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.refs.form.onValidate());
        console.log(this.refs.form.getData());
    }

    onValidate(e) {
        console.log(e);
    }

    render() {
        let { data } = this.state;

        return (
            <Form
                ref="form"
                formData={data}
                onSubmit={this.onSubmitAuto}
                onChange={(e)=>console.log(JSON.stringify(e))}
                onValidate={this.onValidate}
            >
                <FormControl name="name" disabled required>
                    <label>名字</label>
                    <Text password />
                </FormControl>
                <FormControl name="type" show={(value) => value !== '2'} listen='name' className={(data)=>{}}>
                    <label>性别</label>
                    <Select options={{1: '男', 2: '女', 3: 'all'}}/>
                    <Tips show={true}>这里是一个提示1</Tips>
                    <Tips show={(value) => value === '1'} myStyle="danger">这里是一个提示2</Tips>
                    <Tips content={(value) => '根据计算得出的结果'} show={true} />
                </FormControl>
                <FormControl name="age"
                    validate={
                        (value) => {
                            if (value == 3) {
                                return {type: 'warning', content: '不能选20哦'};
                            }
                            return true;
                        }
                    }
                >
                    <Radio options={[{value: '1', name: '18'}, {value: '2', name: '19'}, {value: '3', name: '20'}]} />
                </FormControl>
                <FormControl name="some">
                    <Checkbox options={[{value: '1', name: '18'}, {value: '2', name: '19'}]} />
                </FormControl>
                <button onClick={this.onSubmit}>提交</button>
                <button type="submit">自动提交</button>
            </Form>
        );
    }
}
