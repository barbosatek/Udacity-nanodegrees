export const mapArrayToObject = (arr, key) => {
    var obj = {};

    for (let item of arr) {
        if(obj[item[key]]){
            throw new Error("Property already exists");
        }

        obj[item[key]] = item;
    }

    return obj;
}

export const mapObjectToArray = (obj) => {
    var keys = Object.keys(obj);
    var arr = [];
    var i = 0

    for (i = 0; i < keys.length; i++) { 
        arr[i] = obj[keys[i]]
    }

    return arr;
}