const fs             = require('fs');
const path           = require('path');
const config         = require("config");
const _path          = path.resolve(process.cwd());
const env            = process.env.NODE_ENV;



//dust模板工具
module.exports = {
    //格式化时间，只显示日期
    cutTime: function(chunk, context, bodies, params) {
        let value = params.value;
        let timeDay = value.split(" ");
        chunk.write(timeDay[0]);
    },
    //内容匹配
    ifString: function(chunk, context, bodies, params) {
        if (params.key == params.value) {
            chunk.write(params.if);
        } else {
            chunk.write(params.else);
        }
    }

};
