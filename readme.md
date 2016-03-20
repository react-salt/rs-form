# React Salt - Form

之前的Form相关经验是集中式的，其功能包括：


2、form组件也开放接口让用户自定义组件，主要是业务级别的form组件（但是定义体验很差，使用效果不好，建议替换成用继承的方式）

3、form组件的强大是listen、validate, reset等功能，可以在组件级别方便定制

6、有一种思路是在react、children便利的时候，添加一些方法，这种思路在用户比较自由的环境里面可能行不通



其他：
1、集中的验证方式是比较常用的手段，而且检查起来还算是比较便利的，这是一种思路，有一个缺点是没办法对一些动态验证的东西做实时验证（不过其实也是可以的）
2、分散的验证方式感觉更接地气，但是很可能造成冗余，而且在每一个组件处都要进行一遍验证，其实是很消耗的（对于分装好的组件，也不好调整）

我的想法1、是集中验证，验证的结果可以下传，虽然看上去验证和组件有点分离，但是感觉并没有什么区别
2、在form 调用单个组件的地方进行验证，验证结果传进单个组件中()

开发出一种formcontrol，也不需要别人来继承，只是包起来，做一个中间层！！！





计划：
1、核心form摒弃重组件系统，只提供一些接口和内部组件进行交互，其他的关于布局等所有事情，都放弃
2、规范一套表单相关组件的接口规范，这个接口规范直接写在一个form-control里面，但是其他form相关组件并不是直接拷贝，而是继承

form包含核心逻辑
checkbox、datepicker等组件单独开发，留出基本的接口
form-control定义表单组件逻辑
fomr-control-XXX用来定制form相关的组件，先包装checkbox等，之后开放给用户进行包装

form - - - - form-control - - - - checkbox/datepicker/input

3、现在确定checkbox这种级别的基础组件需要单独写，不包含在form里面。form-control组件的定义包含在form组件里面，同时！checkbox等组件提供一个继承于form-control的接口，用于开发

4、本次我要实现的组件：input（包括inputNum）、switch、slider、select、datepicekr、image-upload

5、自己要有验证规则，验证以后还得返回一些数据


一般form-control需要提供的api

date
text/textarea/info/number
radio/radios/checkbox/checkboxs
switch/switches
upload
