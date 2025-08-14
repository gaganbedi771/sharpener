exports.getAllUsers = (req, res) => {
  res.send(`<h1>Fetching all users</h1>`);
};

exports.getUserById = (req, res) => {
  const userId = Number(req.params.id);
  res.send(`<h1>Fetching user with ID: ${userId}</h1>`);
};

exports.addUser = (req, res) => {
  res.send(`<h1>Adding a new user</h1>`);
};
