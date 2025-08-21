let form = document.getElementById("my-form");

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/expense")
    .then((allData) => {
      if (allData.data.length) {
        allData.data.forEach((data) => {
          appendDataToPage(data);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

document.getElementById("my-form").addEventListener("submit", onSubmit);
document.getElementById("users").addEventListener("click", alterDetail);

function onSubmit(e) {
  e.preventDefault();
  if (document.getElementById("submitbtn").value == "Update") {
    const id = document.getElementById("userId").value;

    const updatedName = document.getElementById("name").value;
    const updatedExpense = document.getElementById("expense").value;

    axios
      .patch(`http://localhost:3000/expense/${id}`, {
        name: updatedName,
        amount: updatedExpense,
      })
      .then((result) => {
        console.log(result);
        document.getElementById(id).remove();
        appendDataToPage({ id: id, name: updatedName, amount: updatedExpense });

        document.getElementById("name").value = "";
        document.getElementById("expense").value = "";
        document.getElementById("submitbtn").value = "Submit";
        document.getElementById("userId").value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    axios
      .post("http://localhost:3000/expense/", {
        name: document.getElementById("name").value,
        amount: document.getElementById("expense").value,
      })
      .then((result) => {
        appendDataToPage(result.data);
        document.getElementById("name").value = "";
        document.getElementById("expense").value = "";
      })
      .catch((err) => console.log(err));
  }
}

function appendDataToPage(data) {
  let id = data.id;
  let name = data.name;
  let expense = data.amount;

  //make an li item
  let li = document.createElement("li");
  li.id = id;
  li.appendChild(
    document.createTextNode(`Name: ${name}, Amount: RS ${expense} `)
  );

  //append buttons
  let btnDel = document.createElement("button");
  let btnEdit = document.createElement("button");
  btnDel.className = "btn-delete";
  btnEdit.className = "btn-edit";
  btnEdit.appendChild(document.createTextNode("Edit"));
  btnDel.appendChild(document.createTextNode("Delete"));
  li.append(btnEdit);
  li.append(btnDel);

  //append in dom
  document.getElementById("users").appendChild(li);
}

function alterDetail(e) {
  e.preventDefault();
  const id = e.target.parentNode.id;
  console.log(id);
  if (e.target.className == "btn-delete") {
    axios
      .delete(`http://localhost:3000/expense/${id}`)
      .then((result) => {
        console.log(result);
        e.target.parentNode.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (e.target.className == "btn-edit") {
    console.log(id);

    axios.get(`http://localhost:3000/expense/${id}`).then((user) => {
      console.log(user.data.name);
      document.getElementById("name").value = user.data.name;
      document.getElementById("expense").value = user.data.amount;
      document.getElementById("submitbtn").value = "Update";
      document.getElementById("userId").value = id;
    });
  }
}

function signup(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  axios
    .post("http://localhost:3000/user/signup", { username, email, password })
    .then((result) => {
      alert("SignUp Successful");
      window.location.href = "signin.html";
    })
    .catch((err) => {
      console.error("Signin error:", err);
      alert(
        "Signup failed: " +
          (err.response?.data?.message || "Something went wrong")
      );
    });
}

function signin(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
console.log("here");
  axios
    .post("http://localhost:3000/user/signin", { email, password })
    .then((result) => {
      alert("SignIn Successful");
      window.location.href = "index.html";
    })
    .catch((err) => {
      console.error("Signin error:", err);
      alert(
        "SignIn failed: " +
          (err.response?.data?.message || "Something went wrong")
      );
    });
}
