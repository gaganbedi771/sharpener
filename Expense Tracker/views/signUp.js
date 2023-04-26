function onSignup(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
console.log("running")
    axios.post("http://localhost:2000/signup", {
        name: name,
        email: email,
        password: password
    })
        .then(result => {

            document.body.innerHTML += `<div style="color:red"> Success </div>`


        })
        .catch(err => {

            if (err.response.data.customMessage) {
                document.body.innerHTML += `<div style="color:red"> ${err.response.data.customMessage}</div>`
            }
            else {
                document.body.innerHTML += `<div style="color:red"> Failed to signUp </div>`
            }

            throw new Error("Failed to signUp");
        });
}