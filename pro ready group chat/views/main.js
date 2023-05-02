window.addEventListener("DOMContentLoaded", loadChat);

async function loadChat() {
    const token = localStorage.getItem("token")
    const getChat = await axios.get("http://localhost:3000/getChat", { headers: { "Authorization": token } });
    getChat.data.allChat.forEach((item) => {
        appendChatToPage(item.message, item.user.name);
    })

}

function appendChatToPage(message, name) {
    const p = document.createElement("p");
    p.className = "border "
    p.appendChild(document.createTextNode(`${name}: ${message}`));
    document.getElementById("chats").appendChild(p);
}

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