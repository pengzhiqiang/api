//初始化数据库

const DB = require('../models/DB.js');


//DO NOT DROP TABLE IF EXISTS BY {force:false}
for (let i in DB) {
	let _this = DB[i]()
	_this.sync({
		force: true
	}).then(() => {
		return _this.create().then((results)=>{results.destroy()});
	})
}

