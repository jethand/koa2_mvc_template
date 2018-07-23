
// Models
const ResourceModel = require('../../../Models/DataModel/ResourceModel/HiveResourceModel');

// Configs
const Pagination = require('../../../../config/Pagination');
const Permission = require('../../../../config/Permissions');

// Instance
var resourceModel = new ResourceModel();

// Functions
const CreateHiveResource = async (ctx, next) => {
    const postParams = ctx.request.body.resource;
    let permissionParams = Object.assign({}, Permission["HIVE"].grantParams, {setting: Permission["HIVE"].setting}, {content: postParams.content});
    // 1. search the exist resource in mysql
    let hiveList = await resourceModel.checkUserHivePermissions(postParams.content, permissionParams);
    if(hiveList.permissions.length !== 0){
        ctx.body = "Already Have Permissions";
        return
    }

    // 2. check have hdfs write permission
    let hdfsList = await resourceModel.checkUserHDFSPermissions('HDFS', postParams.path, "WRITE", "security");
    if(hdfsList.Response.authResult === false){
        ctx.body = "Do Not Have " + postParams.content + " Write Permissions";
        return
    }

    // 3. check dir  exist
    let dirExist = await resourceModel.dirExist(postParams.path);
    if(dirExist.data === false){
        ctx.body = "Do Not Have " + postParams.content + " Dir";
        return
    }

    // 3. check group exist
    /* let groupInfo = await resourceModel.fetchGroupInfoByNameID(postParams.owner);
    if(JSON.stringify(groupInfo) === '{}'){
        ctx.body = "ERROR";
        return
    } */

    // 4. check database exist
    let hiveDBs = await resourceModel.hiveDbExist(postParams.content);
    /* if(hiveDBs.indexOf(postParams.content) > -1){
        ctx.body = "DB：'" + postParams.content + "' Is Exist";
        return
    } */

    // 5. create database 
    let createResult = await resourceModel.createHiveDB(postParams);
};   


// Routers
module.exports = [
    {
        Method: 'post',
        Url: '/v1/resource/hive/create',
        Controller: CreateHiveResource,
        Desc: '分配HIVE资源'
    }
]