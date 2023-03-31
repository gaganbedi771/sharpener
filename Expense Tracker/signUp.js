function onSignup(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    axios.post("http://localhost:1000/signup", {
        name: name,
        email: email,
        password: password
    })
        .then(result => {
            if (result.data.existed) {
                document.body.innerHTML += `<div style="color:red"> User exists </div>`
                throw new Error("User Already exists");
            }
        })
        .catch(err => {
            document.body.innerHTML += `<div style="color:red"> Failed to signUp </div>`
            console.log(err);
            throw new Error("Failed to signUp");
        });
}