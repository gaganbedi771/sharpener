const form = document.getElementById("signupForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    password: document.getElementById("password").value,
  };

  try {
    const res = await axios.post("/api/auth/signup", userData);
    message.style.color = "green";
    message.textContent = res.data.message || "Signup successful!";
    form.reset();
  } catch (err) {
    message.style.color = "red";
    message.textContent = err.response?.data?.message || "Signup failed!";
  }
});
