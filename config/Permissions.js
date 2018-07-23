
const Constant = require('./Constant');
const Permissions = {
    HDFS: {
        grantParams: {
            "type": "HDFS",
            "clusterName": Constant.CLUSTER_NAME,
            "wb": 0
        },
        setting: ["READ", "WRITE", "EXECUTE"]
    },
    HIVE: {
        grantParams: {
            "type": "HIVE",
            "clusterName": Constant.CLUSTER_NAME,
            "wb": 0
        },
        setting: ["DELETE", "INSERT", "SHOW_DATABASE", "SELECT", "UPDATE", "CREATE", "DROP", "ALTER", "INDEX", "LOCK"]
    }
};
module.exports = Permissions;