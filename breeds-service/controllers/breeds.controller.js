const needle = require('needle');

const { successfullyResponse, unsuccessfulResponse } = require('../helpers/data.helpers');

const Breeds = require('../models/breeds.model');

module.exports = class BreedsController{
    getBreed(req, res) {
        const { searchFilter } = req.params;

        const breeds = new Breeds();
        const oneRecord = breeds.findOne('raza', searchFilter);

        if (typeof oneRecord === 'undefined' || oneRecord === null) {
            return res.status(404).json(unsuccessfulResponse({
                message: 'Lo sentimos. No hemos encontrado algún registro que coincida con los parámetros de búsqueda',
                microservice: 'Breeds service'
            }));
        }

        return res.status(200).send(successfullyResponse({
            microservice: 'Breeds',
            data: oneRecord
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

    getAverageLifeExpectancyByCountryOrigin(req, res) {
        const { searchFilter } = req.params;

        const breeds = new Breeds();
        const someBreeds = breeds.findSome('pais_de_origen', searchFilter);

        if (typeof someBreeds === 'undefined' || someBreeds === null) {
            return res.status(404).json(unsuccessfulResponse({
                message: 'Lo sentimos. No hemos encontrado algún registro que coincida con el parámetro establecido',
                microservice: 'Breeds service'
            }));
        }

        const lifeExpectancies = someBreeds.map((breed) => parseInt(breed['expectativa_de_vida']));

        const sumOfLifeExpectancy = lifeExpectancies.reduce((accumulator, currentValue) => accumulator + currentValue);
        const averageOfLifeExpectancy = sumOfLifeExpectancy / lifeExpectancies.length;

        return res.status(200).send(successfullyResponse({
            microservice: 'Breeds service',
            extraDetail: 'Promedio de esperanza de vida por país de origen',
            data: averageOfLifeExpectancy + `, esperanza de vida en ${searchFilter}`
        }));
    }

    getBreedByBreedTypeAndBreedAccredited(req, res) {
        const { breedType, breedAccredited } = req.params;
        
        const breeds = new Breeds();
        breeds.breeds = breeds.findSome('tipo', breedType);

        const breedsByAccredited = breeds.findSome('acreditado', breedAccredited);

        return res.status(200).send(successfullyResponse({
            microservice: 'Breeds service',
            extraDetail: `Raza por tipo: ${breedType} y acreditado: ${breedAccredited}`,
            data: breedsByAccredited
        }));
    }
}