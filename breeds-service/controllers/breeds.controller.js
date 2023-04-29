const needle = require('needle');

const { successfullyResponse, unsuccessfulResponse } = require('../helpers/data.helpers');

const Breeds = require('../models/breeds.model');

module.exports = class BreedsController{
    getBreeds(req, res) {
        const breeds = new Breeds();
        const allRecords = breeds.findAll();

        if (typeof allRecords === 'undefined' || allRecords === null) {
            return res.status(404).json(unsuccessfulResponse({
                message: 'Lo sentimos. No hemos encontrado registro alguno',
                microservice: 'Breeds service'
            }));
        }

        return res.status(200).send(successfullyResponse({
            microservice: 'Breeds',
            data: allRecords
        }));
    }

    getBreedById(req, res) {
        const { searchFilter } = req.params;

        const breeds = new Breeds();
        const oneBreed = breeds.findOne('id', searchFilter);

        if (typeof oneBreed === 'undefined' || oneBreed === null) {
            return res.status(404).json(unsuccessfulResponse({
                message: 'Lo sentimos. No hemos encontrado algún registro que coincida con el parámetro establecido',
                microservice: 'Breeds service'
            }));
        }

        return res.status(200).send(successfullyResponse({
            microservice: 'Breeds service',
            data: oneBreed
        }));
    }
}