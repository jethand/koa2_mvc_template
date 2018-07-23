
const Variable = require('../../../config/Variable');
const Constant = require('../../../config/Constant');

const request = require('request');
class GroupModel{
    constructor(){

    }
    fetchGroupList(params){
        return new Promise(resolve => {
            const URL = 'http://' + Variable.USER_MANAGER_HOST + ':' +Variable.USER_MANAGER_PORT + Constant.USER_MANAGER_GROUP_URL  + '/all?pagenum=' + params.pageNow + '&pagesize=' + params.pageSize;
            request(URL, (ERROR, response, body) => {
                resolve(body);
            });
        });
    }
    fetchGroupInfoByNameID(groupKey){
        return new Promise(resolve => {
            const URL = 'http://' + Variable.USER_MANAGER_HOST + ':' +Variable.USER_MANAGER_PORT + Constant.USER_MANAGER_GROUP_URL  + '/' + groupKey;
            request(URL, (ERROR, response, body) => {
                let responseBody = JSON.parse(body);
                if(responseBody["ldap-error-message"] === "ERROR"){
                    responseBody = {}
                }
                resolve(responseBody);
            });
        })       
    }
    async operateGroup(ctx, httpConfig){
        switch(httpConfig.Method){
            case "post":
                return await this.createGroup(ctx, httpConfig);
                break;
            case "put":
                let result = await this.updateGroup(ctx, httpConfig);
                return result
                break;
            case "delete":
                return await this.deleteGroup(ctx, httpConfig);
                break;
        }
    }
    createGroup(ctx, httpConfig){
        new Promise(resolve => {
            request({
                url: httpConfig.URL,
                method: httpConfig.Method,
                body: httpConfig.Data
            }, (ERROR, response, body) => {
                resolve(body); 
            });
        });
    }
    updateGroup(ctx, httpConfig){
        return new Promise(resolve => {
            request({
                url: httpConfig.URL,
                method: httpConfig.Method,
                body: httpConfig.Data
            }, (ERROR, response, body) => {
                resolve(body); 
            });
        });
    }
    deleteGroup(ctx, httpConfig){
        return new Promise(resolve => {
            request({
                url: httpConfig.URL,
                method: httpConfig.Method
            }, (ERROR, response, body) => {
                resolve(body); 
            });
        });
    }
    fetchUserListByGroupID(params){
        const URL = 'http://' + Variable.USER_MANAGER_HOST + ':' +Variable.USER_MANAGER_PORT + Constant.USER_MANAGER_ACCOUNTS_URL  + '?gid=' + params.groupID + '&pagenum=' + params.pageNow + '&pagesize=' + params.pageSize;
        return new Promise(resolve => {
            request(URL, (ERROR, response, body) => {
                resolve(JSON.parse(body));
            });
        });
    }
}
module.exports = GroupModel;