const Sequelize = require("sequelize");
const _ = require("lodash");
const config = require("config");
const db_host = config.get("db.host");
const db_user = config.get("db.user");
const db_pass = config.get("db.pass");
const db_name = config.get("db.name");


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
	console.log("Connection has been established successfully.");
}).catch(err => {
	console.error("Unable to connect to the database:", err);
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

	
}