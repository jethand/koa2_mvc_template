
const UserModel = require('../../Models/AccountModel/UserModel');

var userModel = new UserModel();


const CreateUser = (ctx, next) => {
    return new Promise((resolve) => {
        userModel.createUser(ctx).then(result => {
            ctx.body = result;
            resolve(next());
        });
    });
};   

module.exports = [
    {
        Method: 'post',
        Url: '/v1/account/user/create',
        Controller: CreateUser,
        Desc: '创建用户'
    }
]