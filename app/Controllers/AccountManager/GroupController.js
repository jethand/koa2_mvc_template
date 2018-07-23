
const GroupModel = require('../../Models/AccountModel/GroupModel'),
      GroupService = require('../../Service/AccountService/GroupService');

var groupModel = new GroupModel();
var groupService = new GroupService();


const OperateGroup = (ctx, next) => {
    return new Promise((resolve) => {
        let httpConfig = groupService.operateGroup(ctx);
        groupModel.operateGroup(ctx, httpConfig).then(result => {
            ctx.body = result;
            resolve(next());
        });
    });
};   
const FetchGroupList = async (ctx, next) => {

    let groupInfo = groupModel.fetchGroupList(ctx.query);

    /* return new Promise((resolve) => {
        groupModel.fetchGroupList(ctx).then(result => {
            ctx.body = JSON.parse(result);
            resolve(next());
        });
    }); */
};
const FetchGroupInfoByNameID = (ctx, next) => {
    return new Promise((resolve) => {
        let groupKey = ctx.params.query;
        groupModel.fetchGroupInfoByNameID(groupKey).then(result => {
            ctx.body = JSON.parse(result);
            resolve(next());
        });
    });
};

const FetchUserListByGroupID = (ctx, next) => {
    return new Promise((resolve) => {
        let params = {
            groupID: ctx.params.ID,
            pageNow: ctx.query.pageNow,
            pageSize: ctx.query.pageSize,
        };
        groupModel.fetchUserListByGroupID(params).then(result => {
            ctx.body = JSON.parse(result);
            resolve(next());
        });
    });
};
module.exports = [
    {
        Method: 'post',
        Url: '/v1/account/group/create',
        Controller: OperateGroup,
        Desc: '创建组'
    },
    {
        Method: 'put',
        Url: '/v1/account/group/:ID',
        Controller: OperateGroup,
        Desc: '修改组信息'
    },
    {
        Method: 'delete',
        Url: '/v1/account/group/:ID',
        Controller: OperateGroup,
        Desc: '删除组'
    },
    {
        Method: 'get',
        Url: '/v1/account/group/list',
        Controller: FetchGroupList,
        Desc: '获取群组列表'
    },
    {
        Method: 'get',
        Url: '/v1/account/group/info/:query',
        Controller: FetchGroupInfoByNameID,
        Desc: '通过组ID获取组信息'
    },
    {
        Method: 'get',
        Url: '/v1/account/group/userlist/:ID',
        Controller: FetchUserListByGroupID,
        Desc: '通过组ID获取用户列表'
    }
]