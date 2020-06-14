/* 
    3、函数式编程概念
    函数式编程（Functional Programming,FP),FP是编程范式之一，我们常说的编程范式还有"面向过程编程"、"面向对象编程";
    面向对象编程的思维方式：把现实世界的事物抽象成程序世界中的类和对象，通过封装、继承、多态来演示事物事件的联系;
    函数式编程的思维方式：把现实世界的事物和事物之间联系抽象到程序世界（对运算过程进行抽象）;
    程序的本质：根据输入通过某种运算获得相应的输出，程序开发过程中会涉及很多输入输出的函数;
    函数式编程中的函数指的不是程序中的函数（方法），而是数学中的函数及映射关系，例如：y=sin(x),x和y的关系;
    相同的输入始终要得到相同的输出（纯函数）;
    函数式编程用来描述数据（函数）之间的映射。 
*/

//非函数式
/* let num1 = 2;
let num2 = 3;
let sum = num1 + num2;
console.log(sum); */

//函数式
/* function add(n1,n2){
    return n1 + n2;
}
let sum = add(2,3);
console.log(sum); */



/* 
    4、函数是一等公民
    函数可以存储在变量中;
    函数作为参数;
    函数作为返回值
    在JavaScript中函数就是一个普通的对象（可以通过new Function()），我们可以把函数存储到变量/数组中，它还可以作为另一个函数的参数和返回值，甚至我们可以在程序运行的时候通过new Function('alert(1)')来构造一个新的函数。
*/

//把函数赋值给变量
/* let fn = function(){
    console.log("Hello First-class Function");
}
fn(); */

//示例(把函数赋值给函数)
/* const BlogController = {
    index(posts){return Views.index(posts)},
    show(post){return Views.show(post)},
    create(attrs){return Db.create(attrs)},
    update(post,attrs){return Db.update(post,attrs)},
    destroy(post){return Db.destroy(post)}
} */

//优化
/* const BlogController = {
    index: Views.index,
    show: Views.show,
    create: Db.create,
    update: Db.update,
    destroy: Db.destroy
} */



/* 
    5、高阶函数-函数作为参数
    什么是高阶函数：a、可以把函数作为参数传递给另一个函数；b、可以把函数作为另一个函数的返回结果。
*/

//forEach
/* function forEach(array,fn){
    for (let i = 0;i < array.length; i++){
        fn(array[i]);
    }
}
let arr = [1,3,4,7,8];
forEach(arr,function(item){
    console.log(item);
}) */

//filter
/* function filter(array,fn){
    let results = [];
    for(let i = 0; i < array.length; i++){
        if(fn(array[i])){
            results.push(array[i]);
        }
    }
    return results;
}

let arr = [1,3,4,7,8];
let r = filter(arr,function(item){
    return item % 2  === 0;
});
console.log(r); */



/* 
    6、高阶函数-函数作为返回值
*/

/* function makeFn(){
    let msg = 'Hello function';
    return function(){
        console.log(msg);
    }
}

const fn = makeFn();
fn();
makeFn()(); */

//once函数,只能执行一次
/* function once(fn){
    let done = false;
    return function(){
        if(!done){
            done = true;
            return fn.apply(this,arguments)
        }
    }
}
let pay = once(function(money){
    console.log(`支付：${money} RMB`);
});
pay(5);
pay(5);
pay(5); */



/* 
    7、高阶函数的意义
    抽象可以帮我们屏蔽细节，只需要关注我们目标；
    高阶函数是用来抽象通用的问题
*/
//面向过程的方式
/* let array = [1,2,3,4];
for (let i=0;i<array.length;i++){
    console.log(array[i]);
} */

//高阶函数，第六节高阶函数细节
/* let array = [1,2,3,4]
forEach(array,item => {
    console.log(item);
});

let r = filter(array,item => {
    return item % 2 === 0;
}) */



/* 
    8、常用高阶函数（模拟）
    forEach、map、filter、every、some、find/findindex、reduce、sort、....(数组常用方法)
*/

//map方法，对数组中的每一个元素进行遍历，并对每一个元素进行处理，然后把处理的结果存储到一个新的数组中返回
/* const map = (array,fn) => {
    let results = [];
    for(let value of array){
        results.push(fn(value));
    }
    return results;
}

let arr = [1,2,3,4];
arr = map(arr,v=> v*v);
console.log(arr); */

