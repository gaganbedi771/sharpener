let form = document.getElementById('adminform');
let link = 'https://crudcrud.com/api/5612c4d8c5d64242b35d2e787667829c/adminData';
form.addEventListener('submit', onSubmit);
let skincarebtn;

window.addEventListener('DOMContentLoaded', () => {
    axios.get(link)
        .then(res => {
            for (let i = 0; i < res.data.length; i++) {
                let obj = res.data[i];
                let ele = makeliElement(obj._id, obj.product, obj.price, obj.category);
                appendToSection(obj.category, ele);
                skincarebtn = document.getElementById('skincareitems')
            }
        })
        .catch(res => console.log(res));
})

function onSubmit(e) {
    e.preventDefault();
    let product = document.getElementById('product').value;
    let price = document.getElementById('sp').value;
    let category = document.getElementById('cat').value;
    axios.post(link, { product: product, price: price, category: category })
        .then()
        .catch(res => console.log(res));

    axios.get(link)
        .then((res) => {
            let lastIndex = res.data.length - 1;
            let lastEleId= res.data[lastIndex]._id;
            let ele = makeliElement(lastEleId, product, price, category);
            appendToSection(category, ele);
            document.getElementById('product').value = '';
            document.getElementById('sp').value = '';
            document.getElementById('cat').value = '';
            skincarebtn = document.getElementById('skincareitems')

        })

}

function makeliElement(lastEleId, product, price, category) {
    let li = document.createElement('li');
    li.id = lastEleId;
    li.appendChild(document.createTextNode(`${product} is selling at ${price} under ${category} catergory`));
    li.append(delButton());
    return li;
}

function delButton() {
    let btnDel = document.createElement('button');
    btnDel.className = 'btn-del';
    btnDel.appendChild(document.createTextNode('Delete'));
    return btnDel;
}

function appendToSection(category, ele) {
    switch (category) {
        case 'misc':
            document.getElementById('miscitems').appendChild(ele);
            break;
        case "food":
            document.getElementById('fooditems').appendChild(ele);
            break;
        case "skincare":
            document.getElementById('skincareitems').appendChild(ele);
            skincarebtn = document.getElementById('skincareitems')
            break;
        case "electronics":
            document.getElementById('electronicitems').appendChild(ele);
            break;
    }
}

//del button functionality
skincarebtn = document.getElementById('skincareitems')
let electronicsbtn = document.getElementById('electronicitems')
let foodbtn = document.getElementById('fooditems')
let miscbtn = document.getElementById('miscitems')

skincarebtn.addEventListener('click', deleteSkinCare);
electronicsbtn.addEventListener('click', deleteElectronics);
foodbtn.addEventListener('click', deleteFood);
miscbtn.addEventListener('click', deleteMisc);

function deleteSkinCare(e) {
    e.preventDefault();
    Del(e);
}
function deleteElectronics(e) {
    e.preventDefault();
    Del(e);
}
function deleteFood(e) {
    e.preventDefault();
    Del(e);
}
function deleteMisc(e) {
    e.preventDefault();
    Del(e);
    
}

function Del(e){
    if (e.target.className == 'btn-del') {
        let id = e.target.parentNode.id
        let delLink = link + '/' + id;
        axios.delete(delLink)
            .then(() => {
                e.target.parentNode.remove();
            })
            .catch(res => console.log(res));
    }
}
//document.addEventListener('click',delBtn);

// function delBtn(e){
//     e.preventDefault();
//     if(e.target.classList.contains('btn-delete')){
//         console.log(e.target.parentNode.id);
//     }
// }