module.exports = () => {
  require('express-async-errors');

  const loginController = require('../controllers/login.controller.js');
  const productController = require('../controllers/product.controller.js');
  const categoryController = require('../controllers/category.controller.js');
  const tagController = require('../controllers/tag.controller.js');
  const dashboardController = require('../controllers/dashboard.controller.js');

  const router = require('express').Router();

  // Usuario e Login
  router.post('/login', loginController.doAuth);
  router.post('/user', loginController.create);
  router.get('/users', loginController.findListAndOne);
  router.put('/user/:id', loginController.edit);
  router.delete('/user/:id',loginController.delete);

  // Products
  router.get('/products', productController.findListAndOne);
  router.post('/product', productController.create);
  router.put('/product/:id', productController.edit);
  router.delete('/product/:id', productController.delete);

  // Categories
  router.get('/categories', categoryController.findListAndOne);
  router.get('/categories/:categoryId', categoryController.getCategoryName);
  router.post('/category', categoryController.create);
  router.put('/category/:id', categoryController.edit);
  router.delete('/category/:id', categoryController.delete);

  // Tag
  router.get('/tags', tagController.findListAndOne);
  router.post('/tag', tagController.create);
  router.put('/tag/:id', tagController.edit);
  router.delete('/tag/:id', tagController.delete);

  // Dashboard
  router.get('/dashboard', dashboardController.getCounts);

  return router;
};
