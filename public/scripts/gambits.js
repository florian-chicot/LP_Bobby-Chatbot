const gambits = [
	{ 
		'trigger' : /salut|bonjour|hello|hi\s*(.*)/,
	  'output'  : ['Salut!', 'Bonjour', 'Yo !']
	},
	{ 
		'trigger' : /(comment\s?)?[c]a\sva/,
	  'output'  : ['Je vais bien merci', 'Très bien et vous ?']
	},
	{ 
		'trigger' : /date|jour/,
	  'output'  : ['^getDate']
	},
	{
		'trigger': /(?:météo|meteo|quel temps à ?)\s(.+)/,
		'output':['^getWeather']
	},
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

module.exports = {gambits};