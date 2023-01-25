/** gambits */
const gambits = [
	{ 
    'trigger' : /(.+)\s(?:fullname|full name|official name)/i,
	  'output'  : ['^getCountryFullName']
	},
	{
    'trigger' : /(?:fullname|full name|official name)\s(.+)/i,
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
        res = await utils[func](result);
        if (res != 'undefined') {console.log('>', res); }
      } else {
        console.log(output + '\n')
      }
      break;
    }

    if(!found){
      res = "Je n'ai pas compris \n";
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