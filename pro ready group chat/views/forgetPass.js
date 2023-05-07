function passReset(e){
    e.preventDefault();
    const email=e.target.email.value;
    axios.post("http://localhost:3000/forgotpassword ",{email:email})
    .then((result)=>{

        window.alert("Reset link sent, please check email");
        window.location.href="../views/signin.html"
    })
    .catch(err=>{
        console.log(err)
        throw new Error("Failed to send reset link");
    })
}