const r = require("./webRequest.js");
const _ = require("lodash");
const f = require("../lib/Funcs");
let baseUrl = 'http://law.junzejun.com';

module.exports = {
	//模拟登陆
	login: (opts, callback) => {
		let method = "GET";
		let options = {};
		let defaultParams = {
			path: "/vip_login/CheckLogin.ashx"
		};
		let url = baseUrl + defaultParams.path;
		options.url = url;
		options = _.merge(opts, options);
		r.callApis(method, options, callback);
	},

	//拉取目录
	getIndex: (opts, callback) => {
		console.log(opts);
		let method = "GET";
		let options = {
			encoding: null,
			host: '139.224.18.1',
			port: '8088',
			headers: {
				'user-agent': f.randomUA()
			}
		};
		if (opts.qs) {
			let queryString = '';
			for (let i in opts.qs) {
				queryString += i + '=' + opts.qs[i] + '&';
			}
			let defaultParams = {
				path: "/ApiSearch.dll?" + queryString
			};
			let url = baseUrl + defaultParams.path;
			options.url = url;
			r.callApis(method, options, callback);
		} else {
			console.log('queryString参数错误');
		}
	},

	//测试
	test: (opts, callback) => {
		let method = "GET";
		let options = {};
		let defaultParams = {
			path: ""
		};
		let url = baseUrl + defaultParams.path;
		options.url = url;
		options = _.merge(opts, options);
		r.callApis(method, options, callback);
	}
}