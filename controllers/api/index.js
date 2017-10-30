const _async = require("async");
const funcs = require("../../lib/Funcs");
const fs = require("fs");
const formidable = require('formidable');
const request = require("request");
const path = require("path");
const DB = require('../../models/DB.js');
const config = require("config");
const QRcode = require('qrcode');
const async = require('async');
//环境变量
const env = process.env.NODE_ENV;
//格式化返回值
let resJson = funcs.resJson


module.exports = (router) => {
    
};