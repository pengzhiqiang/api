const config = require("config");
const _async = require("async");
const funcs = require("../lib/Funcs");
const cache = require('memory-cache');

module.exports = (router) => {
	
	router.get('/', (req, res) => {
		res.send('API SERVICE');
	});
};