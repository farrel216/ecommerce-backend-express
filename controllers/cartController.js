const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.id }).populate('items.product');
  if (!cart) {
    return res.status(404).send({ message: 'Cart not found' });
  }
  return res.status(200).send({ message: 'Berhasil mendapatkan cart', data: cart });
};

const addCartItems = async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  const cart = await Cart.findOne({ userId: req.id });

  if (!product) {
    return res.status(404).send({ message: 'Product not found' });
  }
  if (cart) {
    const index = cart.items.findIndex((item) => item.product.toString() === productId);
    if (index !== -1) {
      cart.items[index].quantity += quantity;
      cart.items[index].totalProductPrice = cart.items[index].quantity * product.price;
      cart.items[index].totalProductPrice.toFixed(2);
      cart.totalPrice += quantity * product.price;
      cart.totalPrice.toFixed(2);
      cart.totalItems += quantity;
    } else {
      cart.items.push({
        product: product._id,
        quantity,
        totalProductPrice: (quantity * product.price).toFixed(2),
      });
      cart.totalPrice += quantity * product.price;
      cart.totalPrice.toFixed(2);
      cart.totalItems += quantity;
    }
    await cart.save();
    return res.status(200).send({ message: 'Berhasil menambahkan cart', data: cart });
  }
  const newCart = await Cart.create({
    userId: req.id,
    items: [{ product: product._id, quantity, totalProductPrice: quantity * product.price }],
    totalPrice: quantity * product.price,
    totalItems: quantity,
  });
  return res.status(200).send({ message: 'Berhasil menambahkan cart', data: newCart });
};

const emptyCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.id });
  if (!cart) {
    return res.status(404).send({ message: 'Cart not found' });
  }
  cart.items = [];
  cart.totalPrice = 0;
  cart.totalItems = 0;
  await cart.save();
  return res.status(200).send({ message: 'Berhasil mengosongkan cart', data: cart });
};

module.exports = {
  getCart, addCartItems, emptyCart,
};
