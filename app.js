import express from 'express'
import routes from './routes'
import dotenv from 'dotenv'

const app = express()

dotenv.load()
routes(app)

app.listen(8080, '0.0.0.0', () => {
    console.log('running')
})