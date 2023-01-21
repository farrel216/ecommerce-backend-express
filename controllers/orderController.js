const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const addOrder = async (req, res) => {
  const userId = req.id;
  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).send({ message: 'Cart not found' });
  const order = await Order.create({
    userId,
    totalPrice: cart.totalPrice,
    products: cart.items,
    status: 'Belum dibayar',
  });
  if (order) {
    cart.items.map(async (item) => {
      const id = item.product._id;
      const { quantity } = item;
      const product = await Product.findById(id);
      await Product.findByIdAndUpdate(
        id,
        {
          stock: product.stock -= quantity,
          sold: product.sold += quantity,
        },
      );
    });
    await Cart.findByIdAndDelete(cart._id);
    return res.status(200).send({ message: 'Order Berhasil', data: order });
  }
  return res.status(500).send({ message: 'Server Error' });
};

module.exports = { addOrder };
