import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import path from 'path'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config'
import router from './server/routes'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3000
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, { noInfo: true }))
app.use(webpackHotMiddleware(compiler, { log: false }))

mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
mongoose.Promise = global.Promise

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', router)
app.get('/*', (req, res) => {
    res.render('index')
})

app.listen(PORT, () => {
    console.log(`> Ready on http://127.0.0.1:${PORT}`)
})