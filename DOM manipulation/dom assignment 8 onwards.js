//let form= document.getElementById('addForm');
let form=document.querySelector('#addForm');
let itemList=document.querySelector('#items');

//form submit event
form.addEventListener('submit',addItem);

function addItem(e){
    e.preventDefault();
    //get input value
    let newItem=document.getElementById('item');
    
    //create li element
    let newli=document.createElement('li');
    newli.className='list-group-item';

    //create textnode and append in li
    newli.appendChild(document.createTextNode(newItem.value + ' '));
    
    //create delete button
    let deletebtn=document.createElement('button');
    
    //add classes to del button
    deletebtn.className='btn btn-danger btn-sm float-right delete'
    deletebtn.appendChild(document.createTextNode('X'));
    //append button to li
    newli.appendChild(deletebtn);

    //append newli to items
    itemList.appendChild(newli);

    //add edit button
    //create element button
    let editbtn=document.createElement('button');
    editbtn.appendChild(document.createTextNode('Edit'));
    newli.appendChild(editbtn);
}

//to delete listitem
itemList.addEventListener('click', removeItem);
function removeItem(e){
    e.preventDefault();
    if(e.target.classList.contains('delete')){
        if(confirm('Sure?')){
            itemList.removeChild(e.target.parentElement);
        }
    }
}
 
//add edit button to previous items

let litems=document.getElementsByClassName('list-group-item');

for(let i of litems){
    let editbtn=document.createElement('button');
    editbtn.appendChild(document.createTextNode('Edit'));
    i.appendChild(editbtn);
}