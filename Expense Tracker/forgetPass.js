function passReset(e){
    e.preventDefault();
    const email=e.target.email.value;
    console.log(email,"this is email")
    axios.post("http://localhost:1000/password/forgotpassword ",{email:email})
    .then((result)=>{
        console.log(result);
    })
    .catch(err=>{
        console.log(err)
        throw new Error("Failed to send reset link");
    })
}