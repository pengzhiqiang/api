const request = require('request');

module.exports = {
	callApis: (method, options, callback) => {
		if (method === 'GET') {
			request(options, (err, responce, body) => {
				if (!err) {
					return callback(err, body);
				} else {
					console.log(err);
				}
			});
		} else if (method === 'POST') {
			request.post(options, (err, responce, body) => {
				if (!err) {
					return callback(err, body);
				} else {
					console.log(err);
				}
			});
		}
	}
};