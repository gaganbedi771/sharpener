let multiply=function(x,y){
    return x*y;
}
console.log(multiply(5,2));

//currying by binding
let multiplyByTwo=multiply.bind(this,2);
console.log(multiplyByTwo(5));

let multiplyByThree=multiply.bind(this,3);
console.log(multiplyByThree(5));

//currying by closure
function multiply2(x){
    return function (y){
        return x*y;
    }
}

let multiplyBy2=multiply2(2);
console.log(multiplyBy2(3));

let multiplyBy3=multiply2(3);
console.log(multiplyBy3(7));