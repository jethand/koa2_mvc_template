

const Sequelize = require('sequelize')
const color  = require('cli-color');
const mysql = {
    type: 'mysql',
    database: 'db_yuntu',
    username: 'bigplorer',
    password: '1qaz!QAZ',
    host: 'xx.xx.xx.8',
    port: 3306 
};

const sequelize = new Sequelize(mysql.database, mysql.username, mysql.password, {
    host: mysql.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    timezone: '+08:00'
});
sequelize.authenticate().then(function(){
    console.log(color.magentaBright("connect mysql success!"));
}).catch(function(err) {
    throw err;
});
exports.sequelize = sequelize;
exports.Sequelize = Sequelize;