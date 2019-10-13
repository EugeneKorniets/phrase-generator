const express = require('express')

const port = process.env.PORT || 4000

const server = express()

server.use(express.static('dist'))

server.listen(port, () => console.info('Application started'))
