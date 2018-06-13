export const mapArrayToObject = (arr, key) => {
    var obj = {};

    for (let item of arr) {
        obj[item[key]] = item;
    }

    return obj;
}