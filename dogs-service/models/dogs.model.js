const fileSystem = require('fs');
const path = require('path');

const { request, response } = require('express');

module.exports = class Breeds {
    dogs = [];

    constructor() {
        this.converJSONFileArrayData();
    }

    findAll() { return this.dogs; }

    findSome(searchFilter) {
        return this.dogs.filter((object) => {
            return Object.keys(object).some((key) => {
                return object[key].toString() === searchFilter;
            });
        });
    }

    findOne(targetKey, searchFilter) {
        return this.dogs.find((object) => {
            return object[targetKey].toString() === searchFilter
        });
    }

    converJSONFileArrayData() {
        const jsonFile = '../database/datos_perro.json';
        const pathToJSONFile = path.join(__dirname, jsonFile);
        
        const document = fileSystem.readFileSync(pathToJSONFile, { encoding: 'utf-8' });
        this.dogs = JSON.parse(document);
    }
}