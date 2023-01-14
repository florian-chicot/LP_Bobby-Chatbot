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

module.exports = { gambits };