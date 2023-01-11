var express = require('express');
var router = express.Router();
const {getProduct, getDetailProduct} = require( '../controllers/productController')

/* GET home page. */
router.get('/',getProduct)
router.get('/product/detail/:productId',getDetailProduct)

module.exports = router;
