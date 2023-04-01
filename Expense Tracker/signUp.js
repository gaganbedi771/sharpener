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
            // if (result.data.existed) {
                document.body.innerHTML += `<div style="color:red"> Success </div>`
                // throw new Error("User Already exists");
            // }
        })
        .catch(err => {
            
            if(err.response.data.customMessage){
                document.body.innerHTML += `<div style="color:red"> ${err.response.data.customMessage}</div>`
            } 
            else{
                document.body.innerHTML += `<div style="color:red"> Failed to signUp </div>`
            }   
    
            throw new Error("Failed to signUp");
        });
}