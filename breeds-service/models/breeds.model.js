const fileSystem = require('fs');
const path = require('path');

const { request, response } = require('express');

module.exports = class Breeds {
    breeds = [];

    constructor() {
        this.converCsvFileJsonData();
    }

    findAll() { return this.breeds; }

    findSome(targetKey, searchFilter) {
        return this.breeds.filter((object) => {
            return object[targetKey].toString() === searchFilter;
        });
    }

    findOne(targetKey, searchFilter) {
        return this.breeds.find((object) => {
            return object[targetKey].toString() === searchFilter
        });
    }

    converCsvFileJsonData() {
        const csvFile = '../database/raza_info.csv';
        const pathToCsvFile = path.join(__dirname, csvFile);
        
        const document = fileSystem.readFileSync(pathToCsvFile, { encoding: 'utf-8' });
        const documentLines = document.trim().split('\n');

        const objectKeys = documentLines.shift().split(',');

        documentLines.forEach((documentLine) => {
            const temporaryObject = {};

            const objectValues = documentLine.split(',');
            for (let i = 0; i < objectKeys.length; i++) {
                temporaryObject[objectKeys[i]] = objectValues[i];
            }

            this.breeds.push(temporaryObject);
        });
    }
}