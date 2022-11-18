//My Events
// const btn = document.querySelector('.btn');
// btn.addEventListener('click', (e)=>{
//   e.preventDefault();
//   console.log('Click');
// })
// btn.addEventListener('mouseover', (e)=>{
//   console.log('MouseHovering')
// })
// btn.addEventListener('mouseout',(e)=>{
//   console.log('Mouseout')
// })

// const myForm = document.querySelector('#my-form');
// const name = document.querySelector('#name');
// const email = document.querySelector('#email');
// myForm.addEventListener('submit', onSubmit);

// function onSubmit(e){
//   e.preventDefault();
//   console.log(name.val);
// }
// EVENTS

// Mouse Event
// btn.addEventListener('click', e => {
//   e.preventDefault();
//   console.log(e.target.className);
//   document.getElementById('my-form').style.background = '#ccc';
//   document.querySelector('body').classList.add('bg-dark');
//   ul.lastElementChild.innerHTML = '<h1>Changed</h1>';
// });

// Keyboard Event
// const nameInput = document.querySelector('#name');
// nameInput.addEventListener('input', e => {
//   document.querySelector('.container').append(nameInput.value);
// });


// USER FORM SCRIPT

// Put DOM elements into variables
// const myForm = document.querySelector('#my-form');
// const nameInput = document.querySelector('#name');
// const emailInput = document.querySelector('#email');
// const msg = document.querySelector('.msg');
// const userList = document.querySelector('#users');

// Listen for form submit
// myForm.addEventListener('submit', onSubmit);

// function onSubmit(e) {
//   e.preventDefault();
  
//   if(nameInput.value === '' || emailInput.value === '') {
//     // alert('Please enter all fields');
//     msg.classList.add('error');
//     msg.innerHTML = 'Please enter all fields';

//     // Remove error after 3 seconds
//     setTimeout(() => msg.remove(), 3000);
//   } else {
//     // Create new list item with user
//     const li = document.createElement('li');

//     // Add text node with input values
//     li.appendChild(document.createTextNode(`${nameInput.value}: ${emailInput.value}`));

//     // Add HTML
//     // li.innerHTML = `<strong>${nameInput.value}</strong>e: ${emailInput.value}`;

//     // Append to ul
//     userList.appendChild(li);

//     // Clear fields
//     nameInput.value = '';
//     emailInput.value = '';
//   }
// }

//Save details to local storage

let form=document.getElementById('my-form');
form.addEventListener('submit',onSubmit);

function onSubmit(e){
  e.preventDefault();
  let nameInput=document.getElementById('name');
  let emailInput=document.getElementById('email');
  // localStorage.setItem('name',nameInput.value);
  // localStorage.setItem('email',emailInput.value);
  
  //if email(which is unique) already present in db, remove the previous value from screen
  
  if(JSON.parse(localStorage.getItem(emailInput.value))!== null){
    let childToRemove=document.getElementById(emailInput.value);
    childToRemove.remove();
  }

  //save as objects
  localStorage.setItem(emailInput.value,JSON.stringify({
    name:nameInput.value,
    email:emailInput.value
  }));
 
  //get all registered users and add to li elements  
  let li=document.createElement('li');
  li.className='item';
  li.id=emailInput.value;
  li.appendChild(document.createTextNode(`${nameInput.value} ${emailInput.value}`));
  appendButtonToLi(li);
  let users=document.getElementById('users');
  users.appendChild(li);
  nameInput.value='';
  emailInput.value='';
}
let keys=Object.keys(localStorage);
for(let k of keys){
  
  let n=JSON.parse(localStorage.getItem(k)).name;
  let e=JSON.parse(localStorage.getItem(k)).email;
  let li=document.createElement('li');
  li.className='item';
  li.id=e;
  li.appendChild(document.createTextNode(`${n} ${e} `));
  appendButtonToLi(li);
  let users=document.getElementById('users');
  users.appendChild(li);
}

function appendButtonToLi(li){
  let btnDel=document.createElement('button');
  let btnEdit=document.createElement('button');
  btnDel.className='btn-delete';
  btnEdit.className='btn-edit';
  btnEdit.appendChild(document.createTextNode('Edit'));
  btnDel.appendChild(document.createTextNode('Delete'));
  li.append(btnEdit);
  li.append(btnDel);
}

let users=document.getElementById('users');
users.addEventListener('click',alterItem);

function alterItem(e){
  e.preventDefault();
  let editId=e.target.parentNode.id;
  if(e.target.classList.contains('btn-delete') ){
    console.log('delete');

    localStorage.removeItem(editId);
    e.target.parentNode.remove();

  }
  else if(e.target.classList.contains('btn-edit')){
    console.log('edit pressed');
    
    document.getElementById('name').value=JSON.parse(localStorage.getItem(editId)).name;
    document.getElementById('email').value=JSON.parse(localStorage.getItem(editId)).email;
    localStorage.removeItem(editId);
    e.target.parentNode.remove();
  }
}