const express = require('express')
const router = express.Router()

const { getAllProducts, uploadProduct } = require('../controllers/productController')
const { uploadImage } = require('../controllers/uploadsController')

router.route('/').post(uploadProduct).get(getAllProducts)
router.route('/upload').post(uploadImage)

module.exports = router