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