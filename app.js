import express from 'express'
const app = express()

import routes from './routes'
routes(app)

app.listen(8080, '0.0.0.0', () => {
    console.log('running')
})