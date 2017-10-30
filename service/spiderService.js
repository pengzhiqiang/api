const spiderService = require('./portalService.js');
const f = require('../lib/Funcs');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const DB = require('../models/DB');

//所有数据库
let AllDbs = DB.AllDbs();

//目录表
let Index = DB.Index();

//更新数据库分类
function updateAllCatgory(){
	console.log('开始拉去数据');
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
		let art_list_arr

		eval(script+";art_list_arr=m_LibRecList[0][0]");

		//所有数据库列表：m_ShowLibList
		//每4个元素描述了一个数据库的信息
		let db = f.sliceArray(m_ShowLibList,4);
		//写入数据库信息
		console.log('开始写入');
		for(let i in db){
			//去重
			AllDbs.findOne({
				where:{
					value:db[i][0]
				}
			}).then((results)=>{
				if(results == null){
					AllDbs.create({
						db_name:db[i][2],
						value:db[i][0],
						count:db[i][3]
					}).then((results)=>{
						console.log("正在写入【"+db[i][2]+'】');
					}).catch((err)=>{
						console.log(err)
					});
				}
			});
			
		}
	});
}

//updateAllCatgory();


//更新文章目录
function updateCatlogs(dbname,count){
	let loop_times = count / 100;
	for(let i = 0;i<loop_times; i++){
		spiderService.getIndex({
			qs: {
				"ShowSearchResult?Db": dbname,
				"Page": i,
				"PageSize": 100,
				"zaiyao": "on",
				"zaiyaonum": 0,
				"extend": 0,
				"orderby": 0
			}
		}, (err, results) => {
			let resBody = iconv.decode(results, 'gb2312').toString();
			let $ = cheerio.load(resBody);
			let script = $("script")[7].children[0].data;
			if(script){
				let art_list_arr
				eval(script+";art_list_arr=m_LibRecList[0][0]");

				//写入数据库信息
				for(let i in art_list_arr){
					//去重
					Index.findOne({
						where:{
							article_id:art_list_arr[i][1]
						}
					}).then((results)=>{
						if(results == null){
							Index.create({
								local_id:art_list_arr[i][0],
								article_id:art_list_arr[i][1],
								title:art_list_arr[i][2],
								issued_num:art_list_arr[i][3],
								release_time:art_list_arr[i][4],
								availability_time:art_list_arr[i][5],
								level:art_list_arr[i][7]
							}).then((results)=>{
								console.log("正在写入【"+art_list_arr[i][2]+'】');
							}).catch((err)=>{
								console.log(err)
							});
						}
					});
					
				}
			}
			
		});
	}
}

updateCatlogs('chl',1000)

// //更新置顶数据库目录
// function updateEachDb(dbname){
// 	AllDbs.find({
// 		where:{
// 			value:dbname
// 		}
// 	}).then((results)=>{
// 		if(results != null){
// 			let count = results.count;
// 			updateCatlogs(dbname,count)
// 		}
// 	})
// }

// updateEachDb('chl');

