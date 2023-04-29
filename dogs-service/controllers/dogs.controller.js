const { successfullyResponse, unsuccessfulResponse } = require('../helpers/data.helpers');

const Dogs = require('../models/dogs.model');
const needle = require('needle');

module.exports = class DogsController{
    getDogs(req, res) {
        const dogs = new Dogs();
        const allRecords = dogs.findAll();

        if (typeof allRecords === 'undefined' || allRecords === null) {
            return res.status(404).json(unsuccessfulResponse({
                message: 'Lo sentimos. No hemos encontrado registro alguno',
                microservice: 'Dogs service'
            }));
        }

        return res.status(200).send(successfullyResponse({
            microservice: 'Dogs',
            data: allRecords
        }));
    }

    async getDogByOwner(req, res) {
        const { searchFilter } = req.params;

        const dogs = new Dogs();
        const someDogs = dogs.findSome('pais_origen_dueno', searchFilter);

        const temporaryArray = [];
        const temporaryObject = {};
    
        temporaryObject['perros'] = someDogs;

        if (typeof someDogs === 'undefined' || someDogs === null) {
            return res.status(404).json(unsuccessfulResponse({
                message: 'Lo sentimos. No hemos encontrado algún registro que coincida con el parámetro establecido',
                microservice: 'Dogs service'
            }));
        }

        const breedsToSearch = someDogs.map((dog) => dog['raza']);
        const breedsClean = new Set(breedsToSearch);

        for (let breed of breedsClean) {
            temporaryArray.push((await needle(`http://localhost:3000/api/v1/breeds/${breed}`)).body.data)
        }

        temporaryArray.push(temporaryObject);

        for (let dog of someDogs) {
            const campeon = (await needle(`http://localhost:5000/api/v1/awards/${dog['Id']}`)).body.data;
            console.log(campeon)
            temporaryArray.push(campeon)
        }

        return res.status(200).send(successfullyResponse({
            microservice: 'Dogs service',
            data: await temporaryArray
        }));
    }
}