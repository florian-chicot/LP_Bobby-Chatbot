const path = require('path') // gestion fichiers locaux
const express = require('express') //framework mvc
const config = require(path.join(__dirname, 'config.js')) // importation du fichier de configuration
const pkg = require('node-wit') // importation de la librairie node-wit
const {Wit} = pkg; // déclaration de la librairie node-wit

let app = express()
app.use(express.static(path.join(__dirname, '/views')))
app.use(express.static(path.join(__dirname, '/public')))

// test witai
const witai_token = require('./witai_token.js');
const handleMessage = async message => {
  try {
    const client = new Wit({accessToken: witai_token});
    // send the message to wit.ai
    const response = await client.message(message);
    if (response) handleResponse(response);
    // return response;
  } catch (error) {
    if (error) console.log(error);
  }
}
handleMessage('What is the continent where Portugal is located?'); // test de message à envoyer à wit.ai

const handleResponse = response => {
  let name = undefined;
  let confidence = 0;
  Array(response).forEach(item => {
    if (item.intents.length > 0) {
      name = item.intents[0].name;
      confidence = item.intents[0].confidence;
    }
    // console.log(response);
    // console.log(response.entities['country:country']);
    // console.log(response.entities['country:country'][0].value);
  })

  switch (name) {
    case 'official_name':
      return console.log(response.entities['country:country'][0].value +'\'s official name is xxxx');
    case 'french_name':
      return console.log(response.entities['country:country'][0].value + '\'s name translated in French is xxxx');
    case 'languages':
      return console.log('The official languages used in '+ response.entities['country:country'][0].value + ' are xxxx');
    case 'currency':
      return console.log('The official currency used in '+ response.entities['country:country'][0].value + ' is xxxx');
    case 'population':
      return console.log('There are xxxx inhabitants in '+ response.entities['country:country'][0].value);
    case 'tld':
      return console.log('The top-level domain of '+ response.entities['country:country'][0].value + ' is xxxx');
    case 'continent':
      return console.log(response.entities['country:country'][0].value + ' is situated in xxxx');
    case 'capital':
      return console.log('The capital city of '+ response.entities['country:country'][0].value + ' is xxxx');
    default:
      return console.log('Sorry, I don\'t understand.');
  }
}

app.listen(config.express.port, config.express.ip, () => {
  console.log('Server listening on ' + config.express.ip + ':' + config.express.port)
})