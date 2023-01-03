//Save details to local storage

let form = document.getElementById('my-form');
form.addEventListener('submit', onSubmit);

function onSubmit(e) {
    e.preventDefault();
    let nameInput = document.getElementById('name');
    let emailInput = document.getElementById('email');
    // localStorage.setItem('name',nameInput.value);
    // localStorage.setItem('email',emailInput.value);

    //if email(which is unique) already present in db, remove the previous value from screen

    if (JSON.parse(localStorage.getItem(emailInput.value)) !== null) {
        let childToRemove = document.getElementById(emailInput.value);
        childToRemove.remove();
    }

    //save as objects
    //   localStorage.setItem(emailInput.value,JSON.stringify({
    //     name:nameInput.value,
    //     email:emailInput.value
    //   }));
    axios.post("https://crudcrud.com/api/e07f11eb4df74c589fae41633695886e/appointmentData", { name: nameInput.value, email: emailInput.value })
        .then(res => console.log(res))
        .catch(err => console.log(err))

    //get all registered users and add to li elements  
    let li = document.createElement('li');
    li.className = 'item';
    li.id = emailInput.value;
    li.appendChild(document.createTextNode(`${nameInput.value} ${emailInput.value}`));
    appendButtonToLi(li);
    let users = document.getElementById('users');
    users.appendChild(li);
    nameInput.value = '';
    emailInput.value = '';
}

//fetch from storage and display
window.addEventListener('DOMContentLoaded', () => {
    axios.get("https://crudcrud.com/api/e07f11eb4df74c589fae41633695886e/appointmentData")
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                let n = res.data[i].name;
                let e = res.data[i].email;
                let li = document.createElement('li');
                li.className = 'item';
                li.id = e;
                li.appendChild(document.createTextNode(`${n} ${e} `));
                appendButtonToLi(li);
                let users = document.getElementById('users');
                users.appendChild(li);
            }
        })
        .catch(err => console.log(err))
})
// let keys = Object.keys(localStorage);
// for (let k of keys) {

//     let n = JSON.parse(localStorage.getItem(k)).name;
//     let e = JSON.parse(localStorage.getItem(k)).email;
//     let li = document.createElement('li');
//     li.className = 'item';
//     li.id = e;
//     li.appendChild(document.createTextNode(`${n} ${e} `));
//     appendButtonToLi(li);
//     let users = document.getElementById('users');
//     users.appendChild(li);
// }

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
    if (e.target.classList.contains('btn-delete')) {
        console.log('delete');

        localStorage.removeItem(editId);
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