
const pkg = require('node-wit') // importation de la librairie node-wit
const { Wit } = pkg; // déclaration de la librairie node-wit
const witai_token = require('../../witai_token.js');
let utils = require('./utils.js');

async function handleMessage(message) {
  const client = new Wit({accessToken: witai_token});
  // send the message to wit.ai
  const response = await client.message(message);
  // return the response
  if (response) {
    if (response.intents[0].name == 'official_name') {
      return await utils.getCountryFullName(response.entities['country:country'][0].value);
    } else if (response.intents[0].name == 'french_name') {
      return await utils.getCountryFrenchName(response.entities['country:country'][0].value);
    } else if (response.intents[0].name == 'continent') {
      return await utils.getCountryContinent(response.entities['country:country'][0].value);
    } else if (response.intents[0].name == 'population') {
      return await utils.getCountryPopulation(response.entities['country:country'][0].value);
    } else if (response.intents[0].name == 'currency') {
      return await utils.getCountryCurrencies(response.entities['country:country'][0].value);
    } else if (response.intents[0].name == 'capital') {
      return await utils.getCountryCapitalCity(response.entities['country:country'][0].value);
    } else if (response.intents[0].name == 'tld') {
      return await utils.getCountryTopLevelDomain(response.entities['country:country'][0].value);
    } else if (response.intents[0].name == 'languages') {
      return await utils.getCountryLanguages(response.entities['country:country'][0].value);
    } else if (response.intents[0].name == 'flag') {
      return await utils.getCountryFlag(response.entities['country:country'][0].value);
    } else if (response.intents[0].name == 'coat_of_arms') {
      return await utils.getCountryCoatOfArms(response.entities['country:country'][0].value);
    }
  };
}

module.exports = handleMessage;