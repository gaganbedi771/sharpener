window.addEventListener("DOMContentLoaded", loadChat);

async function loadChat() {

    const p1 = new Promise((resolve, reject) => {
        resolve(DOMloadChat(0));
    })

    const p2 = new Promise((resolve, reject) => {
        resolve(DOMloadGroups())
    })

    Promise.all([p1, p2])
        .then()
        .catch(err => {
            console.log(err);
        })

}

async function DOMloadChat(grpid) {
    const token = localStorage.getItem("token");
    const localChats = localStorage.getItem(`localChats${grpid}`);
    let lastMsgId;

    if (localChats == undefined) {
        const getAllChats = await axios.get("http://localhost:3000/getAllChats", { headers: { "Authorization": token } });
        const arrLen = getAllChats.data.allChat.length;

        if (arrLen < 1) {
            return
        }
        getAllChats.data.allChat.forEach((item) => {
            lastMsgId = item.id;
            appendChatToPage(item.message, item.user.name);
        })
        localStorage.setItem(`lastMsgId${grpid}`, lastMsgId);

        if (arrLen > 10) {
            localStorage.setItem(`localChats${grpid}`, JSON.stringify(getAllChats.data.allChat.slice(arrLen - 10, arrLen)));
        }
        else {
            localStorage.setItem(`localChats${grpid}`, JSON.stringify(getAllChats.data.allChat));
        }

    }
    else {

        const parsedChats = JSON.parse(localChats);
        console.log(parsedChats);

        parsedChats.forEach((item) => {
            lastMsgId = item.id;
            console.log(item)
            appendChatToPage(item.message, item.user.name);
        })
        localStorage.setItem(`lastMsgId${grpid}`, lastMsgId);

    }
    await getUpdatedChats(grpid);
}

async function getUpdatedChats(grpid) {
    let lastMsgId = localStorage.getItem(`lastMsgId${grpid}`) || 0;
    const token = localStorage.getItem("token");

    console.log(lastMsgId, "heyyyyyyyyyyy")
    // if (lastMsgId == undefined) {
    //     return
    // }
    const updatedMsg = await axios.get(`http://localhost:3000/getUpdate/${lastMsgId}`, { headers: { "Authorization": token } });

    console.log(updatedMsg.data.updatedChat.length);
    if (updatedMsg.data.updatedChat.length > 0) {
        let UpdatedMsgId;
        let arrlocalChats;
        if (!localStorage.getItem(`localChats${grpid}`)) {
            arrlocalChats = [];
        }
        else {
            arrlocalChats = JSON.parse(localStorage.getItem(`localChats${grpid}`));
        }


        updatedMsg.data.updatedChat.forEach((item) => {
            arrlocalChats.push(item);
            UpdatedMsgId = item.id;
            appendChatToPage(item.message, item.user.name);
        })

        localStorage.setItem(`lastMsgId${grpid}`, UpdatedMsgId);

        const arrLen = arrlocalChats.length;
        if (arrLen > 10) {
            localStorage.setItem(`localChats${grpid}`, JSON.stringify(arrlocalChats.slice(arrLen - 10, arrLen)));
        }
        else {
            localStorage.setItem(`localChats${grpid}`, JSON.stringify(arrlocalChats));
        }
    }
}

async function DOMloadGroups() {
    const token = localStorage.getItem("token");
    const getGroups = await axios.get("http://localhost:3000/getAllGroups", { headers: { "Authorization": token } });

    console.log(getGroups);
    document.getElementById("groups").innerHTML = "";

    if (getGroups.data.allGroups.length > 0) {
        getGroups.data.allGroups.forEach((item) => {
            appendGroupToPage(item.groupname, item.groupid);
        })
        document.getElementById("groups").addEventListener("click", onGroupClick);
    }
    else {
        document.getElementById("groups").innerHTML = "<p>No groups found</p>";
    }
}

async function onGroupClick(e) {
    // e.preventDefault();
    // console.log(e.target.parentNode.name);
    if (e.target.classList.contains("open")) {
        document.getElementById("chatapp").innerHTML = "";
        document.getElementById("chats").innerHTML = "";

        document.getElementById("chatapp").innerHTML = e.target.parentNode.name;
        document.getElementById("addmemberDiv").hidden = false;
        document.getElementById("publicgroup").hidden = false;

        try {
            const groupId = e.target.parentNode.id;
            const token = localStorage.getItem("token")

            const result = await axios.get(`http://localhost:3000/getGroupToken/${groupId}`, { headers: { "Authorization": token } });
            localStorage.setItem("token", result.data.token);

            DOMloadChat(groupId);

        }
        catch (err) {
            console.log(err);
        }

    }
}

function appendGroupToPage(groupname, groupid) {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(groupname));
    li.name = groupname;
    li.id = groupid;
    li.className = "float-left"

    const btnOpen = document.createElement("button");
    btnOpen.className = "btn btn-sm btn-info float-right open";
    btnOpen.appendChild(document.createTextNode("OpenChat"));

    // const btnAdd=document.createElement("button");
    // btnAdd.className="btn btn-sm btn-info float-left addMember";
    // btnAdd.appendChild(document.createTextNode("AddMembers"));

    li.appendChild(btnOpen);
    // li.appendChild(btnAdd);
    document.getElementById("groups").appendChild(li);
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

setInterval(() => {
    getUpdatedChats();

}, 100000)



async function createGroup() {

    try {
        const groupName = document.getElementById("groupName").value;
        const token = localStorage.getItem("token");
        if (!groupName) {
            throw new Error("Enter Group Name");
            return
        }
        const result = await axios.post("http://localhost:3000/createGroup", { groupName: groupName }, { headers: { "Authorization": token } });

        console.log(result)
        const { groupid, groupname } = result.data.result;

        appendGroupToPage(groupname, groupid);
    }
    catch (err) {
        console.log(err);
    }
}

async function addmember() {
    const member = document.getElementById("addmember").value;
    const token = localStorage.getItem("token");
    if (member) {
        console.log(member);
        try{
            const result=await axios.post("http://localhost:3000/addmember",{
                member:member
            }, { headers: { "Authorization": token } });

            window.alert("User Added");

        }
        catch(err){
            console.log(err);
            if(err.response.status==400 || err.response.status==404){
                window.alert(err.response.data.message);
            }
        }
        
    }
}

async function publicGroup() {
    try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:3000/getPublicToken", { headers: { "Authorization": token } });
        localStorage.setItem("token", result.data.token);
        window.location.href = "../views/main.html"
    }
    catch (err) {
        console.log(err);
    }
}