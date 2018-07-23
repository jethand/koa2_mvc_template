
/**USER MANAGER**/
const USER_MANAGER_GROUP_URL = '/ldapGroup/group';
const USER_MANAGER_ACCOUNTS_URL  = '/ldapAccount/accounts';

/**DATA MANAGER**/
const NICE_HDFS_EXISTS_URL = "/nice/nc/hdfs/path/exists";
const NICE_TOKEN = 'NiceJobManager';
const NICE_HDFS_MKDIR_URL = "/nice/nc/hdfs/mkdir";
const NICE_HDFS_SET_QUOTA_URL = "/nice/nc/hdfs/setQuota";
const AUTH_USER_PERMISSION_URL = '/permission/auth';

/**CONFIG**/
const CLUSTER_NAME = 'hdp';

// +----------------------------------------------------------------------
// | 权限中心
// +----------------------------------------------------------------------
const CHECK_USER_PERMISSION_URL = "/permission/check";
const ADD_USER_PERMISSION_URL = "/user/grantpermission";

module.exports = {
    USER_MANAGER_GROUP_URL,
    USER_MANAGER_ACCOUNTS_URL,
    NICE_HDFS_EXISTS_URL,
    NICE_TOKEN,
    NICE_HDFS_MKDIR_URL,
    NICE_HDFS_SET_QUOTA_URL,
    CLUSTER_NAME,
    CHECK_USER_PERMISSION_URL,
    ADD_USER_PERMISSION_URL,
    AUTH_USER_PERMISSION_URL
};