//every方法，用来判断数组中的每一个元素是否都匹配我们指定的条件
/* const every = (array,fn) => {
    let result = true;
    for(let value of array){
        result = fn(value)
        if(!result){
            break;
        }
    }
    return result;
}

let arr = [9,12,14,];
let r = every(arr,v => v > 10);
console.log(r);
 */

 //some方法，用来检测数组中是否有一个元素匹配我们指定的条件
/*  const some = (array,fn) => {
     let result = false;
     for(let value of array){
        result = fn(value);
        if(result){
            break;
        }
     }
     return result;
 }

 let arr = [1,3,4,9];
 let r = some(arr,v => v % 2 === 0);
 console.log(r); */



 /* 
    9、闭包-概念
    闭包（Closure):函数和其周围的状态（词法环境）的引用捆绑在一起形成闭包；
    可以在另一个作用域中调用一个函数的内部函数并访问到该函数的作用域中的成员;
    闭包的本质：函数在执行的时候会放到一个执行栈上，当函数执行完毕之后会从执行栈上移除，但是堆上的作用域成员因为被外部引用不能释放，因此内部函数依然可以访问外部函数的成员。
 */

/* function makeFn(){
    let msg = 'Hello function';
    return function(){
        console.log(msg);
    }
}

const fn = makeFn();
fn();
makeFn()(); */

/* function once(fn){
    let done = false;
    return function(){
        if(!done){
            done = true;
            return fn.apply(this,arguments)
        }
    }
}
let pay = once(function(money){
    console.log(`支付：${money} RMB`);
});
pay(5);
pay(5);*/



/* 
    9、闭包-案例
*/

//求平方
/* function makePower(power){
    return function (number){
        return Math.pow(number,power);
    }
}

let power2 = makePower(2);
let power3 = makePower(3);

console.log(power2(4));
console.log(power2(5));
console.log(power3(4)); */

//求工资
/* function makeSalary(base){
    return function(performance){
        return base + performance;
    }
}

let salaryLevel1 = makeSalary(12000);
let salaryLevel2 =  makeSalary(15000);

console.log(salaryLevel1(2000));
console.log(salaryLevel2(3000)); */



/* 
    11、纯函数概念
    纯函数：相同的输入永远会得到相同的输出，而且没有任何观察的副作用；
        纯函数就类似数学中的函数（用来描述输入和输出之间的关系），y=f(x);
    lodash是一个纯函数的功能库，提供了对数组、数字、对象、字符串、函数等操作的一些方法;
    数组的slice和splice分别是：纯函数和不纯的函数;
        slice 返回数组中指定的部分，不会改变原数组
        splice 对数组进行操作返回该数组，会改变原数组
    函数式编程不会保留计算中间的结果，所以变量是不可变的（无状态的）
    我们可以把一个函数的执行结果交给另一个函数去处理
*/

//纯函数
/* let array = [1,2,3,4,5];
console.log(array.slice(0,3));
console.log(array.slice(0,3)); */

//不纯的函数
/* console.log(array.splice(0,3));
console.log(array.splice(0,3)); */

//纯函数
/* function getSum(n1,n2){
    return n1 + n2;
}
console.log(getSum(1,2));
console.log(getSum(1,2));
console.log(getSum(1,2)); */



/* 
    12、Lodash 
    firts/ last / toUpper / reverse / each / includes / find / findIndex
*/
/* const _= require('lodash');

const array = ['jack','tom','lucy','kate'];
console.log(_.first(array));
console.log(_.last(array));
console.log(_.toUpper(_.first(array)));

console.log(_.reverse(array));
const r = _.each(array,(item,index) => {
    console.log(item,index);
});
console.log(r); */



/* 
    13、纯函数的好处
    a、可缓存（因为纯函数对相同输入始终有相同的结果，所以可以把纯函数的结果缓存起来)
    b、可测试（纯函数让测试更方便）
    c、并行处理（在多线程环境下并行操作共享的内存数据很可能会出现意外情况，纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数）
*/

/* const _ = require('lodash');

function getArea(r){
    console.log(r);
    return Math.PI * r * r;
} */

