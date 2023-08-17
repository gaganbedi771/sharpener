function onSignup(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    axios.post("http://localhost:2000/signup", {
        name: name,
        email: email,
        password: password
    })
        .then(result => {

            document.body.innerHTML += `<div style="color:red"> Success </div>`
            alert("Success! Redirect to SignIn page ?")
            window.location.href="signIn.html"


        })
        .catch(err => {

            if (err.response.data.customMessage) {
                alert(err.response.data.customMessage);
            }
            else {
                alert("Failed to signUp ");
            }

            throw new Error("Failed to signUp");
        });
}