//use of this
//inside global scope/window obj.
this.table='windows table';
console.log(window.table);
console.log(table);
console.log(this.table);

this.garage={
    table:'garage table'
}
console.log(garage.table);

//inside an object
let johnsRoom={ 
    table:'johns table'
}
console.log(johnsRoom.table);

//inside a method
johnsRoom={ 
    table:'johns table',
    cleanTable(soap){
        console.log(`Cleaning ${this.table} with ${soap}`)
    }
}
johnsRoom.cleanTable('detol');

//inside a function

function cleanTable(soap){
    console.log(`Cleaning ${this.table} with ${soap}`);
}
cleanTable.call(this,'detol');
cleanTable.call(this.garage,'detol');
cleanTable.call(johnsRoom,'dettol');

//inside inner function
function cleanTable2(soap){
    console.log(`Cleaning ${this.table} with ${soap}`);
    function innerFunct(_soap){
        console.log(`Cleaning ${this.table} with ${_soap}`);
    }
    innerFunct.call(this,soap);
    
}
cleanTable2.call(this.garage,'dettol dettol ho');

//inside constructor
let newRoom=function(name){
    this.table=`${name}'s table`;
}
let johnSister=new newRoom('jill');
cleanTable.call(johnSister,'dettolll');

//class of students
class Student{
    static count=0;
    constructor(name,age,phone,marks){
        this.name=name
        this.age=age;
        this.phone=phone;
        this.marks=marks;
        Student.count+=1;
    }

    isEligibel(){
        return ()=>{
            return (this.age>22 && this.marks>40) ? (`${this.name} is Eligible`) :(`${this.name} is NotEligible`);
        } ;
    }
}

const st1=new Student('Ajay',23,1234,53);
const st2=new Student('Bjay',25,1224,43);
const st3=new Student('Cjay',23,1244,41);
const st4=new Student('Djay',23,2234,39);
const st5=new Student('Ejay',21,1134,100);

console.log('Total Students are ',Student.count);
console.log(st1.isEligibel()());
console.log(st2.isEligibel()());
console.log(st3.isEligibel()());
console.log(st4.isEligibel()());
console.log(st5.isEligibel()());

//Fat function
"use strict"
let getA=function(a){
    return a;
}

getA= a=>a;
let square=(a)=>{return a*a};
console.log(square(5));

// let x=function(){
//     this.val=1;
//     setTimeout(function(){
//         this.val++;
//         console.log(this.val);  //return undefined.. checks only in the settiemout function if val is declared.
//     },1)
// }
// x();


let y=function(){
    this.val=1;
    setTimeout(()=>{
        this.val++;
        console.log(this.val);  //return 2.. fat arrow uses its parents this. this is automatically binded with settimeout when arror func is used
    },0)
}
y();

let z=function(){ //by default it accepts n arguments of no param is provided
    console.log(arguments[0],'arguments'); //this is how to accept arguments 
}
z(1,2,3);

let xy=(...n)=>{ //this is how to define n parameters in arrow
    console.log(n[2],'arguments of arrow'); 
}
xy(1,2,3);

