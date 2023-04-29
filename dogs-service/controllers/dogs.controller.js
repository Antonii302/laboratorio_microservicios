const { successfullyResponse, unsuccessfulResponse } = require('../helpers/data.helpers');

const Dogs = require('../models/dogs.model');

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

    getDogByOwner(req, res) {
        const { searchFilter } = req.params;

        const dogs = new Dogs();
        const oneDog = dogs.findSome('pais_origen_dueno', searchFilter);

        if (typeof oneDog === 'undefined' || oneDog === null) {
            return res.status(404).json(unsuccessfulResponse({
                message: 'Lo sentimos. No hemos encontrado algún registro que coincida con el parámetro establecido',
                microservice: 'Dogs service'
            }));
        }

        return res.status(200).send(successfullyResponse({
            microservice: 'Dogs service',
            data: oneDog
        }));
    }
}