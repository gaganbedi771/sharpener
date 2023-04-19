
const token = localStorage.getItem("token");

function premiumFeatures() {
  document.getElementById("premiumButton").remove();
  document.getElementById("ifPremium").innerHTML = "You are a premium user ";
  const ldrBoard = document.createElement("button");
  ldrBoard.className = "btn btn-success float-right";
  ldrBoard.id = "ldrBrdBtn";
  ldrBoard.appendChild(document.createTextNode("LeaderBoard"));
  document.getElementById("ifPremium").append(ldrBoard);
  ldrBoard.addEventListener("click", showLdrBrd);

  document.getElementById("downloadexpense").disabled = false
}

window.addEventListener("DOMContentLoaded", async () => {

  const page = 1;
  const entries = localStorage.getItem("entries")||2;
  document.getElementById("numOfEntries").value=entries;
  try {

    // const allData=await axios.get(`http://localhost:1000/getAll?page=${page}&entries=${entries}`, { headers: { "Authorization": token } })
    const allData = await getAllSelected(page, entries)
    // console.log(allData)
    const { expenses, IsPremium, ...pageInfo } = allData.data;
    // console.log(expenses,IsPremium,pageInfo)

    if (IsPremium == "yes") {
      premiumFeatures();
    }

    expenses.forEach((expense) => {
      appendDataToPage(expense);
    })
    // console.log(allData)
    pagination(pageInfo);
  }

  catch (err) {
    console.log(err);
  }

})

function pagination({ currentPage, hasPreviousPage, previousPage, hasNextPage, nextPage, lastPage }) {

  // console.log(currentPage,previousPage,nextPage,lastPage);
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = ""

  if (hasPreviousPage) {
    const btnPre = document.createElement("button");
    btnPre.innerHTML = previousPage;
    btnPre.addEventListener("click", () => getPaginated(previousPage));
    pagination.appendChild(btnPre);
  }
  const btnCurr = document.createElement('button');
  btnCurr.innerHTML = `<h5>${currentPage}</h5>`;
  btnCurr.addEventListener('click', () => getPaginated(currentPage));
  pagination.appendChild(btnCurr);

  if (hasNextPage && lastPage != nextPage) {
    const btnNxt = document.createElement("button");
    btnNxt.innerHTML = nextPage;
    btnNxt.addEventListener("click", () => getPaginated(nextPage));
    pagination.appendChild(btnNxt);
  }

  if (lastPage != currentPage) {
    const btnLast = document.createElement("button");
    btnLast.innerHTML = "...lastPage";
    btnLast.addEventListener("click", () => getPaginated(lastPage));
    pagination.appendChild(btnLast);
  }
}

function getPaginated(page) {
  const entries = document.getElementById("numOfEntries").value;
  document.getElementById("listitems").innerHTML = "";
  getAndSet(page, entries);
}

function getAllSelected(page, entries) {
  return new Promise((resolve, reject) => {
    resolve(axios.get(`http://localhost:1000/getAll?page=${page}&entries=${entries}`, { headers: { "Authorization": token } }))
  }
  )
}

document.getElementById("my-form").addEventListener("submit", onSubmit);
document.getElementById("listitems").addEventListener("click", onClick);
document.getElementById("premiumButton").addEventListener("click", buyPre);
document.getElementById("numOfEntries").addEventListener("change", onEntriesChange);

async function getAndSet(page, entries) {
  try {
    const allData = await getAllSelected(page, entries);
    const { expenses, IsPremium, ...pageInfo } = allData.data;
    expenses.forEach((expense) => {
      appendDataToPage(expense);
    })
    pagination(pageInfo);
  }
  catch (err) {
    console.log(err);
  }
}

function onEntriesChange(e) {
  // console.log(e.target.value)
  const entries = e.target.value;
  localStorage.setItem("entries",entries);
  const page = 1;
  document.getElementById("listitems").innerHTML = "";
  getAndSet(page, entries)
  // try {
  //   const allData = await getAllSelected(page, entries);
  //   const { expenses,IsPremium, ...pageInfo } = allData.data;
  //   expenses.forEach((expense) => {
  //     appendDataToPage(expense);
  //   })
  //   pagination(pageInfo);
  // }
  // catch (err) {
  //   console.log(err);
  // }


}


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
        console.log(result)
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

function showLdrBrd() {

  const p = document.createElement("h3");
  p.className = "text-center px-5 py-0 badge-secondary"
  p.appendChild(document.createTextNode("Leaderboard"))
  const LeaderBoard = document.getElementById("LeaderBoard");
  const boardItems = document.getElementById("boardItems");
  LeaderBoard.insertBefore(p, boardItems);
  axios.get("http://localhost:1000/purchasePremium/showLeaderBoard", { headers: { "Authorization": token } })
    .then(result => {
      //  console.log(result.data)
      result.data.forEach(data => {
        appendToLeaderBoard(data);
      })
    })
}

function appendToLeaderBoard(obj) {
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(`${obj.name} has spent ${obj.totalExpense}`));
  document.getElementById("boardItems").appendChild(li);

}

function download() {
  axios.get("http://localhost:1000/download", { headers: { Authorization: token } })
    .then(result => {
      console.log(result.data);
      let list = result.data.list;

      const p = document.createElement("h3");
      p.className = "text-center px-5 py-0 badge-secondary"
      p.appendChild(document.createTextNode("Previous Generated Files"))
      const downloadedFiles = document.getElementById("downloadedFiles");
      const filesList = document.getElementById("filesList");
      downloadedFiles.insertBefore(p, filesList);

      list.forEach(item => {
        console.log(item)
        const li = document.createElement("li");
        li.innerHTML = `<a href=${item.link}>Created at ${item.date}</a>`
        document.getElementById("filesList").appendChild(li);
      })
      const a = document.createElement("a");
      a.href = result.data.fileUrl;
      a.download = "myexpense.csv";
      a.click();
    })
    .catch(err => {
      console.log(err);
      throw new Error(err);
    })
}