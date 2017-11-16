var request = require('request')

request.get({
	url:"http://www.hcgjzs.com/portal.php?x=366172",
	host: '139.224.18.1',
	port: '8088',
},(err,results)=>{
	console.log(results)
});