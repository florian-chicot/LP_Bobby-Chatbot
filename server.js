const path = require('path') // gestion fichiers locaux
const express = require('express') //framework mvc
const config = require(path.join(__dirname, 'config.js')) // importation du fichier de configuration

let app = express()
app.use(express.static(path.join(__dirname, '/views')))
app.use(express.static(path.join(__dirname, '/public')))

const handleMessage = require('./public/scripts/handleMessage.js');

app.listen(config.express.port, config.express.ip, () => {
  console.log('Server listening on ' + config.express.ip + ':' + config.express.port)
})