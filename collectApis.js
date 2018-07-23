
const fs = require('fs');
const os = require('os')

const xlsx = require('node-xlsx');

const ostype = os.type(),
    pathSplitString = ostype === 'Linux' ? '/' : '\\',
    dirString = ostype === 'Linux' ? '/../app/' : '\\..\\app\\';


var ApisCollections = [];
const SearchRouteFiles = (dir) => {
    fs.readdirSync(dir).forEach(sdir => {
        if(fs.statSync(dir + pathSplitString + sdir).isDirectory()){
            SearchRouteFiles(dir + pathSplitString + sdir);
        }else{
            sdir.endsWith(".js") && ApisCollections.push(dir + pathSplitString + sdir);
        }
    });
};
const Collecting = (filePathArr) => {
    
    let ApisData = [{
        name: '系统Api接口表',
        data: [
            ["请求类型", "请求地址", "请求描述"]
        ]
    }];
    filePathArr && filePathArr.forEach(filePath => {
        require(filePath).forEach(row => {
            ApisData[0].data.push(
                [row.Method, row.Url, row.Desc]
            );
        });
    });
    let fileExis = fs.existsSync(__dirname + pathSplitString + 'ApisTable.xls');
    fileExis && fs.unlink(__dirname + pathSplitString + 'ApisTable.xls');

    let apibuffer = xlsx.build(ApisData);
    fs.writeFile("." + pathSplitString + "ApisTable.xls", apibuffer, (err) => {
        if (err) throw err;
        console.log('Write to xls has finished');
    });
};

SearchRouteFiles(__dirname + pathSplitString + 'app' + pathSplitString + 'Controllers');
setTimeout(() => {
    Collecting(ApisCollections); 
}, 300);