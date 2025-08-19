let form = document.getElementById("player-form");

form.addEventListener("submit", onSubmit);

document.getElementById("searchBtn").addEventListener("click", searchPlayer);

function onSubmit(e) {
  e.preventDefault();

  if (document.getElementById("submitbtn").value === "Update") {
    const id = document.getElementById("playerId").value;

    const updatedData = getFormData();

    axios
      .patch(`http://localhost:3000/players/${id}`, updatedData)
      .then((res) => {
        document.getElementById(id).remove();
        resetForm();
      })
      .catch((err) => console.log(err));
  } else {
    const playerData = getFormData();

    axios
      .post("http://localhost:3000/players", playerData)
      .then((res) => {
        resetForm();
      })
      .catch((err) => console.log(err));
  }
}

function getFormData() {
  return {
    name: document.getElementById("name").value,
    dob: document.getElementById("dob").value,
    photo: document.getElementById("photo").value,
    birthplace: document.getElementById("birthplace").value,
    career: document.getElementById("career").value,
    matches: document.getElementById("matches").value,
    score: document.getElementById("score").value,
    fifties: document.getElementById("fifties").value,
    centuries: document.getElementById("centuries").value,
    wickets: document.getElementById("wickets").value,
    average: document.getElementById("average").value,
  };
}

function appendPlayerToPage(player) {
  let card = document.createElement("div");
  card.className = "player-card";
  card.id = player.id;

  card.innerHTML = `
    <img src="${player.photo}" alt="${player.name}">
    <div class="player-details">
      <h2>${player.name}</h2>
      <p><strong>DOB:</strong> ${player.dob}</p>
      <p><strong>Birthplace:</strong> ${player.birthplace}</p>
      <p><strong>Career:</strong> ${player.career}</p>
      <p><strong>Matches:</strong> ${player.matches}</p>
      <p><strong>Score:</strong> ${player.score}</p>
      <p><strong>50s:</strong> ${player.fifties} | <strong>100s:</strong> ${player.centuries}</p>
      <p><strong>Wickets:</strong> ${player.wickets}</p>
      <p><strong>Average:</strong> ${player.average}</p>
    </div>
    <div class="player-actions">
      <button class="btn btn-edit">Edit</button>
      <button class="btn btn-delete">Delete</button>
    </div>
  `;

  document.getElementById("players").appendChild(card);

  card
    .querySelector(".btn-delete")
    .addEventListener("click", () => deletePlayer(player.id));
  card
    .querySelector(".btn-edit")
    .addEventListener("click", () => editPlayer(player.id));
}

function deletePlayer(id) {
  axios
    .delete(`http://localhost:3000/players/${id}`)
    .then(() => {
      document.getElementById(id).remove();
    })
    .catch((err) => console.log(err));
}

function editPlayer(id) {
  axios
    .get(`http://localhost:3000/players/${id}`)
    .then((res) => {
      let p = res.data;
      document.getElementById("name").value = p.name;
      document.getElementById("dob").value = p.dob;
      document.getElementById("photo").value = p.photo;
      document.getElementById("birthplace").value = p.birthplace;
      document.getElementById("career").value = p.career;
      document.getElementById("matches").value = p.matches;
      document.getElementById("score").value = p.score;
      document.getElementById("fifties").value = p.fifties;
      document.getElementById("centuries").value = p.centuries;
      document.getElementById("wickets").value = p.wickets;
      document.getElementById("average").value = p.average;

      document.getElementById("submitbtn").value = "Update";
      document.getElementById("playerId").value = id;
    })
    .catch((err) => console.log(err));
}

function searchPlayer() {
  const searchValue = document
    .getElementById("searchInput")
    .value.toLowerCase();

  axios
    .get("http://localhost:3000/players")
    .then((res) => {
      console.log("reaching here");
      document.getElementById("players").innerHTML = "";
      let results = res.data.filter((p) =>
        p.name.toLowerCase().includes(searchValue)
      );
      results.forEach((p) => appendPlayerToPage(p));
    })
    .catch((err) => console.log(err));
}

function resetForm() {
  form.reset();
  document.getElementById("submitbtn").value = "Submit";
  document.getElementById("playerId").value = "";
}
