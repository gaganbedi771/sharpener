let form = document.getElementById('adminform');
let link = 'https://crudcrud.com/api/4e71eca1fb394f1dbf6ec364cb3f73bb/adminData';
form.addEventListener('submit', onSubmit);

window.addEventListener('DOMContentLoaded', async () => {
    try{
        let res=await axios.get(link);
        for (let i = 0; i < res.data.length; i++) {
            let obj = res.data[i];
            let ele = makeliElement(obj._id, obj.product, obj.price, obj.category);
            appendToSection(obj.category, ele);
        }
    }
    catch(err){
        console.log('Error caught'+err);
    }
})

function onSubmit(e) {
    e.preventDefault();
    let product = document.getElementById('product').value;
    let price = document.getElementById('sp').value;
    let category = document.getElementById('cat').value;
    postOnSubmit(link,product,price,category);
}

async function postOnSubmit(link,product,price,category){

    try{
        await axios.post(link,{product: product, price: price, category: category });
        let res=await axios.get(link);
        let lastIndex = res.data.length - 1;
        let lastEleId= res.data[lastIndex]._id;
        let ele = makeliElement(lastEleId, product, price, category);
        appendToSection(category, ele);
        document.getElementById('product').value = '';
        document.getElementById('sp').value = '';
        document.getElementById('cat').value = '';
    }
    catch(err){
        console.log('Error caught'+err);
    }
   
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
document.getElementById('skincareitems').addEventListener('click', Del);
document.getElementById('electronicitems').addEventListener('click', Del);
document.getElementById('fooditems').addEventListener('click', Del);
document.getElementById('miscitems').addEventListener('click', Del);

async function Del(e){
    if (e.target.className == 'btn-del') {
        let id = e.target.parentNode.id
        let delLink = link + '/' + id;
        try{
            await axios.delete(delLink);
            e.target.parentNode.remove();
        }
        catch(err){
            console.log(err);
        }
    }
}