/* let getAreaWithMemory = _.memoize(getArea);
console.log(getAreaWithMemory(4));
console.log(getAreaWithMemory(4));
console.log(getAreaWithMemory(4)); */

//模拟 memoize方法的实现
/* function memoize(f){ 
    let cache = {};
    return function(){
        let key = JSON.stringify(arguments);
        cache[key] = cache[key] || f.apply(f,arguments);
        return cache[key];
    }
}
let getAreaWithMemory = memoize(getArea);
console.log(getAreaWithMemory(4));
console.log(getAreaWithMemory(4));
console.log(getAreaWithMemory(4)); */


/* 
    14、副作用
    纯函数：对于相同的输入永远会得到相同的输出，而且没有任何可观察的副作用
    副作用让一个函数变的不纯（如下），纯函数的根据相同的输入返回相同的输出，如果函数依赖于外部的状态就无法保证输出相同，就会带来副作用）
    副作用来源：配置文件、数据库、获取用户输入
    所有的外部交互都有可能代理副作用，副作用也使得方法通用性下降不合适扩展和可重用性，同时副作用会给程序中带来安全隐患给程序带来不确定性，但是副作用不可能完全禁止，尽可能控制他们在可控的范围内发生。
*/

//不纯的
/* let mini = 18
function checkAge (age){
    return age >= MediaDeviceInfo
} */

//纯的（有硬编码，后续通过柯里化解决）
/* function checkAge(age){
    let mini = 18
    return age >= mini
} */



/* 
    15、柯里化：当一个函数有多个参数的时候先传递一部分参数调用它（这部分参数以后永远不变），然后返回一个新的函数接受剩余的参数，返回结果
    使用柯里化解决上一个问题的硬编码问题
    
*/

//普通的纯函数
/* function checkAge(min,age){
    return age >= min
}

console.log(checkAge(18,20));
console.log(checkAge(18,24));
console.log(checkAge(22,24)); */

// function checkAge(min){
//     return function (age){
//         return age >= min
//     }
// }

//es6
/* let checkAge = (min => (age => age >= min));

let checkAge18 = checkAge(18)
let checkAge20 = checkAge(20)

console.log(checkAge18(20))
console.log(checkAge20(24)) */




/* 
    16、Loadsh中的柯里化方法
    _.curry(func) 
    功能：创建一个函数，该函数接受一个或多个func参数，如果func所需要的参数都被提供则执行func并返回执行的结果，否则继续返回该函数并等待接受剩余参数
    参数：需要柯里化的函数
    返回值：柯里化后的函数
*/
/* const _ = require('lodash')

//要柯里化的函数
function getSum(a,b,c){
    return a + b + c
}

//柯里化后的函数
let curried = _.curry(getSum)
//测试
console.log(curried(1,2,3))
console.log(curried(1)(2)(3))
console.log(curried(1,2)(3)) */



/* 
    17、柯里化案例
*/
/* const _ = require('lodash')

const match = _.curry(function(reg,str){
    return str.match(reg)
})

const haveSpace = match(/\s+/g)
const haveNumber = match(/\d+/g)

console.log(haveSpace('helloworld'))
console.log(haveNumber('abc'))

const filter = _.curry(function(func,array){
    return array.filter(func)
})

const findSpace = filter(haveSpace)
console.log(filter(haveSpace,['Jonhn Connor','John_Donne']))
console.log(findSpace(['John Connor','John_Donne'])) */


/* 
    18、柯里化原理模拟
*/
//模拟实现 lodash 中的curry 方法
/* function getSum(a,b,c){
    return a + b + c
}

const curried = curry(getSum)

console.log(curried(1,2,3))
console.log(curried(1)(2,3))
console.log(curried(1,2)(3))

function curry(func){
    return function curriedFn(...args){
        //判断实参和形参的个数
        if(args.length < func.length){
            return function(){
                return curriedFn(...args.concat(Array.from(arguments)))
            }
        }
        return func(...args)
    }
} */


/* 
    19、柯里化总结
    柯里化可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数
    这是一种对函数参数的缓存
    让函数变得更灵活，让函数的粒度更小
    可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能
*/



