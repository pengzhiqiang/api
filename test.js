var request = require("request");

// var token = "dVRA1oN4uJ4p4YhnHY0rpcKZ_Tc2qzsQQbYGHNmSHjUxymhyGg19IK69K973WFBcW2zXZuMkH6qv_Po460CeaG0tQFNth2U9RQd5O1SVmSoGNRdABAZGK";

// request.post({
//     url: 'https://api.weixin.qq.com/card/qrcode/create?access_token=' + token,
//     headers: {
//         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MicroMessenger/6.5.12 NetType/WIFI Language/zh_CN"
//     },
//     json: {
//         "action_name": "QR_CARD",
//         "action_info": {
//             "card": {
//                 "card_id": "pbkvQwT7q2wwED3oMuASgwX72s7c",
//                 "openid": "obkvQwZt5QiCzTskRpLE9WKo9ySo"
//             }
//         }
//     }
// }, function(err, res, body) {
//     if (!err) {
//         console.log(body);
//     } else {
//         console.log(err);
//     }
// });

// request.post({
//     //卡券列表
//     //url: 'https://api.weixin.qq.com/card/batchget?access_token=' + token,
//     //门店列表
//     url:"https://api.weixin.qq.com/card/location/batchget?access_token="+token,
//     headers: {
//         'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MicroMessenger/6.5.12 NetType/WIFI Language/zh_CN"
//     },
//     json: {
//         "offset": 0,
//         "count": 20
//     }
// }, function(err, res, body) {
//     if (!err) {
//         console.log(body);
//     } else {
//         console.log(err);
//     }
// });



// request({
//     url: "https://api.weixin.qq.com/card/getapplyprotocol?access_token="+token,
//
// }, (err, res, body) => {
//     if (!err) {
//         console.log(body);
//     } else {
//         console.log(err);
//     }
// });



//获取券详情
// request.post({
//     url: "https://api.weixin.qq.com/card/get?access_token="+token,
//     // headers: {
//     //     'User-Agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 MicroMessenger/6.5.12 NetType/WIFI Language/zh_CN"
//     // },
//     json:{
//         card_id:"pbkvQwT7q2wwED3oMuASgwX72s7c"
//     }
// }, function(err, res, body) {
//     if (!err) {
//         console.log(body);
//     } else {
//         console.log(err);
//     }
// });


request.get('http://law.junzejun.com/ApiSearch.dll?ShowSearchResult?Db=chl&xiaoli_id=XA01&txt_xiaoli_id=%B7%A8%C2%C9',(err,results)=>{
    console.log(results.body)
})


// request.post({
// 	url: "https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=" + token,
// 	json:{
// 		scene:"1060"
// 	}
// },function(err,res,body){
// 	console.log(body)
// })