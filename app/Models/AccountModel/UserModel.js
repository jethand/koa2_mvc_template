
const moment = require("moment");
const Variable = require('../../../config/Variable');
const Constant = require('../../../config/Constant');

const request = require('request');

class UserModel{
    constructor(){

    }
    async createUser(ctx){
        let requestParams = JSON.stringify({
            "account": {
                "user-en": ctx.request.body.userEn,
                "user-name": ctx.request.body.userEn,
                "user-passwd": ctx.request.body.userPassword,
                "isAdmin": "false",
                "isSecurity": "false",
                "isAudit": "false",
                "isGroupAdmin": "false",
                "isGroupSecurity": "false",
                "group-id": ctx.request.body.groupId,
                "creation-user": "admin",
                "creation-date": moment().format("YYYYMMDDHHMM00"),
                "enabled": "true"
            }
        });
        return await new Promise(resolve => {
            request({
                url: "http://" + Variable.USER_MANAGER_HOST + ':' + Variable.USER_MANAGER_PORT + Constant.USER_MANAGER_ACCOUNTS_URL + '?currentuser=admin',
                method: "post",
                body: requestParams
            }, (ERROR, response, body) => {
                resolve(body); 
            });
        });
    }
    async fetchUserListByGroupID(ctx){
        let pageParams = ctx.query,
            groupID = ctx.params.ID;
        const URL = 'http://' + Variable.USER_MANAGER_HOST + ':' +Variable.USER_MANAGER_PORT + Constant.USER_MANAGER_ACCOUNTS_URL  + '?gid=' + groupID + '&pagenum=' + pageParams.pageNow + '&pagesize=' + pageParams.pageSize ;
        return await new Promise(resolve => {
            request(URL, (ERROR, response, body) => {
                resolve(body);
            });
        });
    }
}
module.exports = UserModel;