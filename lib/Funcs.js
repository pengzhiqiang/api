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

    //分割指定长度的数组
    sliceArray: (array, size) => {
        let result = [];
        for (let x = 0; x < Math.ceil(array.length / size); x++) {
            let start = x * size;
            let end = (x + 1) * size;
            result.push(array.slice(start, end));
        }
        return result;
    },

    //随机UA
    randomUA: () => {
        let UALib = [
            'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50',
            'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0',
            'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Maxthon 2.0)',
            'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; SE 2.X MetaSr 1.0; SE 2.X MetaSr 1.0; .NET CLR 2.0.50727; SE 2.X MetaSr 1.0)',
            'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5',
            'MQQBrowser/26 Mozilla/5.0 (Linux; U; Android 2.3.7; zh-cn; MB200 Build/GRJ22; CyanogenMod-7) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
        ];
        return UALib[Math.floor(Math.random() * 6)];
    }

}