/* 
    20、函数组合概念

    纯函数和柯里化函数容易写出洋葱代码 h(g(f(x))),例：获取数组的最后一个元素转换成大写字母 _.toUpper(_.first(_.reverse(array)))
    函数组合可以让我们把细粒度的函数重新组合生产一个新的函数

    函数组合：如果一个函数要经过多个函数处理才能得到最终值，这个时候可以把中间过程的函数合并成一个函数
        函数就像是数据的管道，函数组合就是把这些管道连接起来，让数据穿过多个管道形成最终结果
        函数组合默认是从右到左至执行
*/

//函数组合演示
/* function compose(f,g){
    return function(value){
        return f(g(value))
    }
}

function reverse(array){
    return array.reverse()
}

function first(array){
    return array[0]
}

const last = compose(first,reverse)

console.log(last([1,2,3,4])) */



/* 
    21、Lodash中的组合函数

        lodash 中组合函数 flow() 或者 flowRight(),他们都可以组合多个函数
        flow() 是从左到右运行
        flowRight() 是从右到左运行，使用的更多一些
*/

//lodash 中的函数组合的方法 _.flowRight()
/* const _ = require('lodash')

const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase()

const f = _.flowRight(toUpper,first,reverse)
console.log(f(['one','two','three'])) */



/* 
    22、组合函数原理模拟
*/
// 模拟 lodash 中的 flowRight
/* const reverse = arr => arr.reverse()
const first = arr => arr[0]
const toUpper = s => s.toUpperCase() */

/* function compose(...args){
    return function (value){
        return args.reverse().reduce(function(acc,fn){
            return fn(acc)
        },value)
    }
} */
/* const compose = (...args) => value => args.reverse().reduce((acc,fn) => fn(acc),value)
const f = compose(toUpper,first,reverse)
console.log(f(['one','two','three'])) */


/* 
    23、函数组合-结合律
*/
//函数数组要满足结合律
/* const _ = require('lodash')

// const f = _.flowRight(_.toUpper,_.first,_.reverse)
// const f = _.flowRight(_.flowRight(_.toUpper,_.first),_.reverse)
const f = _.flowRight(_.toUpper,_.flowRight(_.first,_.reverse))

console.log(f(['one','three','five'])) */



/* 
    24、函数组合-调试
*/

//NEVER SAY DIE --> never-say-die
/* const _ = require('lodash')

// const log = v => {
//     console.log(v)
//     return v
// }

const trace = _.curry((tag,v) => {
    console.log(tag,v)
    return v
})

//_.map()
const map = _.curry((fn,array) => _.map(array,fn))

//_.split()
const split = _.curry((sep,str) => _.split(str,sep))

//_.join()
const join = _.curry((sep,arr) => _.join(arr,sep))


// const f = _.flowRight(join('-'),log,map(_.toLower),log,split(' '))
const f = _.flowRight(join('-'),trace('map 之后'),map(_.toLower),trace('split 之后'),split(' '))
console.log(f('NEVER SAY DIE')) */



/* 
    25、Ladash-fp模块

    lodash 的 fp 模块提供了使用的对函数式编程友好的方法
    提供了不可变 auto-curried iteratee-first data-last的方法
*/
// NEVER SAY DIE --> never-say-die
/* const fp = require('lodash/fp')

const f = fp.flowRight(fp.join('-'),fp.map(fp.toLower),fp.split(' '))
console.log(f('NERVER SAY DIE'))
 */

/* 
    26、Lodash-map方法的小问题
*/
// lodash 和 lodash/fp 模块中 map 方法的区别

/* const _ = require('lodash')
console.log(_.map(['23','8','10'],parseInt))// lodash 中 map 方法中的 第二个参数函数接受三个参数：parseInt('23',0,array)、parseInt('8',0,array)、parseInt('10',2,array) */

/* const fp = require('lodash/fp')
console.log(fp.map(parseInt,['23','8','10']))// loadash/fp 模块的 map 的方法中 第二个参数函数只接一个参数 */




/* 
    27、Pointfree

    Pointfree: 我们可以把数据处理的过程定义成与数据无关的合成运算，不需要用到代表数据的那个参数，只要把简单的运算步骤合成到一起，在使用这种模式之前我们需要定义一些辅助的基本运算函数
        
    概括：a、不需要指明处理的数据; b、只需要合成运算过程；c、需要定义一些辅助的基本运算函数

    例：const f = fp.flowRight(fp.join('_'),fp.map(._toLower),fp.split(' '))

    非 Point free 模式 Hello World => hello_world
    function f (word){
        return word.toLowerCase().replace(/\s+/g,'_')
    }
*/

