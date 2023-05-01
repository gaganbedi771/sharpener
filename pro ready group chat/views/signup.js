async function onSignup(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    try {
        const result=await axios.post("http://localhost:3000/signup", {
            name: name,
            email: email,
            phone: phone,
            password: password
        })
        window.alert(`User Account Created. Log In?`)

        // window.location.href=``;
    }
    catch (err) {
        console.log(err)
        console.log(err.response.data.message)
        if(err.response.status==409 || 400){
            window.alert(`${err.response.data.message}`)

            // window.location.href=
        }
        else if(err.response.status==400){
            window.alert(`${err.response.data.message}`)
        }
        else{
            window.alert(`Something went wrong`);
        }
        // console.log(err);
    }

    

}