// const { gambits } = require('./gambits.js');

const gambits = [
	{ 
		'trigger' : /(.*[0-9])[*](.*[0-9])/,
	  'output'  : ['^getMultiplication']
	},
	{ 
		'trigger' : /(.*[0-9])[\/](.*[0-9])/,
	  'output'  : ['^getDivision']
	},
	{ 
		'trigger' : /(.*[0-9])[+| + ](.*[0-9])/,
	  'output'  : ['^getAddition']
	},
	{ 
		'trigger' : /(.*[0-9])[-](.*[0-9])/,
	  'output'  : ['^getSoustraction']
	},
	{ 
		'trigger' : /(.*[0-9])[^](.*[0-9])/,
	  'output'  : ['^getPuissance']
	},
	{ 
		'trigger' : /(.*[0-9])[²]/,
	  'output'  : ['^getSquare']
	},
];

let utils = {
  random: function (min, max) {
  	return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	getMultiplication: function (result) {
		const x = parseFloat(result[1]);
		const y = parseFloat(result[2]);
		return (x * y) + '\n';
	},
	getDivision: function (result) {
		const x = parseFloat(result[1]);
		const y = parseFloat(result[2]);
		return (x / y) + '\n';
	},
	getAddition: function (result) {
		const x = parseFloat(result[1]);
		const y = parseFloat(result[2]);
		return (x + y) + '\n';
	},
	getSoustraction: function (result) {
		const x = parseFloat(result[1]);
		const y = parseFloat(result[2]);
		return (x - y) + '\n';
	},
	getSquare: function (result) {
		const x = parseFloat(result[1]);
		return (x * x) + '\n';
	},
	getPuissance: function (result) {
		const x = parseFloat(result[1]);
		const y = parseFloat(result[2]);
		return (Math.pow(x, y)) + '\n';
	}
}

function addUserMessage() {
  let chat = document.querySelector('#wrapperChat');
  let inputMessage = document.querySelector('#inputMessage');

  let p = document.createElement('p');
  let pText = document.createTextNode(inputMessage.value);
  p.appendChild(pText);

  p.classList.add('blockChatUser', 'blockChat')

  chat.appendChild(p);
	chat.scrollTop = chat.scrollHeight;
}

async function addBobbyMessage() {
  let found = false;
  let chat = document.querySelector('#wrapperChat');
  let messageUser = document.querySelector('#inputMessage');
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

let textarea = document.getElementById("inputMessage");

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