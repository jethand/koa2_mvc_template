
const NiceService = require('../../Service/PublicService/NiceServices');
const Variable = require('../../../config/Variable');
const Constant = require('../../../config/Constant');

const request = require("request");

var niceService = new NiceService();

class HDFSResourceService{

    constructor(){
        this.url = this.openHDFS();
        this.cookie = niceService.getCookie();
    }   
    openHDFS(){
        return "http://" + Variable.NICE_SERVICE_HOST + ":" + Variable.NICE_SERVICE_PORT
    }
    dirExist(dir){
        const URL = this.url + Constant.NICE_HDFS_EXISTS_URL + '?path=hdfs://HACluster' + dir;
        return new Promise(resolve => {
            let options = {
                url: URL, 
                headers: {
                    Cookie: this.cookie
                }
            };
            request(options, (ERROR, response, body) => {
                resolve(JSON.parse(body));
            })
        });
    }
    mkdir(dir){
        const URL = this.url + Constant.NICE_HDFS_MKDIR_URL + '?path=hdfs://HACluster' + dir + '&owner=security&group=system';
        return new Promise(resolve => {
            let options = {
                method: 'post',
                url: URL, 
                headers: {
                    Cookie: this.cookie
                }
            };
            request(options, (ERROR, response, body) => {
                resolve(JSON.parse(body));
            })
        });
    }
    setQuotaForHDFS(path, quota){
        const URL = this.url + Constant.NICE_HDFS_SET_QUOTA_URL + '?path=hdfs://HACluster' + path + '&diskspacequota=' + quota;
        return new Promise(resolve => {
            let options = {
                method: 'post',
                url: URL, 
                headers: {
                    Cookie: this.cookie
                }
            };
            request(options, (ERROR, response, body) => {
                resolve(JSON.parse(body));
            })
        });
    }
    fetchHDFSList(dir){

    }
}

module.exports = HDFSResourceService;