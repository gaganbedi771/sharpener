//Save details to local storage

let form = document.getElementById('my-form');
form.addEventListener('submit', onSubmit);
let crudLink='https://crudcrud.com/api/63896662c41e447ba267b367901ffab9/appointmentData';
function onSubmit(e) {
    e.preventDefault();
    let nameInput = document.getElementById('name');
    let emailInput = document.getElementById('email');

    axios.post(crudLink, { name: nameInput.value, email: emailInput.value })
        .then((res) => {
            console.log(res);
            axios.get(crudLink)
                .then((res1) => {
                    let id = res1.data[res1.data.length - 1]._id;
                    console.log(id)
                    //get all registered users and add to li elements    
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
    console.log(editId)
    if (e.target.classList.contains('btn-delete')) {
        console.log('delete', editId);
        let link = crudLink +'/' + editId;
        axios.delete(link);
        e.target.parentNode.remove();

    }
    else if (e.target.classList.contains('btn-edit')) {
        console.log('edit pressed');

        document.getElementById('name').value = JSON.parse(localStorage.getItem(editId)).name;
        document.getElementById('email').value = JSON.parse(localStorage.getItem(editId)).email;
        localStorage.removeItem(editId);
        e.target.parentNode.remove();
    }
}