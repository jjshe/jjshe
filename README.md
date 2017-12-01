# jjshe

- [Git笔记](git.md)
- [Gulp笔记](gulp.md)
- [webpack笔记](webpack.md)
- [React笔记](react.md)
- [响应式布局](responseLayout)
- [margin布局](margin.html)
- [自定义复选框样式](checkBox.html)


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

# 下面是布局相关规范
/* 
    Update: 2017-10-16
    Author: Charlence.Huang
    Email:  charlence@vip.qq.com
    theme:  模块化设计的注意事项，将不定期进行修改、更新；      

    禁忌：
    1、永远不要给布局的子内容强加内边距和元素样式，布局只关注垂直对齐、水平对齐、文字间距；
    2、主题和别的数据属性值永远不要强制改变外观，必须保持布局、组件和元素可以应用于其上；
    3、组件总是贴着它的父容器的四个边，元素都没有上外边距和左外边距，所有的最后节点的（最右边和最下边的节点）外边距都会被清除；
    4、组件本身永不添加背景、宽度、浮动、内外边距的样式； 组件样式是组件内元素的样式；
    5、每个元素有且只有一个唯一的且作用域只在组件内的CSS类名，所有的样式都是直接应用到这个选择器上，且只有上下文和主题能修改元素的样式；
    6、永远不要在元素上使用上外边距，第一个元素总是贴在它所在组件的顶部；
    7、？JS不绑定任何元素的CSS类名，选中元素通过数据属性实现

    遵循原则：
    1、单一责任原则：每个CSS类都有一个简单的、高度聚焦的责任；
    2、单一的来源：页面的每个元素都只有唯一的CSS类；
    3、可选的修饰符：每一个单独的样式变更，都需做成可选！如果修饰符A给组件B，那么修饰符A不会影响任何组件C，除非C也选用修饰符A;
    4、可选的上下文：(可控且具有一致性) 组件可根据所在的父级元素或者父级元素的某些数据属性来改变自身的表现。
    5、语义化的网格：创造一组可以通过数据属性的值来应用的常用网络布局方式。

    @ 初版命名说明
    e.g.
        组件命名规则 
        header / mx-header      ->  组件/模块名        （组件名最好为小写字母的英文字符串，或仅由1个中横线构成的组件名；）
        HEADER--xxx             ->  组件皮肤          （组件皮肤由: 大写组件名 + 2个连续的中横线 + 最好为小写字母的英文字符串构成；可创造更多的皮肤；） 
        header__top             ->  子组件/子模块名    （子组件名由: 父组件名 + 2个连续的下划线 + 最好为小写字母的英文字符串构成；） 
        header__top--active     ->  子组件+状态符的组合 （子组件 + 能描述状态语义的英文字符串 ）
        header__top__item       ->  子组件元素         （子组件元素，用于指定组件内的CSS类名，承担视觉效果呈现的功能，且不能单独设置，需有上下文和主题的约束；）

        id规则
        add_more / loadding     ->  由小写英文字母及其下划线组成  




	OOCSS: 模块 皮肤
	SMACSS: 模块样式 子模块 子模块状态 - 基础，布局，模块，状态，主题
	BEM: 类名命名规则
	布局 组件样式 子组件 子组件状态 
*/