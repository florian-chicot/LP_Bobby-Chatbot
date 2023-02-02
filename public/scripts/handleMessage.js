
const pkg = require('node-wit') // importation de la librairie node-wit
const { Wit } = pkg; // déclaration de la librairie node-wit
const witai_token = require('../../witai_token.js');
let utils = require('./getCountryDataFunctions.js');

async function handleMessage(message) {
  const client = new Wit({accessToken: witai_token});
  // send the message to wit.ai
  const response = await client.message(message);
  if (response) {
    let res = '';
    let name = '';
    if (response.intents[0].name == 'official_name') {
      let official_name = await utils.getCountryFullName(response.entities['country:country'][0].value);
      return res = official_name;  
    } else if (response.intents[0].name == 'french_name') {
      let french_name = await utils.getCountryFrenchName(response.entities['country:country'][0].value);
      return res = french_name;  
    } else if (response.intents[0].name == 'continent') {
      let continent = await utils.getCountryContinent(response.entities['country:country'][0].value);
      return res = continent;
    } else if (response.intents[0].name == 'population') {
      let population = await utils.getCountryPopulation(response.entities['country:country'][0].value);
      return res = population;
    } else if (response.intents[0].name == 'currency') {
      let currency = await utils.getCountryCurrencies(response.entities['country:country'][0].value);
      return res = currency;
    } else if (response.intents[0].name == 'capital') {
      let capital = await utils.getCountryCapitalCity(response.entities['country:country'][0].value);
      return res = capital;
    } else if (response.intents[0].name == 'tld') {
      let tld = await utils.getCountryTopLevelDomain(response.entities['country:country'][0].value);
      return res = tld;
    } else if (response.intents[0].name == 'languages') {
      let languages = await utils.getCountryLanguages(response.entities['country:country'][0].value);
      return res = languages;
    } else if (response.intents[0].name == 'flag') {
      let flag = await utils.getCountryFlag(response.entities['country:country'][0].value);
      return res = flag;
    } else if (response.intents[0].name == 'coat_of_arms') {
      let coat = await utils.getCountryCoatOfArms(response.entities['country:country'][0].value);
      return res = coat;
    } else if (!response.intents[0].name) {
      return res = 'Sorry';
    } else {
      return res = 'Sorry, I don\'t understand.';
    }
  };
}

module.exports = handleMessage;