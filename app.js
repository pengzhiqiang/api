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

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const viewCache = process.env.NODE_ENV == 'production'? true : config.get('cacheConfig.viewCache');
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(enrouten({directory: 'controllers'}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
});

// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
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