// point free 模式 Hello World => hello_world

/* const fp = require('lodash/fp')

const f = fp.flowRight(fp.replace(/\s+/g,'_'),fp.toLower)
console.log(f('Hello World')) */




/* 
    28、Pointfree-案例
*/

// 把一个字符串中的首字母提取并转换成大写，使用.作为分隔符 world wild web ==> W.W.W

/* const fp = require('lodash/fp')

// version 1
// const firstLetterToUpper = fp.flowRight(fp.join('.'),fp.map(fp.first),fp.map(fp.toUpper),fp.split(' '))

// version 2
const firstLetterToUpper = fp.flowRight(fp.join('.'),fp.map(fp.flowRight(fp.first,fp.toUpper)),fp.split(' '))

console.log(firstLetterToUpper('world wild web')) */


/* 
    29、Functor (函子)

    什么是 Functor :
        a、容器：包含值和值的变形关系（这个变形关系就是函数）
        b、函子：是一个特殊的容器，通过一个普通函数的对象来实现，该对象具有map方法，map方法可以运行一个函数对值进行处理（变形关系）
*/

// Functor 函子 version 1
/* class Container{
    constructor(value){
        this._value = value
    }

    map (fn){
        return new Container(fn(this._value))
    }
}

let r = new Container(5)
    .map(x => x + 1)
    .map(x => x * x)
console.log(r) */

// Functor 函子 version 2
/* class Container{
    static of(value){
        return new Container(value)
    }

    constructor(value){
        this._value = value
    }

    map(fn){
        return Container.of(fn(this._value))
    }
}

let r = Container.of(8)
    .map(x => x + 2)
    .map(x => x * x)
console.log(r) */




/* 
    30、Functor总结

    函数式编程运算不直接操作值，而是有函子完成

    函子就是一个实现了map 契约的对象

    我们可以把函子想象成一个盒子，这个盒子里封装了一个值

    想要处理盒子中的值，我们需要给盒子的map方法传递一个处理值得函数(纯函数),由这个函数来对值进行处理

    最终map方法返回一个包含新值的盒子（函子）
*/




/* 
    31、MayBe函子

    我们在编程的过程中可能会遇到很多错误，需要对这些错误做相应的处理
    MayBe 函子的作用就是可以对外部的空值情况做处理（控制副作用在允许的范围）
*/

// MayBe 函子
/* class MayBe{
    static of(value){
        return new MayBe(value)
    }

    constructor(value){
        this._value = value
    }

    map (fn){
        return this.isNothing()?MayBe.of(null):MayBe.of(fn(this._value))
    }

    isNothing(){
        return this._value === null || this._value === undefined
    }
} */

/* let r = MayBe.of("Hello World")
    .map(x => x.toUpperCase())
console.log(r) */

/* let r = MayBe.of(null)
    .map(x => x.toUpperCase())
console.log(r) */

//MayBe 函子 多次调用map时，出现相应错误时不知道出错的位置
/* let r = MayBe.of('hello world')
    .map(x => x.toUpperCase())
    .map(x => null)
    .map(x = x.toUpperCase())
console.log(r) */



/* 
    32、Either函数

    Either 两者中的任何一个，类似于if...else...的处理
    异常会让函数变得不存，Either函子可以用来做异常处理
*/

// Either 函子
/* class Left{
    static of (value){
        return new Left(value)
    }

    constructor(value){
        this._value = value
    }

    map(fn){
        return this
    }
}

class Right{
    static of(value){
        return new Right(value)
    }

    constructor(value){
        this._value = value
    }

    map(fn){
        return Right.of(fn(this._value))
    }
} */

/* let r1 = Right.of(12).map(x => x+2)
let r2 = Left.of(12).map(x => x+2)

console.log(r1)
console.log(r2) */

/* function parseJSON(str){
    try{
        return Right.of(JSON.parse(str))
    }catch(e){
        return Left.of({error:e.message})
    }
} */

/* let r = parseJSON('{name:zs}')
console.log(r) */

