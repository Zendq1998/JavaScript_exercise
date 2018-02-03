### 1     
#### 我的答案
2   
1    
5    
4     
#### 正确答案
1    
2     
3    
4     
#### 分析
js一切皆对象，都具有属性(除了undefined)     
a.b，b是a函数的一个属性     
a.prototype.b，是a的对象的一个属性     
new a()将a看作构造函数，生成一个a的对象     
### 2
#### 我的答案    
1    
#### 正确答案    
2
#### 分析
构造函数不需要返回值     
使用new来创建对象时，如果return的是非对象会忽而略返回值    
如果return的是对象，则返回该对象      
### 3
#### 我的答案
true     
true        
true      
#### 正确答案
false    
true    
true      
#### 分析
Object prototype may only be an Object or null    
Object.create(undefined);不存在，报错     
Object.create(null);创建一个空类型对象，无任何属性    
Object.create([])或Object.create({})创建对象类型对象，本省内置一串原型链，含有toString()方法
### 4
#### 我的答案
将输入的类型转化为字符串，输出切片
#### 正确答案
获取输入的值的类型
#### 分析
Object.prototype.toString返回一种标准格式字符串      
将此函数应用于输入值，获取值的[[Class]]内部属性    
返回值：[object [Class]]    
slice截取[Class]   
### 5
#### 我的答案
li     
2    
world     
foo      
true     
false
#### 正确答案
false    
true     
hi     
true    
false      
#### 分析
通过赋值来添加的普通属性会创建在属性枚举期间显示的属性（for...in 或 Object.keys 方法），这些值可以被改变，也可以被删除      
Object.defineProperty() 添加的属性值是不可变的，且默认不可枚举，但可以用'in'判断是否含有该属性          
delete 操作符返回true或false，是对原对象的操作
### Task
(1)
```javascript
function Person(name,age){
	this.name = name;
	this.age = age;
};
Person.prototype.introduce = function(){
	console.log("I am " + this.name + ", I am " + String(this.age) + " years old!");
};
```
(2)
```javascript
function Vector(x,y){
	this.x = x;
	this.y = y;
}
Vector.prototype.plus = function(Vector){
	var a = {};
	a.x = this.x + Vector.x;
	a.y = this.y + Vector.y;
	return a;
};
Vector.prototype.minus = function(Vector){
	var a = {};
	a.x = this.x - Vector.x;
	a.y = this.y - Vector.y;
	return a;
};
```
