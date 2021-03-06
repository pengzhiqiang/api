const spiderService = require('./portalService.js');
const f = require('../lib/Funcs');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const DB = require('../models/DB');
//所有数据库
let AllDbs = DB.AllDbs();
//目录表
let Index = DB.Index();
//已完成
let Done = DB.Done();
//中国法院裁判文书库
//let FNL = DB.FNL();

//中国地方法律法规库
//let LAR = DB.LAR();
//let CON = DB.CON();
let JIN = DB.JIN();

//随机访问时间
let rand_interval = Math.floor(Math.random() * 200) * 1000;



//更新数据库分类
function updateAllCatgory() {
	console.log('开始拉去数据');
	spiderService.getIndex({
		qs: {
			"ShowSearchResult?Db": "lar",
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

		eval(script + ";art_list_arr=m_LibRecList[0][0]");

		//所有数据库列表：m_ShowLibList
		//每4个元素描述了一个数据库的信息
		let db = f.sliceArray(m_ShowLibList, 4);
		//写入数据库信息
		console.log('开始写入');
		for (let i in db) {
			//去重
			AllDbs.findOne({
				where: {
					value: db[i][0]
				}
			}).then((results) => {
				if (results == null) {
					AllDbs.create({
						db_name: db[i][2],
						value: db[i][0],
						count: db[i][3]
					}).then((results) => {
						console.log("正在写入【" + db[i][2] + '】');
					}).catch((err) => {
						console.log(err)
					});
				}
			});

		}
	});
}

//updateAllCatgory();


//更新文章目录
function updateCatlogs(dbname, page) {
	spiderService.getIndex({
		qs: {
			"ShowSearchResult?Db": dbname,
			"Page": page,
			"PageSize": 50
		}
	}, (err, results) => {
		let resBody = iconv.decode(results, 'gb2312').toString();
		let $ = cheerio.load(resBody);
		let script = $("script")[7].children[0].data;
		if (script) {
			console.log(script)
			let art_list_arr
			eval(script + ";art_list_arr=m_LibRecList[0][0]");
			//写入数据库信息
			for (let i in art_list_arr) {
				//去重
				JIN.findOne({
					where: {
						article_id: art_list_arr[i][1]
					}
				}).then((results) => {	
					console.log(results)
					//(19,18195846,"海南省人大常委会公告第106号——确认吴川祝的代表资格有效的公告","海南省人民代表大会常务委员会公告第106号","2017.11.30","2017.11.30","01","XP10",0,0);
					if (results == null) {
						JIN.create({
							local_id: art_list_arr[i][0],
							article_id: art_list_arr[i][1],
							title: art_list_arr[i][2],
							cate: art_list_arr[i][3],
						}).then((results) => {
							console.log("正在写入【" + art_list_arr[i][2] + '】');
						}).catch((err) => {
							console.log(err)
						});
					}
				});
			}
		}
	});
}

//更新置顶数据库目录
function updateEachDb(dbname) {
	let cur_dbname = dbname;
	AllDbs.find({
		where: {
			value: dbname
		}
	}).then((results) => {
		if (results != null) {
			let count = results.count;
			let page = Math.ceil(count / 50);
			Done.find({
				where: {
					db_name: dbname
				}
			}).then((results) => {
				let cur_page = results.end_page;
				updateCatlogs(dbname, cur_page);
				Done.update({
					end_page: parseInt(cur_page) + 1
				}, {
					where: {
						db_name: dbname
					}
				}).then((ret) => {
					console.log(ret);
				});

				setTimeout(function() {
					updateEachDb(cur_dbname)
				}, 30000)
			});
		}
	})
}

updateEachDb("jin");