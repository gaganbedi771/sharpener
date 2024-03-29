const socket = io("http://localhost:3000");

socket.on("connect", () => {
    // console.log(socket.id)
})

window.addEventListener("DOMContentLoaded", loadChat);

async function loadChat() {

    const p1 = new Promise((resolve, reject) => {
        resolve(DOMloadChat(1));
    })

    const p2 = new Promise((resolve, reject) => {
        resolve(DOMloadGroups())
    })

    Promise.all([p1, p2])
        .then(() => {
            socket.emit("join-group", "1");
        })
        .catch(err => {
            console.log(err);
        })
}

async function DOMloadChat(grpid) {
    const token = localStorage.getItem("token");
    const localChats = localStorage.getItem(`localChats${grpid}`);
    let lastMsgId;
    document.getElementById("chats").innerHTML = "";

    if (localChats == undefined) {
        const getAllChats = await axios.get("http://localhost:3000/getAllChats",
            { headers: { "Authorization": token } });
        const arrLen = getAllChats.data.allChat.length;
        console.log(getAllChats);
        if (arrLen < 1) {
            return
        }
        const myId= getAllChats.data.myId;

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

        parsedChats.forEach((item) => {
            lastMsgId = item.id;
            appendChatToPage(item.message, item.user.name);
        })
        localStorage.setItem(`lastMsgId${grpid}`, lastMsgId);

    }
    await getUpdatedChats(grpid);
}

