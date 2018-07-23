
const fs = require('fs');
const path = require('path');
const os = require('os')


const InitRoutes = (router, mapping) => {
    mapping.forEach(conf => {
        router[conf.Method](conf.Url, conf.Controller);
    })
};
const FetchCtrlByDirPath = (router, dir) => {
    const ostype = os.type(),
        pathSplitString = ostype === 'Linux' ? '/' : '\\',
        dirString = ostype === 'Linux' ? '/../app/' : '\\..\\app\\';

    const readdirloopSync = (dir) => {
        fs.readdirSync(dir).forEach(sdir => {
            if(fs.statSync(dir + pathSplitString + sdir).isDirectory()){
                readdirloopSync(dir + pathSplitString + sdir);
            }else{
                console.log(`process controller: ${sdir}...`);
                sdir.endsWith(".js") && InitRoutes(router, require(dir + pathSplitString + sdir))
            }
        });
    };
    readdirloopSync(__dirname + dirString + dir);
};

module.exports = function(dir){
    const controllerDir = dir || 'Controllers',
          router = require('koa-router')();
    FetchCtrlByDirPath(router, controllerDir);
    return router.routes();
};