/* let r = parseJSON('{"name":"zs"}')
console.log(r) */




/* 
    33、IO函子

    IO 函子中的_value是一个函数，这里是把函数作为值来处理

    IO 函子可以把不存的动作存储到_value中，延迟执行这个不纯的操作（惰性执行），包装当前的操作纯

    把不纯的操作交给调用者来处理
*/

// 案例
/* const fp = require('lodash/fp')
class IO{
    static of(value){
        return new IO(function(){
            return value
        })
    }

    constructor(fn){
        this._value = fn
    }

    map(fn){
        return new IO(fp.flowRight(fn,this._value))
    }
}

let r = IO.of(process).map(p => p.execPath)
// console.log(r)
console.log(r._value()) */



/* 
    34、Folktale

    异步任务的实现过于复杂，我们使用folktale中的Task来演示

    folktale 一个标准的函数式编程库
        a、和lodash、ramda 不同的是，他没有提供很多功能函数
        b、只提供了一些函数式处理的操作，例如：compose、curry 等，一些函子Task、Either、MayBe等
*/

// 案例
/* const {compose,curry} = require('folktale/core/lambda')
const {toUpper,first} = require('lodash/fp') */

//第一个参数是传入函数的参数个数
/* let f = curry(2,function(x,y){
    console.log(x + y)
})
f(3,4)
f(3)(4) */

// 函数组合
/* let f = compose(toUpper,first)
console.log(f(['one','two'])) */



/* 
    35、Task函子

    Task 异步执行
        folktale(2.3.2)2.x中的Task和1.0中的Task区别很大，1.0中的用法更接近我们现在演示的函子
        这里以2.3.2来演示
*/

//Task 处理异步任务
/* const fs = require('fs')
const {task} = require('folktale/concurrency/task')
const {split,find}  =  require('lodash/fp')

function readFile(filename){
    return task(resolver => {
        fs.readFile(filename,'utf-8',(err,data) => {
            if(err){
                resolver.reject(err)
            }
            resolver.resolve(data)
        })
    })
}

readFile('package.json')
    .map(split('\n'))
    .map(find(x => x.includes('version')))
    .run()
    .listen({
        onRejected:err =>{
            console.log(err)
        },
        onResolved:value => {
            console.log(value)
        }
    }) */




/* 
    36、Pointed函子

    Pointed 函子是实现了of静态方法的函子
    of方法是为了避免使用new 来创建对象，更深层的含义是of 方法用来把值放到上下文Context (把值放到容器中，使用 map 来处理值)

    例：
        class Container{
            static of(value){
                return new Container(value)
            }

            ......
        }

        Container.of(2)
            .map(x => x + 5)
*/



/* 
    37、IO函子问题（函子嵌套）

*/

/* const fs = require('fs')
const fp = require('lodash/fp')

class IO{
    static of(value){
        return new IO(function(){
            return value
        })
    }

    constructor(fn){
        this._value = fn
    }

    map(fn){
        return new IO(fp.flowRight(fn,this._value))
    }
}

let readFile = function(filename){
    return new IO(function(){
        return fs.readFileSync(filename,'utf-8')
    })
}

let print = function(x){
    return new IO(function(){
        console.log(x)
        return x
    })
}

let cat = fp.flowRight(print,readFile)

let r = cat('package.json')._value()._value()
console.log(r) */



/* 
    38、Monad函子

    Monad 函子是可以变扁的Pointed 函子，IO(IO(x))
    一个函子如果具有join和of两个方法并遵守一些定律就是一个Monad
*/

// IO Monad
/* const fs = require('fs')
const fp = require('lodash/fp')

class IO{
    static of(value){
        return new IO(function(){
            return value
        })
    }

    constructor(fn){
        this._value = fn
    }

    map(fn){
        return new IO(fp.flowRight(fn,this._value))
    }

    join(){
        return this._value()
    }

    flatMap(fn){
        return this.map(fn).join()
    }
}

let readFile = function(filename){
    return new IO(function(){
        return fs.readFileSync(filename,'utf-8')
    })
}

let print = function(x){
    return new IO(function(){
        console.log(x)
        return x
    })
}

let r = readFile('package.json')
    .map(fp.toUpper)
    .flatMap(print)
    .join()

console.log(r) */
