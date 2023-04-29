const findAll = (awards) => { return awards; }

const findSome = (awards, searchFilter) => {
    return awards.filter((object) => {
        return Object.keys(object).some((key) => {
            return object[key].toString() === searchFilter;
        });
    });
}

const findOne = (awards, targetKey, searchFilter) => {
    return awards.find((object) => {
        return object[targetKey].toString() === searchFilter
    });
}

module.exports = {
    findAll,
    findSome,
    findOne
}