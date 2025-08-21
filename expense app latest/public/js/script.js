let form = document.getElementById("my-form");

window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/expense")
    .then((allData) => {
      console.log(allData.data);
      if (allData.data.length) {

        allData.data.forEach((data) => {
          console.log(data);
          appendDataToPage(data);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

document.getElementById("expenseForm").addEventListener("submit", onSubmit);
document.getElementById("expenseList").addEventListener("click", alterDetail);

function onSubmit(e) {
  e.preventDefault();
  if (document.getElementById("submitbtn").innerText == "Update") {
    const id = document.getElementById("userId").value;

    const updatedDescription = document.getElementById("description").value;
    const updatedAmount = document.getElementById("amount").value;
    const updatedCategory = document.getElementById("category").value;

    axios
      .patch(`http://localhost:3000/expense/${id}`, {
        description: updatedDescription,
        amount: updatedAmount,
        category: updatedCategory,
      })
      .then((result) => {
        console.log(result);
        document.getElementById(id).remove();
        appendDataToPage({
          id: id,
          description: updatedDescription,
          amount: updatedAmount,
          category: updatedCategory,
        });

        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("submitbtn").innerText = "Submit";
        document.getElementById("userId").value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("here");
    axios
      .post("http://localhost:3000/expense", {
        description: document.getElementById("description").value,
        amount: document.getElementById("amount").value,
        category: document.getElementById("category").value,
      })
      .then((result) => {
        console.log(result,result.data);
        appendDataToPage(result.data);
        document.getElementById("description").value = "";
        document.getElementById("amount").value = "";
        document.getElementById("category").value = "";
      })
      .catch((err) => console.log(err));
  }
}

function appendDataToPage(data) {
  let id = data.id;
  let description = data.description;
  let amount = data.amount;
  let category = data.category;

  //make an li item
  let li = document.createElement("li");
  li.id = id;
  li.appendChild(
    document.createTextNode(
      `${category}: Amount of RS ${amount} spent on ${description}, `
    )
  );

  //append buttons
  let btnDel = document.createElement("button");
  let btnEdit = document.createElement("button");
  btnDel.classDescription = "btn-delete";
  btnEdit.classDescription = "btn-edit";
  btnEdit.appendChild(document.createTextNode("Edit"));
  btnDel.appendChild(document.createTextNode("Delete"));
  li.append(btnEdit);
  li.append(btnDel);

  //append in dom
  document.getElementById("expenseList").appendChild(li);
}

function alterDetail(e) {
  e.preventDefault();
  const id = e.target.parentNode.id;
  console.log(id);
  if (e.target.classDescription == "btn-delete") {
    axios
      .delete(`http://localhost:3000/expense/${id}`)
      .then((result) => {
        console.log(result);
        e.target.parentNode.remove();
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (e.target.classDescription == "btn-edit") {
    console.log(id);

    axios.get(`http://localhost:3000/expense/${id}`).then((user) => {
      console.log(user.data.description);
      document.getElementById("description").value = user.data.description;
      document.getElementById("amount").value = user.data.amount;
      document.getElementById("category").value = user.data.category;
      document.getElementById("submitbtn").innerText = "Update";
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
