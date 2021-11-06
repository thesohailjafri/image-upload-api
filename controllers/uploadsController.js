
const Errors = require('../errors')
const path = require('path')
const { uuid } = require('uuidv4')
const { StatusCodes } = require('http-status-codes')
const uploadImage = async (req, res) => {

    if (!req.files) {
        throw new Errors.BadRequestError('No files were uploaded.')
    }
    if (!req.files.image.mimetype.startsWith('image')) {
        throw new Errors.BadRequestError('Please Upload Image')
    }
    const size = 1024 * 1024
    if (req.files.image.size > size) {
        throw new Errors.BadRequestError('Image size should be less than 1 MB')
    }
    const productImage = req.files.image
    const imagePath = path.join(__dirname, '../public/uploads/' + `product-image-${uuid()}` + '.' + `${productImage.mimetype.split('/')[1]}`)
    await productImage.mv(imagePath)
    res.status(StatusCodes.CREATED).json({ imagePath, productImage })
}

module.exports = {
    uploadImage
}