const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const app          = express();
const config       = require("config");
const enrouten     = require("express-enrouten");
const logger       = require('morgan');

//端口
process.env.PORT = config.get("server.port");
//日志
//const logs = require("./lib/Logs");
//工具库
const utils = require("./lib/Utils");
//模板引擎
const viewCache = process.env.NODE_ENV == 'production'? true : config.get('cacheConfig.viewCache');
const adaro = require('adaro');
app.engine('dust', adaro.dust({cache: false, whitespace: true, helpers: ['dustjs-helpers']}));
app.set('views', path.join(__dirname, 'public/templates'));
app.set('view engine', 'dust');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(enrouten({directory: 'controllers'}));


//全局方法
app.locals.tagcss = utils.tagcss;
app.locals.tagjs = utils.tagjs;
app.locals.cutTime = utils.cutTime;
app.locals.ifString = utils.ifString;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
});

// error handler
app.use(function(err, req, res, next) {
	console.log(err)
    res.status(err.status || 500);
    res.render('./error/index.dust',err);
});


const env = process.env.NODE_ENV || 'development';

console.dir('-'.repeat(34),{colors:true});
console.dir("|     ENV     | PORT | ViewCache |",{colors:true});
console.dir('-'.repeat(34),{colors:true});
console.dir(`| ${env} | ${config.get('server.port')} |   ${viewCache}   |`,{colors:true});
console.dir('-'.repeat(34),{colors:true});


module.exports = app;
