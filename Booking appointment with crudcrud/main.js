//using crud crud


let form = document.getElementById('my-form');
form.addEventListener('submit', onSubmit);
let crudLink='https://crudcrud.com/api/70f89c5215cc4d968931eb011548eaa4/data'
let idForUpdate;
let ParentNode;
function onSubmit(e) {
    e.preventDefault();
    let nameInput = document.getElementById('name');
    let emailInput = document.getElementById('email');
    if(document.getElementById('submitbtn').value=='Update'){
        axios.put(crudLink+'/'+idForUpdate,{name : nameInput.value, email: emailInput.value})
        .then((res)=>{
            document.getElementById('h1').innerHTML='Add User'; 
            document.getElementById('submitbtn').value='Submit'; 
            ParentNode.remove();
            let li = document.createElement('li');
            li.className = 'item';
            li.id = idForUpdate;
            li.appendChild(document.createTextNode(`${nameInput.value} ${emailInput.value}`));
            appendButtonToLi(li);
            let users = document.getElementById('users');
            users.appendChild(li);
            nameInput.value = '';
            emailInput.value = '';
            console.log('updated')
        })
    }
    else{
    axios.post(crudLink, { name: nameInput.value, email: emailInput.value })
        .then((res) => {
            axios.get(crudLink)
                .then((res1) => {
                    let id = res1.data[res1.data.length - 1]._id;   
                    let li = document.createElement('li');
                    li.className = 'item';
                    li.id = id;
                    li.appendChild(document.createTextNode(`${nameInput.value} ${emailInput.value}`));
                    appendButtonToLi(li);
                    let users = document.getElementById('users');
                    users.appendChild(li);
                    nameInput.value = '';
                    emailInput.value = '';
                })
        })
        .catch(err => console.log(err))
    }
}

//fetch from storage and display
window.addEventListener('DOMContentLoaded', () => {
    axios.get(crudLink)
        .then((res) => { 
            for (let i = 0; i < res.data.length; i++) {
                let n = res.data[i].name;
                let e = res.data[i].email;
                let li = document.createElement('li');
                li.className = 'item';
                li.id = res.data[i]._id;
                li.appendChild(document.createTextNode(`${n} ${e} `));
                appendButtonToLi(li);
                let users = document.getElementById('users');
                users.appendChild(li);
            }
        })
        .catch(err => console.log(err))
})

function appendButtonToLi(li) {
    let btnDel = document.createElement('button');
    let btnEdit = document.createElement('button');
    btnDel.className = 'btn-delete';
    btnEdit.className = 'btn-edit';
    btnEdit.appendChild(document.createTextNode('Edit'));
    btnDel.appendChild(document.createTextNode('Delete'));
    li.append(btnEdit);
    li.append(btnDel);
}

let users = document.getElementById('users');
users.addEventListener('click', alterItem);

function alterItem(e) {
    e.preventDefault();
    let editId = e.target.parentNode.id;
    let link = crudLink +'/' + editId;
    if (e.target.classList.contains('btn-delete')) {
        console.log('delete', editId);
        axios.delete(link);
        e.target.parentNode.remove();

    }
    else if (e.target.classList.contains('btn-edit')) {
        axios.get(link)
        .then((res)=>{
            document.getElementById('name').value=res.data.name;
            document.getElementById('email').value=res.data.email;
            ParentNode=e.target.parentNode;
            idForUpdate= e.target.parentNode.id;
            document.getElementById('h1').innerHTML='Update User'; 
            document.getElementById('submitbtn').value='Update'; 
            console.log(document.getElementById('h1'))
        })
    }
}