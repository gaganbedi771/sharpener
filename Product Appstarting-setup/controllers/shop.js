const Product = require('../models/product');
const Cart = require("../models/cart");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  // Product.fetchAll()
  Product.find()
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
  // Product.findbyId(prodId)
  Product.findById(prodId)
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

  // Product.fetchAll()
  Product.find()
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

  // req.user.getCart()
  req.user.populate("cart.items.productId")
    // .execPopulate()
    .then(user => {
      const products = user.cart.items;
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
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product)

    })
    .then(result => {
      console.log(result);
      res.redirect("/cart")
    })
  // let newQunatity = 1;
  // let fetchedCart;
  // req.user.getCart()
  //   .then(cart => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: prodId } });

  //   })
  //   .then(products => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }

  //     if (product) {
  //       const oldQuantity = product.cartItem.quantity;
  //       console.log(oldQuantity);
  //       newQunatity = oldQuantity + 1;
  //       console.log(newQunatity);
  //       return product;

  //     }
  //     return Product.findByPk(prodId)
  //   })
  //   .then(product=>{
  //     return fetchedCart.addProduct(product, { through: { quantity: newQunatity } })
  //   })
  //   .then(() => {
  //     res.redirect('/cart')
  //   })
  //   .catch(err => console.log(err));

}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  // req.user.getCart()
  // req.user.deleteItemFromCart(prodId)
  req.user.removeFromCart(prodId)
    .then(result => {
      res.redirect("/cart")
    })
    .catch(err => console.log(err));
}

exports.postOrder = (req, res, next) => {
  req.user.populate("cart.items.productId")
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } }
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });

      return order.save();
    })
    // req.user.addOrder()
    .then(result => {
      return req.user.clearCart()
        .then(() => {
          res.redirect('/orders')
        })

    })
    .catch(err => {
      console.log(err);
    })
}

exports.getOrders = (req, res, next) => {
  // req.user.getOrders()
  Order.find({"user.userId":req.user._id})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => console.log(err))

};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
