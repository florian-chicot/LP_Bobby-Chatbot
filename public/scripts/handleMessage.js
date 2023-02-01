
const pkg = require('node-wit') // importation de la librairie node-wit
const {Wit} = pkg; // déclaration de la librairie node-wit
const witai_token = require('../../witai_token.js');
let utils = require('./getCountryDataFunctions.js');

async function handleMessage(message) {
  try {
    const client = new Wit({accessToken: witai_token});
    // send the message to wit.ai
    const response = await client.message(message);
    if (response) handleResponse(response);
  } catch (error) {
    if (error) console.log(error);
  }
}

function handleResponse(response) {
  let name = '';
  if (response.intents[0].name == 'official_name') {
    let official_name = utils.getCountryFullName(response.entities['country:country'][0].value);
    official_name.then(function(result) {
      return console.log(result);
    });
  } else if (response.intents[0].name == 'french_name') {
    let french_name = utils.getCountryFrenchName(response.entities['country:country'][0].value);
    french_name.then(function(result) {
      return console.log(result);
    });
  } else if (response.intents[0].name == 'continent') {
    let continent = utils.getCountryContinent(response.entities['country:country'][0].value);
    continent.then(function(result) {
      return console.log(result);
    });
  } else if (response.intents[0].name == 'population') {
    let population = utils.getCountryPopulation(response.entities['country:country'][0].value);
    population.then(function(result) {
      return console.log(result);
    });
  } else if (response.intents[0].name == 'currency') {
    let currency = utils.getCountryCurrencies(response.entities['country:country'][0].value);
    currency.then(function(result) {
      return console.log(result);
    });
  } else if (response.intents[0].name == 'capital') {
    let capital = utils.getCountryCapitalCity(response.entities['country:country'][0].value);
    capital.then(function(result) {
      return console.log(result);
    });
  } else if (response.intents[0].name == 'tld') {
    let tld = utils.getCountryTopLevelDomain(response.entities['country:country'][0].value);
    tld.then(function(result) {
      return console.log(result);
    });
  } else if (response.intents[0].name == 'languages') {
    let languages = utils.getCountryLanguages(response.entities['country:country'][0].value);
    languages.then(function(result) {
      return console.log(result);
    });
  } else if (response.intents[0].name == 'flag') {
    let tld = utils.getCountryFlag(response.entities['country:country'][0].value);
    tld.then(function(result) {
      return console.log(result);
    });
  } else if (response.intents[0].name == 'coat_of_arms') {
    let languages = utils.getCountryCoatOfArms(response.entities['country:country'][0].value);
    languages.then(function(result) {
      return console.log(result);
    });
  } else {
    return console.log('Sorry, I don\'t understand.');
  }
}

module.exports = handleMessage;