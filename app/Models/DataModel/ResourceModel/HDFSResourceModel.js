

// Models
const GroupModel = require('../../AccountModel/GroupModel');

// Services
const HDFSService = require('../../../Service/ResourceService/HDFSResourceService');
const PermissionService = require('../../../Service/PermissionService/PermissionService');

// Database
const HDFSSequelize = require('./DatabaseModel/HDFSModel');
const { sequelize, Sequelize} = require("../../../../config/Database");

// Instance

class ResourceModel{
    constructor(){
        this.HDFSService = new HDFSService();
        this.groupModel = new GroupModel();
        this.permissionService = new PermissionService();
    }
    fetchHDFSListByContent(content){
        return new Promise(resolve => {
            HDFSSequelize(sequelize, Sequelize).findAll({
                where: {
                    type: 'HDFS',
                    content
                }
            }).then(result => {
                resolve(result)
            });
        });
    }
    fetchGroupInfoByNameID(groupKey){
        return new Promise(resolve => {
            this.groupModel.fetchGroupInfoByNameID(groupKey).then(result => {
                resolve(result);
            });
        });
    }
    dirExist(dir){
        return new Promise(resolve => {
            this.HDFSService.dirExist(dir).then(result => {
                resolve(result);
            });
        });
    }
    mkdir(dir){
        return new Promise(resolve => {
            this.HDFSService.mkdir(dir).then(result => {
                resolve(result);
            });
        });
    }
    setQuota(dir, quota){
        return new Promise(resolve => {
            this.HDFSService.setQuotaForHDFS(dir, quota).then(result => {
                resolve(result);
            });
        });
    }
    fetchUserListByGroupID(params){
        return new Promise(resolve => {
            this.groupModel.fetchUserListByGroupID(params).then(result => {
                resolve(result);
            });
        });
    }
    checkUserPermissions(user, permissionParams){
        return new Promise(resolve => {
            this.permissionService.checkUserPermissions(user, permissionParams).then(result => {
                resolve(result);
            });
        });
    }
    addUserPermissions(user, groupID, permissionParams){
        return new Promise(resolve => {
            this.permissionService.addUserPermissions(user, groupID, permissionParams).then(result => {
                resolve(result);
            });
        });
    }
}

module.exports = ResourceModel;