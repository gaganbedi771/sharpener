function onSignin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    axios.post("http://localhost:2000/signin", {
        email: email,
        password: password
    })
        .then(result => {
            document.body.innerHTML += `<div style="color:red"> ${result.data.customMessage}</div>`
            localStorage.setItem("token", result.data.token);
            window.location.href="index.html"
        })
        .catch(err => {

            if (err.response.data.customMessage) {
                document.body.innerHTML += `<div style="color:red"> ${err.response.data.customMessage}</div>`

            }
            else {
                document.body.innerHTML += `<div style="color:red"> Failed to signUp </div>`

            }

            throw new Error("Failed to signUp");
            return
        });
}