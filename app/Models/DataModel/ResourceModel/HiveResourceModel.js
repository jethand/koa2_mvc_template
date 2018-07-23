

// Models
const GroupModel = require('../../AccountModel/GroupModel');

// Services
const HDFSService = require('../../../Service/ResourceService/HDFSResourceService');
const PermissionService = require('../../../Service/PermissionService/PermissionService');

// Database
/* const HDFSSequelize = require('./DatabaseModel/HDFSModel'); */
const { sequelize, Sequelize} = require("../../../../config/Database");

// Const && Variable
const Constant = require('../../../../config/Constant');
const Variable = require('../../../../config/Variable');

// Request
const request = require('request');

class ResourceModel{
    constructor(){
        this.HDFSService = new HDFSService();
        this.groupModel = new GroupModel();
        this.permissionService = new PermissionService();
        this.MetricURL = 'http://' + Variable.HIVE_THRIFT_HOST + ':' + Variable.HIVE_THRIFT_PORT;
    }
    checkUserHivePermissions(user, permissionParams){
        return new Promise(resolve => {
            this.permissionService.checkUserPermissions(user, permissionParams).then(result => {
                resolve(result);
            });
        });
    }
    checkUserHDFSPermissions(type, content, operation, userName){
        return new Promise(resolve => {
            this.permissionService.checkByTypeAndContentAndoperate(type, content, operation, userName).then(result => {
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
    hiveDbExist(content){
        return new Promise(resolve => {
            request(this.MetricURL + '/hrift/hive/list', (ERROR, response, body) => {
                let result = [];
                body = JSON.parse(body);
                body && body.forEach(row => {
                    result.push(row[0]);
                });
                resolve(result);
            });
        });
    }
    createHiveDB(){
        return new Promise(resolve => {
            request.post(this.MetricURL + '/hrift/hive/create', (ERROR, response, body) => {
                resolve(body);
            });
        });
    }
}

module.exports = ResourceModel;