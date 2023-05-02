async function sendMsg() {
    
    const msg = document.getElementById("msg").value;
    const token = localStorage.getItem("token")

    if (!msg) {
        return
    }
    try {

        await axios.post("http://localhost:3000/send-msg", {
            msg: msg
        }, { headers: { "Authorization": token } })
        console.log("query completed")

    }

    catch (err) {
        console.log(err);
    }

}