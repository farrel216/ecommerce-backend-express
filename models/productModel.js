const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  stock: {
    type: Number,
  },
  sold: {
    type: Number,
  },
  image: {
    type: String,
  },
  rating: [{
    rate: {
      type: Number,
    },
    count: {
      type: Number,
    },
  }],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
