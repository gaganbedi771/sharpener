window.addEventListener("DOMContentLoaded", loadChat);

async function loadChat() {
    const token = localStorage.getItem("token")
    const getChat = await axios.get("http://localhost:3000/getChat", { headers: { "Authorization": token } });
    let lastMsgId;
    getChat.data.allChat.forEach((item) => {
        lastMsgId = item.id;
        appendChatToPage(item.message, item.user.name);
    })

    localStorage.setItem("lastMsgId", lastMsgId);
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

        document.getElementById("msg").value = "";

    }

    catch (err) {
        console.log(err);
    }

}

setInterval(async () => {
    const lastMsgId = localStorage.getItem("lastMsgId");
    const token = localStorage.getItem("token");
    const updatedMsg = await axios.get(`http://localhost:3000/getUpdate/${lastMsgId}`, { headers: { "Authorization": token } });
    console.log(updatedMsg);

    if (updatedMsg.data.updatedChat.length > 0) {
        let UpdatedMsgId;
        updatedMsg.data.updatedChat.forEach((item) => {
            UpdatedMsgId = item.id;
            appendChatToPage(item.message, item.user.name);
        })

        localStorage.setItem("lastMsgId", UpdatedMsgId);
    }

}, 10000)