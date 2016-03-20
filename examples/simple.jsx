import React, { Component } from 'react';

import Form from '../src/form.js';
import FormControl from '../src/form-control.js';
import Input from '../src/input.js';
import Select from '../src/select.js';
import Radio from '../src/radio.js';
import Checkbox from '../src/checkbox.js';
import Tips from '../src/tips.js';

export default class Demo extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitAuto = this.onSubmitAuto.bind(this);
    }

    state = {
        data: {}
    }

    // react里面，获取子元素的一个state，是比较麻烦的，不太优雅的办法是利用dom node等一系列方法去读，稍微好一些的方法是利用一些毁掉函数向上传递
    // 在这里也准备给他开一个getData的方法
    // 我认为，在基础组件开发的原则中有一条是，尽一切可能去分组件，不在于分多少层级，而只在乎每一个层级发挥多少作用
    // 相反，我认为在业务组件的开发过程中，要尽一切可能减少层级，避免复杂的调用连接，难于后续人员的维护
    // form是否要提供自动提交的功能
    // 原来的设计里面，是某一个control可以监听其他的某一个control，现在可以稍微修改，这样的限制太多了，现在修改为，某一个地方可以任意执行规则，而我们预置一些类似require、disabled这样的规则
    // form本身可以重逻辑，但是我们也要做成轻逻辑，因为实在没必要把react搞得太重了

    onSubmitAuto(data) {
        console.log(data);
    }

    onSubmit(e) {
        e.preventDefault();
        console.log(this.refs.form.getData());
    }

    render() {
        let { data } = this.state;

        return (
            <Form
                ref="form"
                formData={data}
                onSubmit={this.onSubmitAuto}
                onChange={(e)=>console.log(JSON.stringify(e))}
            >
                <FormControl name="name" disabled required>
                    <label>名字</label>
                    <Input password />
                </FormControl>
                <FormControl name="type" show={(value) => value !== '2'} listen='name' className={(data)=>{}}>
                    <label>性别</label>
                    <Select options={{1: '男', 2: '女', 3: 'all'}}/>
                    <Tips show={true}>这里是一个提示1</Tips>
                    <Tips show={(value) => value === '1'} myStyle="danger">这里是一个提示2</Tips>
                    <Tips content={(value) => '根据计算得出的结果'} show={true} />
                </FormControl>
                <FormControl name="age">
                    <Radio options={[{value: '1', name: '18'}, {value: '2', name: '19'}]} />
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
