
/**
 * 
 * @param {JSON} obj1 first JSON Object
 * @param {JSON} obj2 second JSON Object
 * @returns {Boolean} returns true or false comparing all the values. return false if json nesting is greater than 1
 */
export const isJSONEqual = (obj1, obj2) => {
    var flag = true;

    if (Object.keys(obj1).length === Object.keys(obj2).length) {
        for (let key in obj1) {
            if (obj1[key] === obj2[key]) {
                continue;
            }
            else {
                flag = false;
                break;
            }
        }
    }
    else {
        flag = false;
    }
    return flag;
}