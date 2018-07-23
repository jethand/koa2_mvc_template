
const md5 = require('js-md5');
const Constant = require('../../../config/Constant');
class NiceService{

    constructor(){

    }
    getCookie(){
        let groupName = 'system',
            userName = 'security',
            isAdmin = 'true';
        const token =  md5(userName + groupName + Constant.NICE_TOKEN).toUpperCase();

        const cookie = 'UserName=' + userName + ';UserGroup=' + groupName + ';ProjectAccount=' + userName + ';Token=' + token + ';isAdmin=' + isAdmin;
        return cookie
    }
}
module.exports = NiceService;