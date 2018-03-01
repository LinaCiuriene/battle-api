import express from 'express'
import routes from './routes'

const app = express()
routes(app)

app.listen(8080, '0.0.0.0', () => {
    console.log('running')
})