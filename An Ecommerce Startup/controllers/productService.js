exports.getProducts = function () {
  return "Fetching all products";
};

exports.getProductById = function (productId) {
  return `Fetching product with ID: ${productId}`;
};

exports.addProduct = function () {
  return `Adding a new product`;
};

exports.editProduct = function () {
  return `Editing a product`;
};

exports.deleteProduct = function () {
  return `Deleting a product`;
};
