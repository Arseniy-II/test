/**
 * Return flatt object
 *
 * @param {Object} object
 * @returns {Object}
 */
const flattenObject = (object) => {
    const toReturn = {};

    for (const key in object) {
        if (!object.hasOwnProperty(key)) {
            continue;
        }

        if ((typeof object[key]) === 'object') {
            const flatObject = flattenObject(object[key]);
            for (const x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) {
                    continue;
                }

                toReturn[key + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[key] = object[key];
        }
    }
    return toReturn;
};

export default flattenObject;
