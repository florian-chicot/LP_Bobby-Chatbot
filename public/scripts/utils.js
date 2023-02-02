getCountry = require('./getCountry.js');

let utils = {
  getCountryFullName: async (result) => {
    if (result == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result;
      let res = await getCountry(country.replace(/ /g,"%20"));
      if (res["status"] == '404') {
        return 'I\'m sorry, I don\'t know the official name of ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + '. Maybe ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + ' does not exist.';
      } else {
        let name = await res[0]["name"]["common"];
        let official = await res[0]["name"]["official"];
        return name + '\'s official name is ' + official;
      }
    }
  },
  getCountryFrenchName: async (result) => {
    if (result == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result;
      let res = await getCountry(country.replace(/ /g,"%20"));
      if (res["status"] == '404') {
        return 'I\'m sorry, I don\'t know the name of ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + ' in French. Maybe ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + ' does not exist.';
      } else {
        let name = await res[0]["name"]["common"];
        let frenchName = await res[0]['translations']['fra']['common']; 
        return name + '\'s name in French is ' + frenchName;
      }
    }
  },
  getCountryContinent: async (result) => {
    if (result == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result;
      let res = await getCountry(country.replace(/ /g,"%20"));
      if (res["status"] == '404') {
        return 'I\'m sorry, I don\'t know the continent of ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + '. Maybe ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + ' does not exist.';
      } else {
        let name = await res[0]["name"]["common"];
        let continent = await res[0]['region'];
        if (continent == 'Americas') {
          continent = 'the Americas';
        }
        return name + ' is situated in ' + continent;
      }
    }
  },
  getCountryPopulation: async (result) => {
    if (result == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result;
      let res = await getCountry(country.replace(/ /g,"%20"));
      if (res["status"] == '404') {
        return 'I\'m sorry, I don\'t know the number of inhabitants of ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + '. Maybe ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + ' does not exist.';
      } else {
        let name = await res[0]["name"]["common"];
        let population = await res[0]['population'];
        if (population == '0') {
          return name + ' is uninhabited';
        } else {
           return 'There are ' + population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' inhabitants in ' + name;
        }
      }
    }
  },
  getCountryCurrencies: async (result) => {
    if (result == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result;
      let res = await getCountry(country.replace(/ /g,"%20"));
      if (res["status"] == '404') {
        return 'I\'m sorry, I don\'t know the currency used in ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + '. Maybe ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + ' does not exist.';		
      } else {
        let name = await res[0]["name"]["common"];
        if (res[0].hasOwnProperty('currencies')) {
          let currencies = await res[0]['currencies'];
          let currencyList = []
          for (let currencyCode in currencies) {
            let currency = currencies[currencyCode];
            let currencyName = currency.name;
            let currencySymbol = currency.symbol;
            currencyList.push({code:currencyCode, name: currencyName, symbol: currencySymbol});
          }
          if (currencyList.length == 0) {
            return name + ' doesn\'t have any official currency.';
          } else {
            let currencyInfo = "";
            for(let i = 0; i < currencyList.length; i++) {
              currencyInfo += currencyList[i].name + " (" + currencyList[i].symbol + ") ";
            }
            if (currencyList.length == 1) {
              return 'The official currency used in ' + name + ' is ' + currencyInfo;
            } else {
              return 'The official currencies used in ' + name + ' are ' + currencyInfo;
            }	
          }
        } else {
          return name + ' doesn\'t have any official currency.';
        }
      }
    }
  },
  getCountryCapitalCity: async (result) => {
    if (result == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result;
      let res = await getCountry(country.replace(/ /g,"%20"));
      if (res["status"] == '404') {
        return 'I\'m sorry, I don\'t know the capital city of ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + '. Maybe ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + ' does not exist.';		
      } else {
        let name = await res[0]["name"]["common"];
        if (res[0].hasOwnProperty('capital')) {
          let capital = await res[0]['capital'];
          let capitalList = Object.keys(capital);
          if (capitalList.length == 1) {
            return 'The capital city of ' + name + ' is ' + capital;
          } else {
            return 'The capital cities of ' + name + ' are ' + capital.join(', ');
          }
        } else {
          return name + ' doesn\'t have any official capital city.';
        }
      }
    }
  },
  getCountryTopLevelDomain: async (result) => {
    if (result == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result;
      let res = await getCountry(country.replace(/ /g,"%20"));
      if (res["status"] == '404') {
        return 'I\'m sorry, I don\'t know the top-level domain(s) of ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + '. Maybe ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + ' does not exist.';		
      } else {
        let name = await res[0]["name"]["common"];
        if (res[0].hasOwnProperty('tld')) {
          let tld = await res[0]['tld'];
          let tldList = Object.keys(tld);
          if (tldList.length == 1) {
            return 'The top-level domain of ' + name + ' is ' + tld;
          } else {
            return 'The top-level domains of ' + name + ' are ' + tld.join(', ');
          }
        } else {
          return name + ' doesn\'t have any official top-level domain.';
        }
      }
    }
  },
  getCountryLanguages: async (result) => {
    if (result == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result;
      let res = await getCountry(country.replace(/ /g,"%20"));
      if (res["status"] == '404') {
        return 'I\'m sorry, I don\'t know the official language(s) of ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + '. Maybe ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + ' does not exist.';		
      } else {
        let name = await res[0]["name"]["common"];
        if (res[0].hasOwnProperty('languages')) {
          let languages = await res[0]['languages'];
          let languageList = []
          for (let languageCode in languages) {
            let language = languages[languageCode];
            let languageName = language;
            languageList.push({name: languageName});
          }
          if (languageList.length == 0) {
            return name + ' doesn\'t have any official language.';
          } else {
            let languageInfo = "";
            for(let i = 0; i < languageList.length; i++) {
              languageInfo += languageList[i].name + ", ";
            }
            if (languageList.length == 1) {
              return 'The official language used in ' + name + ' is : ' + languageInfo;
            } else {
              return 'The official languages used in ' + name + ' are : ' + languageInfo;
            }	
          }
        } else {
          return name + ' doesn\'t have any official language.';
        }
      }
    }
  },
  getCountryFlag: async (result) => {
    if (result == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result;
      let res = await getCountry(country.replace(/ /g,"%20"));
      if (res["status"] == '404') {
        return 'I\'m sorry, I don\'t know ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + '\'s flag. Maybe ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + ' does not exist.';
      } else {
        let flag = await res[0]['flags']['png'];
        return flag;
      }
    }
  },
  getCountryCoatOfArms: async (result) => {
    if (result == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result;
      let res = await getCountry(country.replace(/ /g,"%20"));
      if (res["status"] == '404') {
        return 'I\'m sorry, I don\'t know ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + '\'s flag. Maybe ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + ' does not exist.';
      } else {
        let coa = await res[0]['coatOfArms']['png'];
        return coa;
      }
    }
  },
};

module.exports = utils;