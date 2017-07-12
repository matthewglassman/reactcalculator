const path = require('path'); //import NODE Path package module

//create our config object
const config = {
	entry: path.join(__dirname, '/client/index.js'),
	output: {
		path:  path.join(__dirname, './public/'), //path to output bundle
		filename: 'bundle.js' //output bundled file name 
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/, //RegEx to check for .js and .jsx files
				loader: 'babel-loader' //use these loaders to transpile above file types
			}
		]
	}
};
//export config object
module.exports = config;