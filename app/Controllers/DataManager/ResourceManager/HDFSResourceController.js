
// Models
const ResourceModel = require('../../../Models/DataModel/ResourceModel/HDFSResourceModel');

// Configs
const Pagination = require('../../../../config/Pagination');
const Permission = require('../../../../config/Permissions');

// Instance
var resourceModel = new ResourceModel();


// Functions
const CreateHDFSResource = async (ctx, next) => {
    const postParams = ctx.request.body.resource;
    let permissionParams = Object.assign({}, Permission["HDFS"].grantParams, {setting: Permission["HDFS"].setting}, {content: postParams.content});
    // 1. search the exist resource in mysql
    let HDFSList = await resourceModel.fetchHDFSListByContent(postParams.content);
    if(HDFSList.length !== 0){
        ctx.body = "SUCCESS";
        return
    }

    // 2. check group exist
    let groupInfo = await resourceModel.fetchGroupInfoByNameID(postParams.owner);
    if(JSON.stringify(groupInfo) === '{}'){
        ctx.body = "ERROR";
        return
    }

    // 3. check resource exist
    let dirExist = await resourceModel.dirExist(postParams.content);
    /* if(dirExist.data){
        ctx.body = "DIR EXIST";
        return
    } */
    
    // 4. mkdir HDFS 
    let mkdirInfo = await resourceModel.mkdir(postParams.content);
    if(mkdirInfo.errorCode !== 0){
        ctx.body = "mkdir FAIL";
        return
    }

    // 5. Set quota for HDFS file
    let setQuotaInfo = await resourceModel.setQuota(postParams.content, 50);
    if(setQuotaInfo.errorCode !== 0){
        ctx.body = "SET QUOTA FAIL"; // SHOULE DELETE DIR
        return
    }

    
    // 6. Search GroupSecurityUsers
    let userListParams = {
        groupID: groupInfo["group"]["group-id"],
        pageNow: 1,
        pageSize: 9999
    };
    let groupUsers = await resourceModel.fetchUserListByGroupID(userListParams);

    
    let groupSecurityUsers = [];
    groupUsers.accounts && groupUsers.accounts.forEach(userInfo => {
        if(userInfo.isGroupSecurity === "true"){
            groupSecurityUsers.push(userInfo["user-en"]);
            groupSecurityUsers && groupSecurityUsers.forEach(async user => {
                // 7. check user permissions exist
                let userPermissions = await resourceModel.checkUserPermissions(user, permissionParams);
                if(userPermissions.permissions.length === 0){
                    // 8. add user permission
                    let addUserPermissionResult = await resourceModel.addUserPermissions(user, groupID, permissionParams);
                }
            });
        }
    });
};   


// Routers
module.exports = [
    {
        Method: 'post',
        Url: '/v1/resource/hdfs/create',
        Controller: CreateHDFSResource,
        Desc: '分配HDFS资源'
    }
]