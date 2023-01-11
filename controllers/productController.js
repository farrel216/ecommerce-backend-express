const Product = require('../models/productModel');

const getProduct = async (req, res) => {
    Product.find().then((result)=>{
        res.status(200).send({data: result, message: "Berhasil mendapatkan produk"})
    }).catch((err)=>{
        res.status(500).send({message:"error mengambil data", error:err})
    })
}
const getDetailProduct = async (req, res) => {
    const productId = req.params.productId
    Product.findOne({_id:productId}).then((result)=>{
        res.status(200).send({data: result, message: "Berhasil mendapatkan produk"})
    }).catch((err)=>{
        res.status(500).send({message:"error mengambil data", error:err})
    })
}

module.exports = {getProduct, getDetailProduct}