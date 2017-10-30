const DB = require('../models/DB.js');
//商户表
let Merchant = DB.Merchant();
//活动表
let Activity = DB.Activity();
//卡券列表
let Cardlist = DB.Cardlist();


Merchant.hasMany(Cardlist,{forginKey:"m_id"})
Cardlist.hasMany(Merchant,{forginKey:"m_id"})

console.log(666)