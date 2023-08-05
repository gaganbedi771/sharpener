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

delay(6000);

setTimeout (()=>{

console.log("first")

},10000)

console.log("second");