const sqlite3 = require('sqlite3').verbose();

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

const connectToDatabase = (() => {
    const db = new sqlite3.Database('database/awards.db');
    
    db.all("SELECT * FROM campeonatos", (err, rows) => {
        const awards = [];
        if (!err) {
            rows.forEach((row) => awards.push(row));
        }
        return awards;
    });
})()

module.exports = { 
    connectToDatabase,
    findAll,
    findSome,
    findOne
}