
const Constant = require('../../../config/Constant');
const Variable = require('../../../config/Variable');
const Functions = require('../../Utils/Funtions');

const request = require("request");
var HDFS = require('../ResourceService/HDFSResourceService');

var functions = new Functions();
class ResourceService extends HDFS{

    constructor(){
        super();
        this.URL = "http://" + Variable.SECURITY_CENTER_HOST + ":" + Variable.SECURITY_CENTER_PORT;
    }
    checkUserPermissions(user, permissionParams){
        const URL = this.URL + Constant.CHECK_USER_PERMISSION_URL;
        let permissionCopy = functions.deepCopy(permissionParams);
        permissionCopy.setting.join(",");
        let postParams = {
            "userName": user,
            "permissions": [permissionCopy]
        };
        return new Promise(resolve => {
            request.post(URL, {body: JSON.stringify(postParams)}, (ERROR, response, body) => {
                resolve(JSON.parse(body));
            });
        });
    }
    checkByTypeAndContentAndoperate(type, content, operation, userName){
        const URL = this.URL + Constant.AUTH_USER_PERMISSION_URL;
        let postParams = {
            "permission-check": {
                type,
                clusterName: Constant.CLUSTER_NAME,
                content,
                userName,
                operation
            }
        };
        return new Promise(resolve => {
            request.post(URL, {body: JSON.stringify(postParams)}, (ERROR, response, body) => {
                resolve(JSON.parse(body));
            });
        });
    }
    addUserPermissions(user, groupID, permissionParams){
        const URL = this.URL + Constant.ADD_USER_PERMISSION_URL;
        let permissionCopy = functions.deepCopy(permissionParams);
        let postParams = {
            "user-permission": {
                "userName": user,
                "groupId": groupID,
                "permissions": [permissionCopy]
            }
        };
        return new Promise(resolve => {
            request.post(URL, {body: JSON.stringify(postParams)}, (ERROR, response, body) => {
                resolve(JSON.parse(body));
            });
        });
    }
}

module.exports = ResourceService;