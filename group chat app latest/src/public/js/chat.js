(() => {
  const logoutBtn = document.getElementById("logoutBtn");
  const chatForm = document.getElementById("chatForm");
  const messageInput = document.getElementById("messageInput");
  const chatWindow = document.getElementById("chatWindow");
  const fileInput = document.getElementById("fileInput");
  const createRoomBtn = document.getElementById("createRoomBtn");
  const joinRoomBtn = document.getElementById("joinRoomBtn");
  const roomNameInput = document.getElementById("roomName");
  const roomList = document.getElementById("roomList");

  let currentRoom = null;

  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/signin.html";
  });

  // Fetch messages for a room
  async function loadMessages(room) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/chat/messages?room=${room}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      chatWindow.innerHTML = "";
      res.data.messages.forEach((msg) => renderMessage(msg));
      chatWindow.scrollTop = chatWindow.scrollHeight;
    } catch (error) {
      console.error("Error loading messages:", error.response?.data || error);
    }
  }

  // Render a single message
  function renderMessage(msg) {
    const msgElement = document.createElement("div");
    msgElement.classList.add("chat-message");

    const time = new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    msgElement.innerHTML = `
    <span><b>${msg.senderName}:</b></span> ${msg.text || ""}
    ${msg.fileUrl ? renderMedia(msg) : ""}
    <span class="message-time">${time}</span>
  `;

    chatWindow.appendChild(msgElement);
  }

  function renderMedia(msg) {
    if (msg.fileType.startsWith("image")) {
      return `<br><img src="${msg.fileUrl}" alt="image">`;
    } else if (msg.fileType.startsWith("video")) {
      return `<br><video controls src="${msg.fileUrl}"></video>`;
    } else if (msg.fileType.startsWith("audio")) {
      return `<br><audio controls src="${msg.fileUrl}"></audio>`;
    }
    return "";
  }

  // Send message
  chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!currentRoom) {
      alert("Join or create a room first!");
      return;
    }

    const message = messageInput.value.trim();
    const file = fileInput.files[0];

    if (!message && !file) return;

    try {
      const formData = new FormData();
      formData.append("room", currentRoom);
      if (message) formData.append("text", message);
      if (file) formData.append("file", file);

      const token = localStorage.getItem("token");
      const res = await axios.post("/api/chat/message", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      renderMessage(res.data.message);
      chatWindow.scrollTop = chatWindow.scrollHeight;

      messageInput.value = "";
      fileInput.value = "";
    } catch (error) {
      console.error("Error sending message:", error.response?.data || error);
    }
  });

  // Create Room
  createRoomBtn.addEventListener("click", async () => {
    const room = roomNameInput.value.trim();
    if (!room) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/chat/create-room",
        { room },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const li = document.createElement("li");
      li.textContent = res.data.room.name;
      li.addEventListener("click", () => {
        currentRoom = res.data.room.name;
        loadMessages(currentRoom);
      });
      roomList.appendChild(li);

      roomNameInput.value = "";
    } catch (error) {
      console.error("Error creating room:", error.response?.data || error);
    }
  });

  // Join Room
  joinRoomBtn.addEventListener("click", async () => {
    const room = roomNameInput.value.trim();
    if (!room) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/chat/join-room",
        { room },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      currentRoom = res.data.room.name;
      loadMessages(currentRoom);

      roomNameInput.value = "";
    } catch (error) {
      console.error("Error joining room:", error.response?.data || error);
    }
  });
})();
