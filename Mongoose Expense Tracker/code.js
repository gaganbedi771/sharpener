document.getElementById('my-form').addEventListener('submit', fun);

for(let k of Object.keys(localStorage)){
    let obj=JSON.parse(localStorage.getItem(k));
    let amt=obj.Amt;
    let des=obj.Des;
    let cat=obj.Cat;
    makeLiItems(amt,des,cat);
}

function makeLiItems(amt,des,cat){
    let li=document.createElement('li');
    li.className='list-group-item';
    li.id=des;
    li.appendChild(document.createTextNode(`${des} amount to RS. ${amt} under ${cat}  `));
    appendButtonToLi(li);
    document.getElementById('listitems').appendChild(li);
    document.getElementById('expense').value='';
    document.getElementById('description').value='';
    document.getElementById('selectcategory').value='';
}

function appendButtonToLi(li){
    let btnDel=document.createElement('button');
    let btnEdit=document.createElement('button');
    btnDel.className='btn btn-outline-secondary btn-sm btn-del';
    btnEdit.className='btn btn-outline-secondary btn-sm btn-edit';
    btnDel.appendChild(document.createTextNode('Delete'));
    btnEdit.appendChild(document.createTextNode('Edit'));
    li.append(btnEdit);
    li.append(btnDel);
}

function fun(e) {
    e.preventDefault();
    
    if(JSON.parse(localStorage.getItem(document.getElementById('description').value))!==null){
        alert('Description Already exists. You can edit the presaved expenses and submit');
        editItem(document.getElementById(document.getElementById('description').value));
    }
    else{
        addToLocalStorage();
        makeLiItems(document.getElementById('expense').value,document.getElementById('description').value,document.getElementById('selectcategory').value);
    }  
}

function addToLocalStorage() {
    localStorage.setItem(document.getElementById('description').value, JSON.stringify({
        Amt: document.getElementById('expense').value,
        Des: document.getElementById('description').value,
        Cat: document.getElementById('selectcategory').value
    }));
}

document.getElementById('listitems').addEventListener('click',alterItems);

function alterItems(e){
    e.preventDefault();
    let clickedNode=e.target.parentNode;
    console.log(clickedNode);
    console.log(clickedNode.id);
    if(e.target.classList.contains('btn-del')){
        deleteItem(clickedNode);
    }
    else if(e.target.classList.contains('btn-edit')){
        alert('Edit as desired and submit');
        editItem(clickedNode);
    }
}

function editItem(clickedNode){
    let obj=JSON.parse(localStorage.getItem(clickedNode.id));
    let currAmt=obj.Amt;
    let currDes=obj.Des;
    let currCat=obj.Cat;
    document.getElementById('expense').value=currAmt;
    document.getElementById('description').value=currDes;
    document.getElementById('selectcategory').value=currCat;
    deleteItem(clickedNode);
}

function deleteItem(clickedNode){
        localStorage.removeItem(clickedNode.id);
        clickedNode.remove();
}