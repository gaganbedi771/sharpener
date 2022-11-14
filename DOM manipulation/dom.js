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
// let items=document.getElementsByClassName('list-group-item');
// console.log(items);
// items[2].textContent='Text Changed';
// items[2].style.backgroundColor='green';
// for(let i of items){
//     i.style.fontWeight='bold';
// }

// let li=document.getElementsByTagName('li');
// console.log(li);

// for(let i of li){
//     i.style.fontWeight='bold';
// }

// let item=document.querySelector('.list-group-item');
// item.style.color='red';


// let titles=document.querySelectorAll('.title');
//console.log(titles.textContent);
//titles[1].textContent='Changed'
// let thirdchild=document.querySelector('.list-group-item:nth-child(3)');
// thirdchild.textContent='';

// let secondchild=document.querySelector('.list-group-item:nth-child(2)');
// secondchild.style.color='green';

// let odd=document.querySelectorAll('.list-group-item:nth-child(odd)');

// for(let i of odd){
//     i.style.backgroundColor='green';
// }

//traversing the DOM
//parent node
// let listItems=document.querySelector('#items');
// console.log(listItems.parentNode);
// listItems.parentNode.style.backgroundColor='#f4f4f4';

//parent element
// let listItems=document.querySelector('#items');
// console.log(listItems.parentElement);
// listItems.parentElement.style.backgroundColor='#f4f4f4';
// let listItems=document.querySelector('#items');
// console.log(listItems.children);
// listItems.children[1].style.color='red';
// listItems.firstElementChild.style.color='pink'
// listItems.lastElementChild.textContent='pink';
// console.log(listItems.firstChild); //gives blank line 'TEXT';
// console.log(listItems.nextSibling); //gives blank line 'TEXT';
// console.log(listItems.nextElementSibling);
// console.log(listItems.previousElementSibling);

//create elements
let newDiv=document.createElement('div');
newDiv.className='Hello';
newDiv.id='Hello id';
newDiv.setAttribute('title','New Title of Div');
let textN=document.createTextNode('Hello World');
newDiv.appendChild(textN);
let container=document.querySelector('header .container');
let h1=document.querySelector('header h1');
container.insertBefore(newDiv, h1);
console.log(newDiv);

let newDiv2=document.createElement('div');
newDiv2.id='Hello2 id';

let liEle=document.createElement('li');
let textNode2=document.createTextNode('HelloWorld');
liEle.appendChild(textNode2);
console.log(liEle.textContent);

let parent=document.getElementById('main');
let before=document.getElementById('items');
parent.insertBefore(liEle,before);