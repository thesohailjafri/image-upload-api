require('dotenv').config()
require('express-async-errors')
//decalrations and imports
const express = require('express')
const app = express()
const expressFileupload = require('express-fileupload')
//imports
const productRouter = require('./routes/productRoutes')
//cloudinary
const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

// database
const connectDB = require('./db/connect')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//static files
app.use(express.static('./public'))

//pre middleewares
app.use(express.json())
app.use(expressFileupload({ useTempFiles: true }))

app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>')
})

app.use('/api/v1', productRouter)

// post middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 4000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
