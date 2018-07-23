
const moment = require("moment");
const Variable = require('../../../config/Variable');
const Constant = require('../../../config/Constant');

class GroupService{
    constructor(){

    }
    operateGroup(ctx){
        let httpConfig = {};
        switch(ctx.request.method){
            case 'POST':
                httpConfig = {
                    Method: 'post',
                    URL: "http://" + Variable.USER_MANAGER_HOST + ":" + Variable.USER_MANAGER_PORT + Constant.USER_MANAGER_GROUP_URL + '?currentuser=admin',
                    Data: JSON.stringify({
                        "group": {
                            "group-name": ctx.request.body.groupName,
                            "group-desc": ctx.request.body.groupDesc,
                            "creation-user": "admin",
                            "creation-date": moment().format("YYYYMMDDHHMM00"),
                            "enabled": true
                        }
                    })
                };
                break;
            case "PUT":
                httpConfig = {
                    Method: 'put',
                    URL: "http://" + Variable.USER_MANAGER_HOST + ":" + Variable.USER_MANAGER_PORT + Constant.USER_MANAGER_GROUP_URL + "/" + ctx.params.ID +'?currentuser=admin',
                    Data: JSON.stringify({
                        "group": {
                            "group-name": ctx.request.body.groupName,
                            "group-desc": ctx.request.body.groupDesc,
                            "update-user": "admin",
                            "update-date": moment().format("YYYYMMDDHHMM00"),
                            "enabled": true
                        }
                    })
                };
                break;
            case "DELETE":
                httpConfig = {
                    Method: 'delete',
                    URL: "http://" + Variable.USER_MANAGER_HOST + ":" + Variable.USER_MANAGER_PORT + Constant.USER_MANAGER_GROUP_URL + "/" + ctx.params.ID +'?currentuser=admin'
                };
            break;
        }
        return httpConfig
    }
}

module.exports = GroupService;