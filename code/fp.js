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
*/

//纯函数
let array = [1,2,3,4,5];
console.log(array.slice(0,3));
console.log(array.slice(0,3));

//不纯的函数
console.log(array.splice(0,3));
console.log(array.splice(0,3));