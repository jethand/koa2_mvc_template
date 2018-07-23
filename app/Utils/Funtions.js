

class Functions{
    constructor(){

    }
    deepCopy(target){
        return JSON.parse(JSON.stringify(target));
    }
}

module.exports = Functions;