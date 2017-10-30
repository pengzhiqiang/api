const request = require('request');

module.exports = {
    PortalRequestGet: (options, callback) => {
        request(options, (err, responce, body) => {
            if (!err) {
                return callback(err, body);
            } else {
                console.log(err);
            }
        });
    },
    PortalRequestPost: (options, callback) => {
        request.post(options, (err, responce, body) => {
            if (!err) {
                return callback(err, body);
            } else {
                console.log(err);
            }
        });
    },
    advancedRequestHanddle: (options, advOpts, callback) => {
        let r = request.post(options, (err, responce, body) => {
            if (!err) {
                callback(err, body);
            } else {
                console.log(err);
            }
        })
        let form = r.form();
        form.append(advOpts[0], advOpts[1]);
    }
};
