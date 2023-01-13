const path = require('path') // gestion fichiers locaux
const express = require('express') //framework mvc
const {gambits} = require(path.join(__dirname, '/public/scripts/gambits.js'))

const config = require(path.join(__dirname, 'config.js'))

let app = express()
app.use(express.static(path.join(__dirname, '/views')))
app.use(express.static(path.join(__dirname, '/public')))

app.listen(config.express.port, config.express.ip, () => {
  console.log('Server listening on ' + config.express.ip + ':' + config.express.port)
})