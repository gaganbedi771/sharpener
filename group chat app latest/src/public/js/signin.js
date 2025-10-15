const form = document.getElementById("signinForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    emailOrPhone: document.getElementById("emailOrPhone").value,
    password: document.getElementById("password").value,
  };

  try {
    const res = await axios.post("http://localhost:3000/user/signin", userData);
    message.style.color = "green";
    message.textContent = res.data.message || "Sign in successful!";
    form.reset();
    const {Authorization,userId}= res.data.data;
    localStorage.setItem("Authorization",Authorization);
    localStorage.setItem("userId",userId);
    window.location.href = "/chat.html";
  } catch (err) {
    message.style.color = "red";
    message.textContent = err.response?.data?.message || "Sign in failed!";
  }
});
