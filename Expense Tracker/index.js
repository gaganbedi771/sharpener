
const token = localStorage.getItem("token");

function premiumFeatures() {
  document.getElementById("premiumButton").remove();
  document.getElementById("ifPremium").innerHTML = "You are a premium user ";
  const ldrBoard = document.createElement("button");
  ldrBoard.className = "btn btn-success float-right";
  ldrBoard.id="ldrBrdBtn";
  ldrBoard.appendChild(document.createTextNode("LeaderBoard"));
  document.getElementById("ifPremium").append(ldrBoard);
  ldrBoard.addEventListener("click",showLdrBrd);
}

window.addEventListener("DOMContentLoaded", () => {

  axios.get("http://localhost:1000/getAll", { headers: { "Authorization": token } })
    .then((allData) => {
      allData.data.forEach((data) => {
        appendDataToPage(data);
      })
    })
    .catch(err => {
      console.log(err);
    })

  axios.get("http://localhost:1000/checkPremium", { headers: { "Authorization": token } })
    .then(result => {

      if (result.data.message == "yes") {

        premiumFeatures();

      }
    })
    .catch(err => console.log(err))


})

document.getElementById("my-form").addEventListener("submit", onSubmit);
document.getElementById("listitems").addEventListener("click", onClick);
document.getElementById("premiumButton").addEventListener("click", buyPre);


function onClick(e) {
  e.preventDefault();
  const id = e.target.parentNode.id;

  if (e.target.classList.contains("btn-delete")) {
    if (document.getElementById("submitbtn").value == "Update") {
      alert("Update Details before deleting any expense");
      return
    }

    axios.delete(`http://localhost:1000/deleteExpense/${id}`, { headers: { "Authorization": token } })
      .then(result => {

        e.target.parentNode.remove();
      })
      .catch(err => {
        console.log(err);
      })
  }

  else if (e.target.classList.contains("btn-edit")) {

    axios.get(`http://localhost:1000/getDetail/${id}`, { headers: { "Authorization": token } })
      .then(result => {
        document.getElementById("userId").value = result.data.id;
        document.getElementById("amount").value = result.data.amount;
        document.getElementById("description").value = result.data.description;
        document.getElementById("category").value = result.data.category;
        document.getElementById("submitbtn").value = "Update";
      })
      .catch(err => console.log(err));
  }
}

function onSubmit(e) {
  e.preventDefault();

  const category = document.getElementById("category").value;
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;

  if (document.getElementById("submitbtn").value == "Update") {

    const id = document.getElementById("userId").value;
    axios.patch(`http://localhost:1000/updateDetails/${id}`, {
      category: category,
      description: description,
      amount: amount
    }, { headers: { "Authorization": token } })
      .then(result => {
        document.getElementById(id).innerHTML = `Rs  ${amount} spent for ${description} [${category}] <button class="btn-edit">Edit</button><button class="btn-delete">Delete</button>`
        document.getElementById('userId').value = "";
        document.getElementById('submitbtn').value = "Submit";
      })
      .catch(err => {
        console.log(err);
      })
  }

  else {
    axios.post("http://localhost:1000/add-expense", {
      category: category,
      description: description,
      amount: amount
    }, { headers: { "Authorization": token } })
      .then((result) => {
        appendDataToPage(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  document.getElementById("category").value = "Miscellaneous";
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";


}

function appendDataToPage(data) {
  const id = data.id;
  const category = data.category;
  const expense = data.amount;
  const description = data.description;

  let li = document.createElement('li');
  li.id = id;
  li.appendChild(document.createTextNode(`Rs  ${expense} spent for ${description} [${category}]`));

  let btnDel = document.createElement('button');
  let btnEdit = document.createElement('button');
  btnDel.className = 'btn-delete';
  btnEdit.className = 'btn-edit';
  btnEdit.appendChild(document.createTextNode('Edit'));
  btnDel.appendChild(document.createTextNode('Delete'));
  li.append(btnEdit);
  li.append(btnDel);

  document.getElementById("listitems").appendChild(li);
}

function buyPre(e) {
  axios.get("http://localhost:1000/purchasePremium", { headers: { "Authorization": token } })
    .then((response) => {

      var options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": function (result) {
          axios.patch("http://localhost:1000/purchasePremium/success", {
            order_id: options.order_id,
            payment_id: result.razorpay_payment_id
          }, { headers: { "Authorization": token } })
            .then((result) => {
              // console.log(result);
              alert("You are a premium user now")
              premiumFeatures();
            })
            .catch(err => {
              console.log(err)
            })
        }
      }

      const rzpFrontend = new Razorpay(options);
      rzpFrontend.open();
      e.preventDefault();

      rzpFrontend.on("payment.failed", function (response) {

        axios.patch("http://localhost:1000/purchasePremium/failure", {
          order_id: options.order_id,
        }, { headers: { "Authorization": token } })
          .then((result) => {
            alert("Payment Failed Try again")
          })
          .catch(err => {
            console.log(err)
          })
      })
    })
}

function showLdrBrd(){
    
  const p=document.createElement("h3");
  p.className="text-center px-5 py-0 badge-secondary"
  p.appendChild(document.createTextNode("Leaderboard"))
  const LeaderBoard=document.getElementById("LeaderBoard");
  const boardItems=document.getElementById("boardItems");
  LeaderBoard.insertBefore(p,boardItems);
  axios.get("http://localhost:1000/purchasePremium/showLeaderBoard",{headers:{"Authorization":token}})
  .then(result=>{
   console.log(result.data)
    result.data.forEach(data=>{
      appendToLeaderBoard(data);
    })
  })
}

function appendToLeaderBoard(obj){
  const li=document.createElement("li");
  li.appendChild(document.createTextNode(`${obj.name} has spent ${obj.total}`));
  document.getElementById("boardItems").appendChild(li);

}