(() => {
  const logoutBtn = document.getElementById("logoutBtn");
  const chatWindow = document.getElementById("chatWindow");
  const chatForm = document.getElementById("chatForm");
  const messageInput = document.getElementById("messageInput");
  const fileInput = document.getElementById("fileInput");
  const createGroupBtn = document.getElementById("createGroupBtn");
  const joinGroupBtn = document.getElementById("joinGroupBtn");
  const groupNameInput = document.getElementById("groupNameInput");
  const groupList = document.getElementById("groupList");
  const chatActions = document.getElementById("chatActions");
  const viewMembersBtn = document.getElementById("viewMembersBtn");
  const membersModal = document.getElementById("membersModal");
  const closeModal = document.getElementById("closeModal");
  const membersList = document.getElementById("membersList");

  let currentGroup = null;
  let refreshInterval;

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/signin.html";
  });

fileInput.addEventListener("change", () => {
  const fileNameDisplay = document.getElementById("fileNameDisplay");
  if (fileInput.files.length > 0) {
    fileNameDisplay.textContent = fileInput.files[0].name;
  } else {
    fileNameDisplay.textContent = "";
  }
});

  // Toggle group action buttons
  // groupNameInput.addEventListener("input", async () => {
  //   const group = groupNameInput.value.trim();
  //   if (!group) {
  //     createGroupBtn.style.display = "none";
  //     joinGroupBtn.style.display = "none";
  //     return;
  //   }

  //   try {
  //     const token = localStorage.getItem("Authorization");
  //     const res = await axios.get(`http://localhost:3000/group/?name=${group}`, {
  //       headers: { Authorization: token },
  //     });

  //     if (res.data.exists) {
  //       joinGroupBtn.style.display = "inline-block";
  //     } else {
  //       createGroupBtn.style.display = "inline-block";
  //     }
  //   } catch (err) {
  //     console.error("Error checking group:", err.response?.data || err);
  //   }
  // });

  // Create group

  createGroupBtn.addEventListener("click", async () => {
    const name = groupNameInput.value.trim();
    if (!name) return alert("Enter a group name");

    try {
      const token = localStorage.getItem("Authorization");
      await axios.post(
        "http://localhost:3000/group/",
        { name },
        {
          headers: { Authorization: token },
        }
      );

      alert("Group created!");
      groupNameInput.value = "";
      loadGroups();
    } catch (err) {
      console.log(err.response.data);
      alert(err.response?.data?.message || "Error creating group");
    }
  });

  // Join group
  joinGroupBtn.addEventListener("click", async () => {
    const name = groupNameInput.value.trim();
    if (!name) return alert("Enter a group name");

    try {
      const token = localStorage.getItem("Authorization");
      await axios.post(
        "http://localhost:3000/group/join",
        { name },
        {
          headers: { Authorization: token },
        }
      );

      alert("Joined group!");
      groupNameInput.value = "";
      loadGroups();
    } catch (err) {
      alert(err.response?.data?.message || "Error joining group");
    }
  });

  // Add group to sidebar
  function addGroupToList(group) {
    const li = document.createElement("li");
    li.textContent = group.name;
    li.addEventListener("click", () => {
      currentGroup = group.id;

      // Highlight the selected group
      document.querySelectorAll("#groupList li").forEach((item) => {
        item.classList.remove("selected-group");
      });
      li.classList.add("selected-group");

      const oldHeader = chatWindow.querySelector(".group-header");
      if (oldHeader) oldHeader.remove();
      // Update chat window header / remove placeholder
      chatWindow.querySelector(".placeholder")?.remove();
      const groupHeader = document.createElement("p");
      groupHeader.classList.add("group-header");
      groupHeader.textContent = `Group: ${group.name}`;
      chatWindow.prepend(groupHeader);

      // Load messages
      loadMessages(currentGroup);
      chatActions.style.display = "flex";
      document.getElementById("attachBtn").addEventListener("click", () => {
        document.getElementById("fileInput").click();
      });

      // Refresh messages every 3 seconds
      // if (refreshInterval) clearInterval(refreshInterval);
      // refreshInterval = setInterval(() => loadMessages(currentGroup), 3000);
    });

    groupList.appendChild(li);
  }

  // Load groups
  async function loadGroups() {
    groupList.innerHTML = "";
    try {
      const token = localStorage.getItem("Authorization");
      const res = await axios.get("http://localhost:3000/group/", {
        headers: { Authorization: token },
      });
      res.data.data.forEach(addGroupToList);
    } catch (err) {
      console.error("Error loading groups:", err.response?.data || err);
    }
  }

  loadGroups(); // Initial group load

  // Load messages
  async function loadMessages(groupId) {
    try {
      const token = localStorage.getItem("Authorization");
      const res = await axios.get(
        `http://localhost:3000/group/message?groupId=${groupId}`,
        {
          headers: { Authorization: token },
        }
      );
      chatWindow.innerHTML = "";
      res.data.data.forEach(renderMessage);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    } catch (err) {
      console.error("Error loading messages:", err.response?.data || err);
    }
  }

  function renderMessage(msg) {
  const msgElement = document.createElement("div");
  msgElement.classList.add("chat-message");

  const userId = localStorage.getItem("userId");
  const time = new Date(msg.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

    // Align messages based on sender
  if (msg.senderId == userId) {
    msgElement.classList.add("sent-message"); // Right side
     msgElement.innerHTML = `
     ${msg.message || ""}
    ${msg.fileUrl ? renderMedia(msg) : ""}
    <span class="message-time">${time}</span>
  `;
  } else {
    msgElement.classList.add("received-message"); // Left side
     msgElement.innerHTML = `
    <span><b>${msg.senderName}:</b></span> ${msg.message || ""}
    ${msg.fileUrl ? renderMedia(msg) : ""}
    <span class="message-time">${time}</span>
  `;
  }

 

  chatWindow.appendChild(msgElement);
}


// function renderMedia(msg) {
//   if (!msg.fileUrl) return "";
// console.log(msg);
//   const ext = msg.fileUrl.split(".").pop().toLowerCase();
//   let type = "";
//   if (["png", "jpg", "jpeg", "gif"].includes(ext)) type = "image";
//   else if (["mp4", "webm"].includes(ext)) type = "video";
//   else if (["mp3", "wav"].includes(ext)) type = "audio";

//   if (type === "image") {
//     return `<br><img src="${msg.fileUrl}" alt="image" style="max-width:200px; cursor:pointer;" onclick="window.open('${msg.fileUrl}','_blank')">`;
//   } else if (type === "video") {
//     return `<br><video controls src="${msg.fileUrl}" style="max-width:200px;"></video>`;
//   } else if (type === "audio") {
//     return `<br><audio controls src="${msg.fileUrl}"></audio>`;
//   }
//   return "";
// }

function renderMedia(msg) {
  if (!msg.fileUrl) return "";
  
  const ext = msg.fileUrl.split(".").pop().toLowerCase();
  let type = "";
  if (["png", "jpg", "jpeg", "gif"].includes(ext)) type = "image";
  else if (["mp4", "webm"].includes(ext)) type = "video";
  else if (["mp3", "wav"].includes(ext)) type = "audio";

  if (type === "image") {
    // Use JS listener to avoid inline onclick issues
    const encodedUrl = encodeURIComponent(msg.fileUrl);
    return `<br><img src="${msg.fileUrl}" alt="image" style="max-width:200px; cursor:pointer;" onclick="window.open(decodeURIComponent('${encodedUrl}'),'_blank')">`;
  } else if (type === "video") {
    return `<br><video controls src="${msg.fileUrl}" style="max-width:200px;"></video>`;
  } else if (type === "audio") {
    return `<br><audio controls src="${msg.fileUrl}"></audio>`;
  }
  return "";
}



  // Send message
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentGroup) return alert("Select a group first!");

    const message = messageInput.value.trim();
    const file = fileInput.files[0];
    if (!message && !file) return;

    try {
      const formData = new FormData();
      formData.append("groupId", currentGroup);
      if (message) formData.append("msg", message);
      if (file) formData.append("file", file);

      const token = localStorage.getItem("Authorization");
      const res = await axios.post("http://localhost:3000/group/message", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      renderMessage(res.data.data);
      chatWindow.scrollTop = chatWindow.scrollHeight;
      messageInput.value = "";
      fileInput.value = "";
    } catch (err) {
      console.error("Error sending message:", err.response?.data || err);
    }
  });

  // View members
  viewMembersBtn.addEventListener("click", async () => {
    if (!currentGroup) return;

    try {
      const token = localStorage.getItem("Authorization");
      const res = await axios.get(
        `http://localhost:3000/group/members?groupId=${currentGroup}`,
        {
          headers: { Authorization: token },
        }
      );

      membersList.innerHTML = "";
      console.log(res.data.data);
      res.data.data.forEach((m) => {
        const li = document.createElement("li");
        li.textContent = m.name;
        membersList.appendChild(li);
      });

      membersModal.style.display = "flex";
    } catch (err) {
      console.error("Error fetching members:", err.response?.data || err);
    }
  });

  closeModal.addEventListener("click", () => {
    membersModal.style.display = "none";
  });
})();
