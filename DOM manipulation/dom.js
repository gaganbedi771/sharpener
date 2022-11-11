//Examine the document obj

// console.dir(document.URL)
// console.log(document.URL)
// console.log(document.title)
// document.title='Dom practice'
//console.log(document.getElementById("header1").innerText)
//document.getElementById("header1").innerText='Abcd';
//
//console.log(document.getElementById("header1").textContent)
//document.getElementById("header1").textContent='Abcd';
//console.log(document.getElementById("header1").textContent)
//document.getElementById('header1').style.borderBottom='solid 3px black';

//document.getElementById('header2').style.color='green'
//document.getElementById('header2').style.fontWeight='bold';
let items=document.getElementsByClassName('list-group-item');
console.log(items);
items[2].textContent='Text Changed';
items[2].style.backgroundColor='green';
for(let i of items){
    i.style.fontWeight='bold';
}
