const path = require('path') // gestion fichiers locaux
const express = require('express') //framework mvc
const config = require(path.join(__dirname, 'config.js')) // importation du fichier de configuration
const pkg = require('node-wit') // importation de la librairie node-wit
const {Wit} = pkg; // déclaration de la librairie node-wit

let app = express()
app.use(express.static(path.join(__dirname, '/views')))
app.use(express.static(path.join(__dirname, '/public')))

function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
// handleMessage('What is the continent where Isle of Man is located?'); // test de message à envoyer à wit.ai

function getCountriesNames() {
  const url = "https://restcountries.com/v3.1/all";
  fetch(url)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        let test = [
          'what is the tld of ' + data[i]["name"]["common"],
          'what are the tld of ' + data[i]["name"]["common"],
          'what is the top-level domain of ' + data[i]["name"]["common"],
          'what are the top-level domains of ' + data[i]["name"]["common"],
          'what is the top level domain of ' + data[i]["name"]["common"],
          'what are the top level domains of ' + data[i]["name"]["common"],
          'what is the official name of ' + data[i]["name"]["common"],
          'what is the full name of ' + data[i]["name"]["common"],
          'what is the fullname of ' + data[i]["name"]["common"],
          'what is the french translation for ' + data[i]["name"]["common"],
          'what is the name of ' + data[i]["name"]["common"] + ' in french',
          'what is the translation of ' + data[i]["name"]["common"] + ' in french',
          'what is the french name of ' + data[i]["name"]["common"],
          'what are the currencies used in ' + data[i]["name"]["common"],
          'what is the currency used in ' + data[i]["name"]["common"],
          'what is the currency of ' + data[i]["name"]["common"],
          'what is the currency for ' + data[i]["name"]["common"],
          'what is the capital of ' + data[i]["name"]["common"],
          'what is the capital city of ' + data[i]["name"]["common"],
          'what is the capital city for ' + data[i]["name"]["common"],
          'what is the capital city of ' + data[i]["name"]["common"],
          'what are the capital cities of ' + data[i]["name"]["common"],
          'what are the capital cities for ' + data[i]["name"]["common"],
          'what is the population of ' + data[i]["name"]["common"],
          'what is the population for ' + data[i]["name"]["common"],
          'what is the population in ' + data[i]["name"]["common"],
          'what is the population for ' + data[i]["name"]["common"],
          'how much people live in ' + data[i]["name"]["common"],
          'how many people live in ' + data[i]["name"]["common"],
          'how many does inhabitants ' + data[i]["name"]["common"] + ' have',
          'what are the languages spoken in ' + data[i]["name"]["common"],
          'what is the language spoken in ' + data[i]["name"]["common"],
          'what is the official language of ' + data[i]["name"]["common"],
          'what is the official language for ' + data[i]["name"]["common"],
          'in which continent is ' + data[i]["name"]["common"],
          'what continent is ' + data[i]["name"]["common"] + ' in',
          'what continent is ' + data[i]["name"]["common"] + ' located in',
          'what continent is ' + data[i]["name"]["common"] + ' located',
          'what continent is ' + data[i]["name"]["common"] + ' situated in',
          'what continent is ' + data[i]["name"]["common"] + ' situated',
          'what is the tld of ' + data[i]["name"]["common"] + '?',
          'what are the tld of ' + data[i]["name"]["common"] + '?',
          'what is the top-level domain of ' + data[i]["name"]["common"] + '?',
          'what are the top-level domains of ' + data[i]["name"]["common"] + '?',
          'what is the top level domain of ' + data[i]["name"]["common"] + '?',
          'what are the top level domains of ' + data[i]["name"]["common"] + '?',
          'what is the official name of ' + data[i]["name"]["common"] + '?',
          'what is the full name of ' + data[i]["name"]["common"] + '?',
          'what is the fullname of ' + data[i]["name"]["common"] + '?',
          'what is the french translation for ' + data[i]["name"]["common"] + '?',
          'what is the name of ' + data[i]["name"]["common"] + ' in french' + '?',
          'what is the translation of ' + data[i]["name"]["common"] + ' in french' + '?',
          'what is the french name of ' + data[i]["name"]["common"] + '?',
          'what are the currencies used in ' + data[i]["name"]["common"] + '?',
          'what is the currency used in ' + data[i]["name"]["common"] + '?',
          'what is the currency of ' + data[i]["name"]["common"] + '?',
          'what is the currency for ' + data[i]["name"]["common"] + '?',
          'what is the capital of ' + data[i]["name"]["common"] + '?',
          'what is the capital city of ' + data[i]["name"]["common"] + '?',
          'what is the capital city for ' + data[i]["name"]["common"] + '?',
          'what is the capital city of ' + data[i]["name"]["common"] + '?',
          'what are the capital cities of ' + data[i]["name"]["common"] + '?',
          'what are the capital cities for ' + data[i]["name"]["common"] + '?',
          'what is the population of ' + data[i]["name"]["common"] + '?',
          'what is the population for ' + data[i]["name"]["common"] + '?',
          'what is the population in ' + data[i]["name"]["common"] + '?',
          'what is the population for ' + data[i]["name"]["common"] + '?',
          'how much people live in ' + data[i]["name"]["common"] + '?',
          'how many people live in ' + data[i]["name"]["common"] + '?',
          'how many does inhabitants ' + data[i]["name"]["common"] + ' have' + '?',
          'what are the languages spoken in ' + data[i]["name"]["common"] + '?',
          'what is the language spoken in ' + data[i]["name"]["common"] + '?',
          'what is the official language of ' + data[i]["name"]["common"] + '?',
          'what is the official language for ' + data[i]["name"]["common"] + '?',
          'in which continent is ' + data[i]["name"]["common"] + '?',
          'what continent is ' + data[i]["name"]["common"] + ' in' + '?',
          'what continent is ' + data[i]["name"]["common"] + ' located in' + '?',
          'what continent is ' + data[i]["name"]["common"] + ' located' + '?',
          'what continent is ' + data[i]["name"]["common"] + ' situated in' + '?',
          'what continent is ' + data[i]["name"]["common"] + ' situated' + '?',
          'OKAYYYYY LET\'S GO'
        ];
        let index = random(0, test.length-1);
        let output = test[index];
        handleMessage(output); // test de message à envoyer à wit.ai
      }
    })
    .catch(error => console.log(error));
}
getCountriesNames(); // test de récupération des noms de pays à envoyer à wit.ai

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