let form = document.getElementById("my-form");

window.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: token } };

  try {
    const [expensesRes, premiumRes] = await Promise.all([
      axios.get("http://localhost:3000/expense", config),
      axios.get("http://localhost:3000/user/isPremium", config),
    ]);

    // Handle Premium status
    if (premiumRes.data.success && premiumRes.data.data.isPremium) {
      console.log(premiumRes.data.data.isPremium, premiumRes);
      const btnPremium = document.getElementById("buyPremiumBtn");
      const btnLeaderboard = document.getElementById("leaderBoardBtn");
      const btnReportDownload = document.getElementById("leaderBoardBtn");
      btnPremium.innerText = "Premium User";
      btnPremium.disabled = true;
      btnPremium.style.cursor = "not-allowed";

      btnReportDownload.disabled=false;

      btnLeaderboard.style.display = "inline-block";

      const popup = document.getElementById("leaderBoardPopup");
      const list = document.getElementById("leaderBoardList");

      btnReportDownload.addEventListener("click",async=>{
        window.location.href="report.html"
      })

      btnLeaderboard.addEventListener("click", async () => {
        try {
          popup.style.display = "block";

          const token = localStorage.getItem("token");
          const res = await axios.get(
            "http://localhost:3000/user/leaderboard",
            {
              headers: { Authorization: token },
            }
          );

          list.innerHTML = "";
          console.log(res.data.data);
          // Assuming API returns: [{ username: "user1", totalExpense: 500 }, ...]
          res.data.data.forEach((entry) => {
            console.log(entry);
            const li = document.createElement("li");
            li.textContent = `${entry.username} - ₹${entry.totalExpense}`;
            list.appendChild(li);
          });
        } catch (err) {
          console.error("Error fetching leaderboard:", err);
        }
      });
    }

    if (Array.isArray(expensesRes.data) && expensesRes.data.length) {
      expensesRes.data.forEach((entry) => {
        appendDataToPage(entry);
        updateTotalExpense();
      });
    }
  } catch (err) {
    console.error("Error fetching data:", err);
  }
});

document.getElementById("expenseForm").addEventListener("submit", onSubmit);
document.getElementById("expenseList").addEventListener("click", alterDetail);
document.getElementById("logoutBtn").addEventListener("click", logout);

function onSubmit(e) {
  e.preventDefault();
  const token = localStorage.getItem("token");
  if (document.getElementById("submitbtn").innerText == "Update") {
    const id = document.getElementById("userId").value;

    const updatedDescription = document.getElementById("description").value;
    const updatedAmount = document.getElementById("amount").value;
    const updatedCategory = document.getElementById("category").value;

    axios
      .patch(
        `http://localhost:3000/expense/${id}`,
        {
          description: updatedDescription,
          amount: updatedAmount,
          category: updatedCategory,
        },
        { headers: { Authorization: token } }
      )
      .then((result) => {
        console.log(result);
        document.getElementById(id).remove();
        appendDataToPage({
          id: id,
          description: updatedDescription,
          amount: updatedAmount,
          category: updatedCategory,
        });
        updateTotalExpense();

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
      .post(
        "http://localhost:3000/expense",
        {
          description: document.getElementById("description").value,
          amount: document.getElementById("amount").value,
          category: document.getElementById("category").value,
        },
        { headers: { Authorization: token } }
      )
      .then((result) => {
        console.log(result, result.data);
        appendDataToPage(result.data);
        updateTotalExpense();
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
  li.setAttribute("data-amount", amount);
  li.appendChild(
    document.createTextNode(
      `${category}: Amount of RS ${amount} spent on ${description}, `
    )
  );

  let btnDel = document.createElement("button");
  let btnEdit = document.createElement("button");
  btnDel.className = "btn-delete";
  btnEdit.className = "btn-edit";
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
  const token = localStorage.getItem("token");
  console.log(id);
  if (e.target.className == "btn-delete") {
    axios
      .delete(`http://localhost:3000/expense/${id}`, {
        headers: { Authorization: token },
      })
      .then((result) => {
        console.log(result);
        e.target.parentNode.remove();
        updateTotalExpense();
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (e.target.className == "btn-edit") {
    console.log(id);

    axios
      .get(`http://localhost:3000/expense/${id}`, {
        headers: { Authorization: token },
      })
      .then((user) => {
        console.log(user.data[0].description);
        document.getElementById("description").value = user.data[0].description;
        document.getElementById("amount").value = user.data[0].amount;
        document.getElementById("category").value = user.data[0].category;
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
      localStorage.setItem("token", result.data.data.token);
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

function updateTotalExpense() {
  const allExpenses = document.querySelectorAll("#expenseList li");
  let total = 0;
  allExpenses.forEach((li) => {
    const amount = li.getAttribute("data-amount"); // get the amount
    total += Number(amount);
  });
  document.getElementById("totalAmount").innerText = total;
}

document.getElementById("buyPremiumBtn").addEventListener("click", () => {
  const token = localStorage.getItem("token");

  axios
    .get("http://localhost:3000/user/buyPremium", {
      headers: { Authorization: token },
    })
    .then((result) => {
      // console.log(result.data.data.payment_session_id);
      const payment_session_id = result.data.data.payment_session_id;
      let checkoutOptions = {
        paymentSessionId: payment_session_id,
        redirectTarget: "_self",
      };

      cashfree.checkout(checkoutOptions).then((result) => {
        if (result.error) {
          console.error("Checkout error:", result.error.message);
        } else if (result.redirect) {
          console.log("Redirecting to checkout...");
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

async function sendPasswordResetLink(e) {
  try {
    e.preventDefault();
    let email = document.getElementById("email").value;
    const response = await axios.get(
      `http://localhost:3000/user/forgotPassword/${email}`
    );
    email = "";

    alert(response.data.data.message);
  } catch (error) {
    console.log(error);
    email.value = "";
    alert(error.response.data.message);
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "signin.html";
}

async function setPassword(e) {
  try {
    e.preventDefault();
    const urlArray = window.location.pathname.split("/");
    const uuid = urlArray.pop();
    const password = document.getElementById("newPassword").value;
    const response = await axios.post(
      `http://localhost:3000/user/resetPassword/${uuid}`,
      { password }
    );
    alert(response.data.data.message);
    window.location.href = response.data.data.redirectTo;
  } catch (error) {
    alert(error.response.data.message);
  }
}
