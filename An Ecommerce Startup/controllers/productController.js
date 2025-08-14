exports.getProducts = (req, res) => {
  res.send(`<h1>Fetching all products</h1>`);
};

exports.getProductById = (req, res) => {
  const productId = Number(req.params.id);
  res.send(`<h1>Fetching product with ID: ${productId}</h1>`);
};

exports.addProduct = (req, res) => {
  res.send(`<h1>Adding a new product</h1>`);
};

exports.editProduct = (req, res) => {
  res.send(`<h1>Editing a product</h1>`);
};

exports.deleteProduct = (req, res) => {
  res.send(`<h1>Deleting a product</h1>`);
};
