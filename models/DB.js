const Sequelize = require("sequelize");
const _ = require("lodash");
const config = require("../config/default");
const db_host = config.db.host;
const db_user = config.db.user;
const db_pass = config.db.pass;
const db_name = config.db.name;
//数据库链接
const client = new Sequelize(db_name, db_user, db_pass, {
	host: db_host,
	dialect: "mysql",
	dialectOptions: {
		charset: 'utf8'
	},
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	timezone: "+08:00"
});

client.authenticate().then(() => {
	console.log("数据库连成功");
}).catch(err => {
	console.error("无法连接到数据库:", err);
});

/*
 *创建row属性
 *参数：rowAttr|Array
 *参数格式：[{name:id,type:string,bool:[...primaryKey]},{name:"user",type:"string"}]
 */
let createAttr = (rowAttr) => {
	let row = {}
	for (let len in rowAttr) {
		let temp = {}
		switch (rowAttr[len].type) {
			case "string":
				temp["type"] = Sequelize.STRING
				break;
			case "integer":
				temp["type"] = Sequelize.INTEGER
				break;
			case "float":
				temp["type"] = Sequelize.FLOAT
				break;
			case "text":
				temp["type"] = Sequelize.TEXT
				break;
			case "bool":
				temp["type"] = Sequelize.BOOLEAN
			default:
				temp["type"] = Sequelize.STRING
		}
		if (rowAttr[len].bool) {
			for (let i in rowAttr[len].bool) {
				temp[rowAttr[len].bool[i]] = true
			}
		}
		if (rowAttr[len].references) {
			temp["references"] = rowAttr[len].references
		}
		row[rowAttr[len].name] = temp
	}
	return row;
}


/*
 *创建表模型
 *参数：name|String,row|Object 
 */
let createModel = (name, attrs, opts) => {
	let options = {
		timestamps: false,
		charset: 'utf8',
		collate: 'utf8_general_ci'
	}
	options = _.merge(opts, options)
	let attributes = {}
	attributes = createAttr(attrs)
	return client.define(name, attributes, options);
}

/*
 *数据模型
 */
module.exports = {
	Index: () => {
		return createModel('ori_catlog', [{
			name: "id",
			type: "integer",
			bool: ['primaryKey', 'autoIncrement']
		}, {
			name: 'local_id',
			type: 'integer'
		}, {
			name: "article_id",
			type: 'integer'
		}, {
			name: 'title'
		}, {
			name: 'issued_num'
		}, {
			name: 'release_time'
		}, {
			name: 'availability_time'
		}, {
			name: 'level'
		}]);
	},
	AllDbs: () => {
		return createModel('ori_alldb', [{
			name: "id",
			type: "integer",
			bool: ['primaryKey', 'autoIncrement']
		}, {
			name: 'db_name'
		}, {
			name: 'value'
		}, {
			name: "count"
		}]);
	},
	Done: () => {
		return createModel('ori_done_page', [{
			name: 'id',
			type: 'integer',
			bool: ['primaryKey', 'autoIncrement']
		}, {
			name: 'db_name'
		}, {
			name: 'end_page'
		}]);
	},
	//中国法院裁判文书库
	FNL: () => {
		return createModel('ori_fnl', [{
			name: "id",
			type: "integer",
			bool: ['primaryKey', 'autoIncrement']
		}, {
			name: 'local_id',
			type: 'integer'
		},{
			name: "article_id",
			type: 'integer'
		},{
			name: 'title'
		},{
			name:'fayuan'
		},{
			name:'leibie'
		},{
			name:'riqi'
		}]);
	},

	//中国地方法律法规库
	LAR:()=>{
		return createModel('ori_lar', [{
			name: "id",
			type: "integer",
			bool: ['primaryKey', 'autoIncrement']
		}, {
			name: 'local_id',
			type: 'integer'
		}, {
			name: "article_id",
			type: 'integer'
		}, {
			name: 'title'
		}, {
			name: 'issued_num'
		}, {
			name: 'release_time'
		}, {
			name: 'availability_time'
		}, {
			name: 'availability',
		},{
			name: 'level'
		}]);
	},

	//合同范本库
	CON:()=>{
		return createModel('ori_con',[{
			name: "id",
			type: "integer",
			bool: ['primaryKey', 'autoIncrement']
		},{
			name: 'local_id',
			type: 'integer'
		},{
			name: "article_id",
			type: 'integer'
		},{
			name: 'title'
		},{
			name:'cate'
		}]);
	},

	//实务指南
	JIN:()=>{
		return createModel('ori_jin',[{
			name: "id",
			type: "integer",
			bool: ['primaryKey', 'autoIncrement']
		},{
			name: 'local_id',
			type: 'integer'
		},{
			name: "article_id",
			type: 'integer'
		},{
			name: 'title'
		},{
			name:'cate'
		}]);
	},

}