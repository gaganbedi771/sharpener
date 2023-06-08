const Product = require('../models/product');
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findbyId(prodId)
    .then(product => {
      res.render('shop/product-detail',
        {
          product: product,
          pageTitle: product.title,
          path: '/products'
        });
    })
    .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {

  Product.fetchAll()
    .then((products) => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));


};

exports.getCart = (req, res, next) => {

  req.user.getCart()
    .then(cart => {
      //console.log(cart)
      return cart.getProducts();
    })
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      });
    })
    .catch(err => {
      console.log(err);
    })

};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let newQunatity = 1;
  let fetchedCart;
  
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });

    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        console.log(oldQuantity);
        newQunatity = oldQuantity + 1;
        console.log(newQunatity);
        return product;
        
      }
      return Product.findByPk(prodId)
    })
    .then(product=>{
      return fetchedCart.addProduct(product, { through: { quantity: newQunatity } })
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch(err => console.log(err));

}

exports.postCartDeleteProduct=(req,res,next)=>{
  const prodId= req.body.productId;
  req.user.getCart()
  .then(cart=>{
    return cart.getProducts({where:{id:prodId}})
  })
  .then(products=>{
    const product=products[0];
    return product.cartItem.destroy()
  })
  .then(result=>{
    res.redirect("/cart")
  })
  .catch(err=>console.log(err));
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
