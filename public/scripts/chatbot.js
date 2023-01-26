/** gambits */
const gambits = [
  {
    'trigger' : /^(Hello|Hi|Hey|Greetings|Yo|What's up|Salutations)(,|!)?/i,
	  'output'  : ['Hey bro! What\'s up?']
  },
  {
    'trigger' : /^(Goodbye|Bye|See you|Catch you later|Talk to you later|Farewell)(,|!)?/i,
	  'output'  : ['Hey Bro! See you later, have a nice day!']
  },
	{ 
    'trigger' : /(Let's go)(,|!)?/i,
	  'output'  : ['Leeeeeeeet\'s goooooo!!']
	},
  { 
    'trigger' : /(Help)(,|!)?/i,
	  'output'  : ['How can I help you today? I can find you several information about countries around the world like the full name of a country, its French name, the continents of the country, its population, its currency... Write "BobbyCommand" and I will show you examples of commands you can write to get information about countries.']
	},
  { 
    'trigger' : /(BobbyCommand)(,|!)?/i,
	  'output'  : ['For fullname of country you can write : `full name [country]` |||||| For french name you can write : `[country] french name` |||||| For know the continent of country : `[country] continent` |||||| For population of country : `[country] population`']
	},
	{
    'trigger' : /(?:fullname|full name|official name)\s(.+)/i,
	  'output'  : ['^getCountryFullName']
	},
	{
    'trigger' : /(.+)\s(?:fullname|full name|official name)/i,
	  'output'  : ['^getCountryFullName']
	},
	{ 
    'trigger' : /(.+)\s(?:french)/i,
	  'output'  : ['^getCountryFrenchName']
	},
	{ 
    'trigger' : /(.+)\s(?:continent)/i,
	  'output'  : ['^getCountryContinent']
	},
	{ 
    'trigger' : /(.+)\s(?:population|pop)/i,
	  'output'  : ['^getCountryPopulation']
	},
	{ 
    'trigger' : /(.+)\s(?:currency|money|\$)/i,
	  'output'  : ['^getCountryCurrencies']
	},
	{ 
    'trigger' : /(.+)\s(?:capital)/i,
	  'output'  : ['^getCountryCapitalCity']
	},
	{ 
    'trigger' : /(.+)\s(?:tld)/i,
	  'output'  : ['^getCountryTopLevelDomain']
	},
	{ 
    'trigger' : /(.+)\s(?:language|languages)/i,
	  'output'  : ['^getCountryLanguages']
	},
	{ 
    'trigger' : /(.+)\s(?:flag)/i,
	  'output'  : ['^getCountryFlag']
	},
	{ 
    'trigger' : /(.+)\s(?:coat)/i,
	  'output'  : ['^getCountryCoatOfArms']
	},
];
/** End gambits */

let utils = {
  random: function (min, max) {
  	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	getCountryFullName: async (result) => {
    if (result[1] == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result[1];
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
    if (result[1] == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result[1];
      let res = await getCountry(country.replace(/ /g,"%20"));
      if (res["status"] == '404') {
        return 'I\'m sorry, I don\'t know the name of ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + 'in French. Maybe ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + ' does not exist.';
      } else {
        let name = await res[0]["name"]["common"];
        let frenchName = await res[0]['translations']['fra']['common'];
        return name + '\'s name in French is ' + frenchName;
	    }
	  }
	},
	getCountryContinent: async (result) => {
    if (result[1] == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result[1];
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
    if (result[1] == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result[1];
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
    if (result[1] == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result[1];
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
							return 'The official currency used in ' + name + ' is : ' + currencyInfo;
						} else {
							return 'The official currencies used in ' + name + ' are : ' + currencyInfo;
						}	
					}
				} else {
					return name + ' doesn\'t have any official currency.';
				}
			}
		}
	},
	getCountryCapitalCity: async (result) => {
    if (result[1] == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result[1];
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
    if (result[1] == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result[1];
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
    if (result[1] == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result[1];
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
    if (result[1] == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result[1];
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
    if (result[1] == 'undefined') {
      return 'Sorry, I don\'t understand.';
    } else {
      let country = result[1];
      let res = await getCountry(country.replace(/ /g,"%20"));
      if (res["status"] == '404') {
        return 'I\'m sorry, I don\'t know ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + '\'s flag. Maybe ' + country.charAt(0).toUpperCase()+country.slice(1).toLowerCase() + ' does not exist.';
      } else {
        let coa = await res[0]['coatOfArms']['png'];
				return coa;
	    }
	  }
	},
}

async function getCountry(countryName) {
  const url = "https://restcountries.com/v3.1/name/" + countryName;
  let response = await fetch(url);
  return await response.json();
}

function addUserMessage() {
  let chat = document.querySelector('#wrapperChat');
  let textarea = document.querySelector('#textarea');

  let p = document.createElement('p');
  let pText = document.createTextNode(textarea.value);
  p.appendChild(pText);

  p.classList.add('blockChatUser', 'blockChat')

  chat.appendChild(p);
	chat.scrollTop = chat.scrollHeight;
  textarea.style.height = '24px';
}

async function addBobbyMessage() {
  let found = false;
  let chat = document.querySelector('#wrapperChat');
  let messageUser = document.querySelector('#textarea');
  let res;

  for(gambit of gambits) {
    let result = messageUser.value.match(gambit.trigger);

    if (result != null) {
      // let index = utils.random(0, gambit['output'].lenght - 1);
      let output = gambit['output'][0];
      found = true;

      if (output[0] == '^') {
        let func = output.substring(1);
				if (output == '^getCountryFlag') {
					let func = output.substring(1);
					// create image from flag url
					flagUrl = await utils[func](result);
					let flagImg = document.createElement('img');
					flagImg.src = flagUrl;
					flagImg.width = 200;
					document.querySelector('#wrapperChat').appendChild(flagImg)
					
					// create message with country name
					let country = result[1];
					let r = await getCountry(country.replace(/ /g,"%20"));
					let name = await r[0]["name"]["common"];
					res = "This is " + name + "'s flag";
				} else if (output == '^getCountryCoatOfArms') {
					let func = output.substring(1);
					// create image from coat of arms url
					coaUrl = await utils[func](result);
					let coaImg = document.createElement('img');
					coaImg.src = coaUrl;
					coaImg.width = 150;
					
					// create message with country name
					let country = result[1];
					let r = await getCountry(country.replace(/ /g,"%20"));
					let name = await r[0]["name"]["common"];
					res = "This is " + name + "'s coat of arms";

					// check if country has coat of arms
					if (r[0]['coatOfArms'].hasOwnProperty('png')) {
						document.querySelector('#wrapperChat').appendChild(coaImg)
						res = "This is " + name + "'s coat of arms";
					} else {
						res = name + ' seems to have no coat of arms.';
					}
				} else {
        res = await utils[func](result);
				}
      } else {
        res = output;
      }
      break;
    }

    if(!found){
      res = "I don't understand, sorry.";
    }
  }

  let p = document.createElement('p');
  let pText = document.createTextNode(res);
  p.appendChild(pText);

  p.classList.add('blockChatBobby', 'blockChat')

  chat.appendChild(p);
	chat.scrollTop = chat.scrollHeight;

  messageUser.value = "";
}

function chatMessage() {
  addUserMessage();
  addBobbyMessage();
}

let textarea = document.getElementById("textarea");

textarea.addEventListener("keydown", (event) => {
	const keyname = event.key;
	if (keyname === 'Enter' && !event.shiftKey) {
		event.preventDefault();
		chatMessage();
	}
})

textarea.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
});

let themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('click', function () {
  let wrapperBody = document.getElementById("wrapperBody");
  let sun = document.getElementById("sun");
  let moon = document.getElementById("moon");

  wrapperBody.classList.toggle('dark-theme');
  wrapperBody.classList.toggle('light-theme');

  if (wrapperBody.classList.contains('dark-theme')) {
    moon.classList.add('display-none');
    sun.classList.remove('display-none');
  } else if (wrapperBody.classList.contains('light-theme')) {
    sun.classList.add('display-none');
    moon.classList.remove('display-none');
  }
});