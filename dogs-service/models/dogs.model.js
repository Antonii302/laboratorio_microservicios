const fileSystem = require('fs');
const path = require('path');

const { request, response } = require('express');

module.exports = class Breeds {
    dogs = [];

    constructor() {
        this.converJSONFileArrayData();
    }

    findAll() { return this.dogs; }

    findSome(targetKey, searchFilter) {
        return this.dogs.filter((object) => {
            console.log(object[targetKey], object, targetKey)
            return object[targetKey].toString() === searchFilter;
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