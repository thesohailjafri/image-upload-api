const uploadProduct = async (req, res) => {
    res.send('create product')
}

const getAllProducts = async (req, res) => {
    res.send('all products')
}


module.exports = { getAllProducts, uploadProduct }