async function getUpdatedChats(grpid) {

    try {

        let lastMsgId = localStorage.getItem(`lastMsgId${grpid}`) || 0;
        let token = localStorage.getItem("token")

        if (grpid == 1) {
            const result = await axios.get(`http://localhost:3000/getGroupToken/${grpid}`,
                { headers: { "Authorization": token } });
            token = result.data.token;
        }

        localStorage.setItem("token", token);

        const updatedMsg = await axios.get(`http://localhost:3000/getUpdate/${lastMsgId}`,
            { headers: { "Authorization": token } });

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
                const stringifiedArr = JSON.stringify(arrlocalChats.slice(arrLen - 10, arrLen));
                localStorage.setItem(`localChats${grpid}`, stringifiedArr);
            }
            else {
                localStorage.setItem(`localChats${grpid}`, JSON.stringify(arrlocalChats));
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}

async function DOMloadGroups() {
    try {
        const token = localStorage.getItem("token");
        const getGroups = await axios.get("http://localhost:3000/getAllGroups",
            { headers: { "Authorization": token } });

        document.getElementById("groups").innerHTML = "";

        if (getGroups.data.allGroups.length > 0) {
            getGroups.data.allGroups.forEach((item) => {
                appendGroupToPage(item.groupname, item.groupid);
            })
            document.getElementById("groups").addEventListener("click", onGroupClick);
        }
    }
    catch (err) {
        console.log(err);
    }
}

async function onGroupClick(e) {

    if (e.target.classList.contains("open")) {

        try {
            const groupId = e.target.parentNode.id;
            const token = localStorage.getItem("token")

            const result = await axios.get(`http://localhost:3000/getGroupToken/${groupId}`,
                { headers: { "Authorization": token } });
            localStorage.setItem("token", result.data.token);

            if (result.data.isAdmin == true) {
                document.getElementById("addmemberInput").hidden = false;
            }
            document.getElementById("chatapp").innerHTML = "";
            document.getElementById("chatapp").innerHTML = e.target.parentNode.name;
            // document.getElementById("viewMemberDiv").hidden = false;
            document.getElementById("viewMemberBtn").disabled = false;
            document.getElementById("addmember").disabled = false;
            document.getElementById("addMemberBtn").disabled = false;
            document.getElementById("publicgroup").disabled = false;

            socket.emit("join-group", groupId);

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

    li.appendChild(btnOpen);
    document.getElementById("groups").appendChild(li);
}



function appendChatToPage(message, name) {
    const div=document.createElement("div");
    // if(senderId==myId){
        // div.className="text-right"
    // }
    // else{
        // div.className="text-left"
    // }
    div.style.backgroundColor="white"
    const p = document.createElement("p");
    // console.log(senderId,myId,name)
   
    p.className = "border p-3 "
    
    if (message.includes("https://groupchat771")) {
        p.innerHTML = `<p></p><picture>
            <img src=${message} style="width:auto;height:70px;">
            <a href="${message}">${name}: sends media</a>
        </picture>`
    }
    else {
        p.appendChild(document.createTextNode(`${name}: ${message}`));
    }
    div.appendChild(p);

    document.getElementById("chats").appendChild(div);
}

async function sendMsg() {

    const msg = document.getElementById("msg").value;
    const token = localStorage.getItem("token")

    if (!msg) {
        return
    }
    try {

        const result = await axios.post("http://localhost:3000/send-msg", {
            msg: msg
        }, { headers: { "Authorization": token } })

        socket.emit("chat message", msg, result.data.groupId, result.data.name);
        appendChatToPage(msg, result.data.name);

        document.getElementById("msg").value = "";

    }

    catch (err) {
        console.log(err);
    }

}


socket.on("received message", (msg, groupId, name) => {
    appendChatToPage(msg, name);
})



async function createGroup() {

    try {
        const groupName = document.getElementById("groupName").value;
        const token = localStorage.getItem("token");
        if (!groupName) {
            throw new Error("Enter Group Name");
            return
        }
        const result = await axios.post("http://localhost:3000/createGroup", { groupName: groupName }, { headers: { "Authorization": token } });

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

        try {
            const result = await axios.post("http://localhost:3000/addmember", {
                member: member
            }, { headers: { "Authorization": token } });

            window.alert("User Added");

        }
        catch (err) {
            console.log(err);
            if (err.response.status == 400 || err.response.status == 404) {
                window.alert(err.response.data.message);
            }
        }

    }
}

async function publicGroup() {
    try {
        const token = localStorage.getItem("token");
        const result = await axios.get("http://localhost:3000/getPublicToken",
            { headers: { "Authorization": token } });
        localStorage.setItem("token", result.data.token);
        window.location.href = "main.html"
    }
    catch (err) {
        console.log(err);
    }
}

async function showpopup() {
    document.getElementById("viewmembers").innerHTML = "";
    try {
        const token = localStorage.getItem("token");
        const allMembers = await axios.get("http://localhost:3000/viewAllMembers",
            { headers: { "Authorization": token } });

        const admins = allMembers.data.members[1];
        const myId = allMembers.data.myId;

        const adminSet = new Set();
        admins.forEach((admin) => {
            adminSet.add(admin.userId)
        })

        allMembers.data.members[0][0].users.forEach((item) => {
            appendMembersToPopup(item, adminSet, myId);
        })


        document.getElementById("popup").style.display = 'block';
    }
    catch (err) {
        console.log(err);
    }
}

function appendMembersToPopup(member, adminSet, myId) {

    const li = document.createElement("li");
    li.id = member.id;
    li.appendChild(document.createTextNode(`${member.name} :`))

    const btnAdmin = document.createElement("button");
    btnAdmin.className = "btn btn-sm btn-link admin";
    btnAdmin.disabled = true;
    if (adminSet.has(member.id)) {
        btnAdmin.appendChild(document.createTextNode("Admin"));
    }
    else {
        btnAdmin.appendChild(document.createTextNode("Make Admin"));
        if (adminSet.has(myId)) {
            btnAdmin.disabled = false;
        }
    }

    const btnRemove = document.createElement("button");
    btnRemove.className = "btn btn-sm btn-link  remove";
    btnRemove.disabled = true;
    btnRemove.appendChild(document.createTextNode("Remove Member"));

    if (adminSet.has(myId) || member.id == myId) {
        btnRemove.disabled = false;
    }

    li.appendChild(btnAdmin);
    li.appendChild(btnRemove);
    document.getElementById("viewmembers").appendChild(li);
}

document.getElementById("viewmembers").addEventListener("click", memberClick);

async function memberClick(e) {
    const userid = e.target.parentNode.id;
    const token = localStorage.getItem("token");

    if (e.target.classList.contains("admin")) {
        try {
            const result = await axios.get(`http://localhost:3000/addAdmin/${userid}`,
                { headers: { "Authorization": token } });

            window.alert("Admin Added");
            hidepopup();
        }
        catch (err) {
            console.log(err)
        }


    }
    else if (e.target.classList.contains("remove")) {

        try {
            const result = await axios.get(`http://localhost:3000/removeMember/${userid}`,
                { headers: { "Authorization": token } });
        }
        catch (err) {
            console.log(err)
        }

    }
}

function hidepopup() {
    document.getElementById("popup").style.display = 'none';
}

function logout() {
    localStorage.clear();
    window.location.href = "signin.html"
}

document.getElementById("inputFile").addEventListener("input", async (e) => {

    try {

        const file = e.target.files[0];
        const token = localStorage.getItem("token");

        const formData = new FormData()
        formData.append('myfile', file);

        const fileUrl = await axios.post("http://localhost:3000/sendfile", formData,
            { headers: { "Authorization": token, "Content-Type": "multipart/form-data" } })
        console.log(fileUrl.data.fileUrl);
        appendChatToPage(fileUrl.data.fileUrl, fileUrl.data.name);
        socket.emit("chat message", fileUrl.data.fileUrl, fileUrl.data.groupId, fileUrl.data.name);
    }

    catch (err) {
        console.log(err);
    }

})
