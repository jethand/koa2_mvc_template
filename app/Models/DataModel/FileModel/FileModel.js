
// Services
const PermissionService = require('../../../Service/PermissionService/PermissionService');

//Config
const Permission = require('../../../../config/Permissions');


class FileModel{
    constructor(){
        this.permissionService = new PermissionService();
    }
    checkResourcePermission(user, content){
        let permissionParams = Object.assign({}, Permission["HDFS"].grantParams, {setting: Permission["HDFS"].setting}, {content});
        return new Promise(resolve => {
            this.permissionService.checkUserPermissions(user, permissionParams).then(result => {
                resolve(result);
            });
        });
    }
}

module.exports = FileModel;