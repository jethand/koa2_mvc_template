
const FileModel = require('../../../Models/DataModel/FileModel/FileModel');


var fileModel = new FileModel();



const FetchHDFSList = async (ctx, next) => {
    let requestParams = ctx.request.body;
    // 1. Check HDFS Permissions
    let permissionList = await fileModel.checkResourcePermission('tsq_su', requestParams.resource.path);

    // 2. 很尴尬，thrift木有
    console.log(permissionList.permissions);
    ctx.body = 'xxx';
    return
};   

module.exports = [
    {
        Method: 'post',
        Url: '/v1/resource/hdfs/list',
        Controller: FetchHDFSList,
        Desc: '获取HDFS资源列表'
    }
]