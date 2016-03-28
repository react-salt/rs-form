# React Salt - Form

具有数据收集、(动态)校验、提交功能的表单，可以配合使用输入框、多选、单选、下拉等表单元素。

## 核心方式

* 通过formData、getData、onValidate, onChange与外界交互，需要ref配合
* 可以通过myStyle制定表单域的布局方式，可以额外使用grid属性控制栅格列数

## FormControl

* From使用FormControl这个中间件与表单元素进行交流
* 支持属性name\show\disabled\grid
* 检查相关的属性设置在FormControl上，与基础表单组件隔离

## 特色

* 支持自定义的表单组件，自定义组件需要开放onChange\formData(可选)\value\disabled接口
* 自定义检查、自动检查
