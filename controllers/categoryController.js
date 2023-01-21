const Category = require('../models/categoryModel');

const getCategory = async (req, res) => {
  Category.find().then((result) => {
    res.status(200).send({ data: result, message: 'Berhasil mendapatkan kategori' });
  }).catch((err) => {
    res.status(500).send({ message: 'error mengambil data', error: err });
  });
};

module.exports = { getCategory };
