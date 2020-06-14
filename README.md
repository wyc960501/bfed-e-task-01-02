# 简答题
### 1、描述引用计数的工作原理和优缺点。
工作原理：通过引用计数器来维护当前对象的引用数，从而判断该对象的引用数值是否为0，来决定它是不是一个垃圾对象。当数值为0的时候，GC开始工作将对象所在的空间进行回收和释放以供再次使用。  
优点：发现垃圾时立即回收；最大限度减少程序暂停。  
缺点：无法回收循环引用的对象；时间开销大。
### 2、描述标记整理算法的工作流程。
- 首先遍历所有对象，将当前可达对象进行标记；
- 接着把当前活动对象进行移动，在地址上变成连续的位置；
- 最后遍历所有对象清除没有标记对象；
### 3、描述V8中新生代存储区垃圾回收的流程。
- 回收过程采用复制算法 + 标记整理算法
- 新生代内存分为两个等大小空间
- 使用空间为From,空闲空间为To
- 活动对象存储于From空间
- 标记整理后将活动对象拷至To
- From 与 To 交换空间完成释放
### 4、描述增量标记算法在何时使用。
增量标记算法主要是提高老年代存储区垃圾回收效率。

# 代码题1
### 基于以下代码完成下面的四个练习
```
const fp = require('lodash/fp')

//数据
// horsepower 马力，dollar_value 价格，in_stock 库存
const cars = [
  {name: "Ferrari FF", horsepower:660,dollar_value: 700000, in_stock: true},
  {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
  {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
  {name: "Aston Martin One-77", horsepower : 750, dollar_value: 1850000, in_stock: true},
  {name: "Pagani Huayra", horsepower:700, dollar_value: 1300000, in_stock: false}
]
```

### 1、使用函数组合fp.flowRight() 重新实现下面这个函数
```
let isLastInStock = function(cars){
  //获取最后一条数据
  let last_car = fp.last(cars)
  //获取最后一条数据的in_stock 属性值
  return fp.prop('in_stock',last_car)
}
```
fp.flowRight()方法重现
```
let isLastInStock = fp.flowRight(fp.prop('in_stock'),fp.last)
```

### 2、使用fp.flowRight()、fp.prop() 和 fp.first() 获取第一个car 的 name
```
let getFirstCarName = fp.flowRight(fp.prop('name'),fp.first)
let firstCarName = getFirstCarName(cars)
```

### 3、使用帮助函数_average 重构 averageDollarValue, 使用函数组合的方式实现
```
let _average = function(xs){
  return fp.reduce(fp.add,0,xs) / xs.length
}

let averageDollarValue = function(cars){
  let dollar_values = fp.map(function (car) {
    return car.dollar_value
  },cars)
  return _average(dollar_values)
}
```
重构
```
let averageDollarValue = fp.flowRight(_average,fp.map('dollar_value'))
let result = averageDollarValue(cars)
```

### 4、使用flowRight 写一个 sanitizeNames() 函数，返回一个下划线连接的小写字符串，把数组中的name 转换为这种形式：例如：sanitizeNames(['Hello World']) => ["hello_world"]
```
let _undersocre = fp.replace(/\W+/g,'_')

let sanitizeNames = fp.flowRight(fp.map(fp.flowRight(fp.toLower,_underscore)),fp.map('name'))
let result = sanitizeNames(cars)
```

# 代码题2
### 基于下面提供的代码，完成后续的四个练习
```
// support.js
class Container {
  static of (value) {
    return new Container(value)
  }
  
  constructor (value) {
    this._value = value
  }
  
  map (fn) {
    return Container.of(fn(this._value))
  }
}

class Maybe {
  static of (x) {
    return new Maybe(x)
  }
  
  isNothing () {
    return this._value === null || this._value === undefined
  }
  
  constructor (x) {
    this._value = x
  }
  
  map (fn) {
    return this.isNothing() ? this : Maybe.of(fn(this._value))
  }
}

module.exports = {
  Maybe,
  Container
}

```
### 1、使用 fp.add(x,y) 和 fp.map(f,x) 创建一个能让 functor 里的值增加的函数 ex1
```
const fp = require('lodash/fp')
const {Maybe,Container} = require('./support')

let maybe = Maybe.of([5,6,1])
let ex1 = maybe.map(value => fp.map(fp.add(1),value))
```

### 2、实现一个函数 ex2, 能够使用fp.first 获取列表的第一个元素
```
const fp = require('lodash/fp')
const {Maybe, Container} = require('./support')

let xs =  Container.of(['do','ray','me','fa','so','la','ti','do'])
let ex2 = xs.map( value => fp.first(value))
```

### 3、实现一个函数 ex3，使用 safeProp 和 fp.first 找到 user 的名字的首字母
```
const = fp = require('lodash/fp')
const {Maybe, Container} = require('./support')

let safeProp = fp.curry(function (x,o){
  return Maybe.of(o[x])
})

let user = {id: 2, name: "Albert"}
let ex3 = safeProp("name")(user).map(value => fp.first(value))
```

### 4、使用Maybe 重写 ex4，不要有if 语句
```
const fp = require('lodash/fp')
const {Maybe，Container} = require('./support')

let ex4 = function (n){
  if (n){
    return parseInt(n)
  }
}

```
重写
```
let ex4 = Maybe.of(n).map(value => parseInt(value))
```
