const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

const getProduct = async (req, res) => {
  Product.find().populate('category').then((result) => {
    res.status(200).send({ data: result, message: 'Berhasil mendapatkan produk' });
  }).catch((err) => {
    res.status(500).send({ message: 'error mengambil data', error: err });
  });
};
const getDetailProduct = async (req, res) => {
  const { productId } = req.params;
  Product.findOne({ _id: productId }).populate('category').then((result) => {
    res.status(200).send({ data: result, message: 'Berhasil mendapatkan produk' });
  }).catch((err) => {
    res.status(500).send({ message: 'error mengambil data', error: err });
  });
};
const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  const cat = await Category.findOne({ name: category });
  if (!cat) return res.status(404).send({ message: 'Category not found' });
  const product = await Product.find({ category: cat._id }).populate('category');
  if (product) {
    return res.status(200).send({ data: product, message: 'Berhasil mendapatkan produk' });
  }
  return res.status(404).send({ message: 'Product not found' });
};

module.exports = { getProduct, getDetailProduct, getProductByCategory };
