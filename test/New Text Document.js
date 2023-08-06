// function x(){
//     for(let i=1;i<6;i++){
//         setTimeout(function(){
//             console.log(i);
//         },1000)
//     }
//     console.log("running")
// }

// x();

// let arr1=[1,2,3];
// let arr2=arr1
// arr1=[]
// console.log(arr2);

// async function fun() {
//     await new Promise((resolve,reject)=>{
//         setTimeout(() => {
//             console.log("a");
//             resolve();
//         }, 2000)
//     })
//     console.log("b");
// }

// fun();
"use strict" 
class Human {

  fun = () => {
    console.log(this);
  };

  fun2(){
    console.log(this);
  }
}

const per1 = new Human();

per1.fun();
per1.fun2();



const obj = {
  print: function() {
    console.log(this)
    const print2 = () => {
      console.log(this)
    }
    print2()
  }
}

obj.print()


const obj4 = {
  name: "obj4",
  getThis() {
    return this;
  },
};

const obj5 = { name: "obj5" };
console.log(obj4.getThis())
obj5.getThis = obj4.getThis;
console.log(obj5)
console.log(obj5.getThis()); // { name: 'obj5', getThis: [Function: getThis] }

