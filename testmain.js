// console.log(document.querySelector('#header-title').textContent); //doesnot care about span/style.
// console.log(document.querySelector('#header-title').innerText); //takes care about cs
// let items = document.querySelector('#items');
 //let items2 = document.querySelector('.list-group-item');
// console.log(items.textContent);
 //console.log(items2.childNodes);


//  let text=document.createTextNode('HelloWorld');
//  let newli=document.createElement('li');
//  newli.appendChild(text);
//  newli.className='list-group-item';

// // let getitems=document.querySelector('#items');
// // // console.log(getitems);
// // getitems.appendChild(newli);

// let parentnode=document.getElementById('items');
// // parentnode.appendChild(newli);
// parentnode.innerHTML='<li class="list-group-item">HelloWorld</li>'+parentnode.innerHTML;

let p1=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log(new Date().getTime(),'p1')
        resolve();
    },5000);
})

let p2=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log(new Date().getTime(),'p2')
        resolve();
    },5000);
})
let p3=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log(new Date().getTime(),'p3')
        resolve();
    },5000);
})
let p4=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log(new Date().getTime(),'p4')
        resolve();
    },5000);
})
let p5=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        console.log(new Date().getTime(),'p5')
        resolve();
    },5000);
})

setTimeout(() => {
    console.log(new Date().getTime());
}, 5000);

setTimeout(() => {
    console.log(new Date().getTime());
}, 5000);

setTimeout(() => {
    console.log(new Date().getTime()); 
}, 5000);

setTimeout(() => {
    console.log(new Date().getTime());
}, 5000);

setTimeout(() => {
    console.log(new Date().getTime());
}, 5000);
