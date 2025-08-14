exports.getCart = (req, res) => {
  const userId = Number(req.params.id);
  res.send(`<h1>Fetching cart for user with ID: ${userId}</h1>`);
};

exports.addToCart = (req, res) => {
  const userId = req.params.id;
  res.send(`<h1>Adding product to cart for user with ID: ${userId}</h1>`);
};
