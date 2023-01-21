const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const { getCart, addCartItems, emptyCart } = require('../controllers/cartController');
const { getCategory } = require('../controllers/categoryController');
const { addOrder } = require('../controllers/orderController');
const { getProduct, getDetailProduct, getProductByCategory } = require('../controllers/productController');
const { getUserData } = require('../controllers/userController');
const { refreshToken } = require('../middleware/refreshToken');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

// middleware
router.get('/token', refreshToken);

// authentication
router.post('/auth/register', register);
router.post('/auth/login', login);
router.delete('/auth/logout', logout);

router.get('/users', verifyToken, getUserData);

/* GET home page. */
router.get('/product', getProduct);
router.get('/product/category/:category', getProductByCategory);
router.get('/product/detail/:productId', getDetailProduct);

// Category
router.get('/category', getCategory);

// Cart
router.get('/cart', verifyToken, getCart);
router.post('/cart', verifyToken, addCartItems);
router.delete('/cart', verifyToken, emptyCart);

// Order
router.post('/order', verifyToken, addOrder);
module.exports = router;
