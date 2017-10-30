const spiderService = require('./portalService.js');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');

spiderService.getIndex({
	qs: {
		"ShowSearchResult?Db": "chl",
		"Page": 2,
		"PageSize": 20,
		"zaiyao": "on",
		"zaiyaonum": 0,
		"extend": 0,
		"orderby": 0
	}
}, (err, results) => {
	let resBody = iconv.decode(results, 'gb2312').toString();
	let $ = cheerio.load(resBody);
	let script = $("script")[7].children[0].data;

	eval(script+"console.log(m_LibRecList[0][0])");
});