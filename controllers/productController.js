const Product = require('../models/Product')
const Errors = require('../errors')
const { StatusCodes } = require('http-status-codes')

const uploadProduct = async (req, res) => {
    const { image, price, name } = req.body
    if (!image || !price || !name) {
        throw new Errors.BadRequestError('Missing fields')
    }
    const product = await Product.create({
        image,
        price,
        name
    })

    res.status(StatusCodes.CREATED).send(product)

}

const getAllProducts = async (req, res) => {
    const products = await Product.find()
    res.status(StatusCodes.OK).send(products)
}


module.exports = { getAllProducts, uploadProduct }