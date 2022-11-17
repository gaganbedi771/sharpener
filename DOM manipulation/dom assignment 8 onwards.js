//let form= document.getElementById('addForm');
let form=document.querySelector('#addForm');
let itemList=document.querySelector('#items');

//form submit event
form.addEventListener('submit',addItem);

function addItem(e){
    e.preventDefault();
    //get input value
    let newItem=document.getElementById('item');
    let newItem2=document.getElementById('item2'); //text box added later
    
    //create li element
    let newli=document.createElement('li');
    newli.className='list-group-item';

    //create textnode and append in li
    let lineBreak=document.createElement('br');
    newli.appendChild(document.createTextNode(newItem.value+' '));
    newli.append(lineBreak);
    newli.append(newItem2.value+' ');
    newItem.value='';
    newItem2.value='';

    //create delete button
    let deletebtn=document.createElement('button');
    
    //add classes to del button
    deletebtn.className='btn btn-danger btn-sm float-right delete';
    deletebtn.appendChild(document.createTextNode('X'));
    //append button to li
    newli.append(deletebtn);

    //append newli to items
    itemList.appendChild(newli);

    //add edit button
    //create element button
    let editbtn=document.createElement('button');
    editbtn.appendChild(document.createTextNode('Edit'));
    newli.append(editbtn);
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
    i.append(document.createTextNode(''));
    let editbtn=document.createElement('button');
    editbtn.appendChild(document.createTextNode('Edit'));
    i.append(editbtn);
}

//search items
let filter=document.getElementById('filter');
//create event
filter.addEventListener('keyup',filteritems);

function filteritems(e){
    e.preventDefault();

    //convert in input to lowercase;
    let text=e.target.value.toLowerCase();

    let liItems=document.querySelectorAll('.list-group-item');

    //saving all li elements text in array 
    let arrayItems=[];
    let arrayDes=[];
    for(let i of liItems){
        arrayItems.push(i.firstChild.textContent.toLowerCase()); 
        arrayDes.push(i.childNodes[2].textContent.toLowerCase());
    }
    console.log(arrayDes);
    
    //check if input is present in each element of array
    for(let i in arrayItems){
        if(arrayItems[i].indexOf(text)!=-1 || arrayDes[i].indexOf(text)!=-1){
            liItems[i].style.display='block';
        }
        else{
            liItems[i].style.display='none';
        }
   }
}

//adding new input text box 
let formid=document.getElementById('addForm');

//create element with className,id and attributes
let newBox=document.createElement('input');
newBox.setAttribute('type','text');
newBox.className='form-control mr-2';
newBox.id='item2';

//inserting box
formid.insertBefore(newBox,formid.children[1]);

//appending value to li in line no. 12 onwards.
