var express = require('express');
const { register, login, logout } = require('../controllers/authController');
var router = express.Router();
const {getProduct, getDetailProduct} = require( '../controllers/productController');
const { refreshToken } = require('../middleware/refreshToken');

// middleware
router.get('/token', refreshToken)

// authentication
router.post('/auth/register', register)
router.post('/auth/login', login)
router.delete('/auth/logout', logout)
/* GET home page. */
router.get('/product',getProduct)
router.get('/product/detail/:productId',getDetailProduct)

module.exports = router;
