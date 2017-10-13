# jjshe

- [Git笔记](git.md)
- [Gulp笔记](gulp.md)
- [webpack笔记](webpack.md)
- [React笔记](react.md)



# javascript 规范文档1.0
##  常用规范

```js
//s：表示字符串。例如：
var sName='tom',sHtml='<div></div>';
//n：表示数字。例如：
var nPage=1；
//b：表示逻辑。例如：
var bChecked，bHasLogin；
//a：表示数组。例如：
var aList = []，aGroup = []；
//r：表示正则表达式。例如：
var rDomain = /mxtrip.cn/，rEmail = /[a-z][\/d]@mxtrip.cn/i；
//f：表示函数。例如：
function fGetHtml(){}，var fInit=funtion(){}；
//o：表示以上未涉及到的其他对象，例如：
var oButton = {}，var oDate = new date()；
//g：表示全局变量，例如：
gUserName，gLoginTime；
```
***
## 常量
* 某些作为不允许修改值的变量认为是常量，全部字母都大写。
* 例如：`COPYRIGHT，PI`。
* 常量可以存在于函数中，也可以存在于全局。
***
## 对象
* 使用字面量定义法创建
```js
var oPerson ={};
```
***
## 数组
* 使用字面量定义法创建
```js
var oItems = [];
```
***
## 字符串
* 字符定义使用单引号
```js 
var sName = 'tom'
```
***
## jquery 
* $：表示Jquery对象。例如：`$Content，$Module`；
* 一种比较广泛的Jquery对象变量命名规范。
* j：表示Jquery对象。例如：`jContent， jModule`；
* 另一种Jquery对象变量命名方式。
***
## 函数
* fn：表示函数。例如：`fnGetName，fnSetAge`；
* fn能够更好的区分普通变量和函数变量。
***
## dom
* dom：表示Dom对象，例如：`domForm，domInput`；
项目中很多地方会用到原生的Dom方法及属性，可以根据团队需要适当修改。 
***
## 临时变量
1. 作用域不大临时变量可以简写，比如：`str，num，bol，obj，fun，arr`。
2. 循环变量可以简写，比如：`i，j，k`等。
***
## 命名普通对象、函数时使用首字小写驼峰拼写
```js
var oPerson = {};
function isMyFunction(){};
```
***
## 命名实例对象、构造函数时使用首字大写驼峰拼写
```js
var Person = new oPerson{
    name:'tom',
    setAge:function(){}
};
function Person(){
    this.name = 'tom';
    this.getAge = function(){};
};
```
***
## 私有属性使用前置下划线
```js
this._firstName = 'james'
```
###### 这是 H6 <六级标题>
**这是文字粗体格式**
*这是文字斜体格式*
~~在文字上添加删除线~~
