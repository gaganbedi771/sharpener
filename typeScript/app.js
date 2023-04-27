"use strict";
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const buttonElement = document.querySelector("button");
const arrNum = [];
const arrStr = [];
buttonElement.addEventListener("click", () => {
    const num1val = num1.value;
    const num2val = num2.value;
    const result = add(num1val, num2val);
    // console.log(result);
    console.log(arrNum);
    console.log(arrStr);
    printResult({ val: result });
});
function add(num1, num2) {
    if (typeof num1 == "number" && typeof (num2) === "number") {
        arrNum.push(num1 + num2);
        return num1 + num2;
    }
    else if (typeof num1 == "string" && typeof (num2) === "string") {
        arrStr.push(num1 + ' ' + num2);
        return num1 + ' ' + num2;
    }
    // console.log("string and number");
    arrNum.push(+num1 + +num2);
    return +num1 + +num2;
}
function printResult(resObj) {
    console.log(resObj.val);
}
// console.log(add("1","2"));
// console.log(add(3, 3));
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("It worked");
    }, 1000);
});
myPromise.then((result) => {
    console.log(result.split("w"));
});
