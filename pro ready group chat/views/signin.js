async function onSignin(e) {
    e.preventDefault();
    const emailorphone = document.getElementById("emailorphone").value;
    const password = document.getElementById("password").value;
    try {
        const result = await axios.post("http://localhost:3000/signin", {
            emailorphone: emailorphone,
            password: password
        })
        localStorage.clear();
        localStorage.setItem("token", result.data.token);

        window.alert(result.data.message);
        window.location.href="main.html";
    }
    catch (err) {
        console.log(err);
        window.alert(err.response.data.message);
        if (err.response.status == 404) {
            window.location.href = "signup.html"
        }
        else {
            window.location.href = "signin.html"
        }
    }

}