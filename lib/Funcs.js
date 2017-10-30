const WebRequest = require("./WebRequest");
const crypto = require("crypto");
const fs = require("fs");


module.exports = {
    //调用API
    callApis: (options, callback) => {
        if (options.form || options.json) {
            WebRequest.PortalRequestPost(options, callback);
        } else {
            WebRequest.PortalRequestGet(options, callback);
        }
    },

    //调用特殊Api
    callAdvApis: (options, advOpts, callback) => {
        WebRequest.advancedRequestHanddle(options, advOpts, callback);
    },

    //微信POST方式提交
    callWxApisPost: (options, callback) => {
        WebRequest.PortalRequestPost(options, callback);
    },

    //MD5
    MD5: (string) => {
        return crypto.createHash('md5').update(string).digest('hex');
    },
    //SHA1
    SHA1: (string) => {
        return crypto.createHash('sha1').update(string).digest('hex');
    },

    //写入文件
    WriteFile: (string) => {
        fs.writeFile('tryApi.txt', string, (err) => {
            if (!err) {
                console.log('写入成功');
            }
        });
    },

    //返回JSON
    resJson: (code, message, data) => {
        return {
            code,
            message,
            data
        }
    },

    //生成随机字符串
    createRandomStr: (len) => {
        let strBase = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomStr = '';
        for (let i = 0; i < len; i++) {
            let index = Math.floor(Math.random() * 52);
            let strBaseArr = strBase.split("");
            if (strBaseArr[index]) {
                randomStr += strBaseArr[index]
            } else {
                randomStr += 0
            }
        }
        return randomStr;
    },

    //

}