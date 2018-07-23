
module.exports = function(sequelize, DataTypes){
    return sequelize.define('data_resource_owner', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        content:{
            type: DataTypes.INTEGER
        },
        comment:{
            type: DataTypes.INTEGER
        },
        owner:{
            type: DataTypes.INTEGER
        },
        create_time: {
            type: DataTypes.DATE
        },
        last_modify: {
            type: DataTypes.DATE
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
}