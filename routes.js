// Routes layer for the E-Commerce application
// Maps request paths to corresponding controller functions

const express = require('express');
const router = express.Router();
const controller = require('./controller');

// Main Page (Renders both storefront & admin dashboard natively)
router.get('/', controller.showShop);

// AJAX endpoints
router.post('/product/review', controller.addReview);
router.post('/cart/add', controller.addToCart);
router.post('/cart/update', controller.updateCart);
router.post('/cart/remove', controller.removeFromCart);
router.post('/checkout', controller.checkout);

// Admin AJAX CRUD
router.post('/product/add', controller.adminAdd);
router.post('/product/edit', controller.adminEdit);
router.post('/product/delete', controller.adminDelete);

module.exports = router;
