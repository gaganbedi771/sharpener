window.addEventListener("DOMContentLoaded", loadChat);

async function loadChat() {
    const token = localStorage.getItem("token");
    const localChats = localStorage.getItem("localChats");
    let lastMsgId;

    if (localChats == undefined) {
        const getAllChats = await axios.get("http://localhost:3000/getAllChats", { headers: { "Authorization": token } });

        getAllChats.data.allChat.forEach((item) => {
            lastMsgId = item.id;
            appendChatToPage(item.message, item.user.name);
        })
        localStorage.setItem("lastMsgId", lastMsgId);
        const arrLen = getAllChats.data.allChat.length;
        if (arrLen > 10) {
            localStorage.setItem("localChats", JSON.stringify(getAllChats.data.allChat.slice(arrLen - 10, arrLen)));
        }
        else {
            localStorage.setItem("localChats", JSON.stringify(getAllChats.data.allChat));
        }

    }
    else {
        
        const parsedChats = JSON.parse(localChats);
        console.log(parsedChats);

        parsedChats.forEach((item) => {
            lastMsgId = item.id;
            appendChatToPage(item.message, item.user.name);
        })
        localStorage.setItem("lastMsgId", lastMsgId);

    }

    getUpdatedChats();


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
    getUpdatedChats();

}, 10000)

async function getUpdatedChats() {
    const lastMsgId = localStorage.getItem("lastMsgId");
    const token = localStorage.getItem("token");
    const updatedMsg = await axios.get(`http://localhost:3000/getUpdate/${lastMsgId}`, { headers: { "Authorization": token } });

    if (updatedMsg.data.updatedChat.length > 0) {
        let UpdatedMsgId;
        updatedMsg.data.updatedChat.forEach((item) => {
            UpdatedMsgId = item.id;
            appendChatToPage(item.message, item.user.name);
        })

        localStorage.setItem("lastMsgId", UpdatedMsgId);

        const arrLen = updatedMsg.data.updatedChat.length;
        if (arrLen > 10) {
            localStorage.setItem("localChats", JSON.stringify(updatedMsg.data.updatedChat.slice(arrLen - 10, arrLen)));
        }
        else {
            localStorage.setItem("localChats", JSON.stringify(updatedMsg.data.updatedChat));
        }
    }
}