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
        
        const breed = new Breeds();
        const breedsByTpe = breed.findSome('tipo', breedType);

        console.log(breedsByTpe)

        const breedsByAccredited = [];

        breedsByTpe.forEach((breed) => {
            if (breed['acreditado'] === 'true') breedsByAccredited.push(breed);
            if (breed['acreditado'] === 'false')  breedsByAccredited.push(breed);;
            if (breed['acreditado'] === '-')  breedsByAccredited.push(breed);;
        });

        console.log(breedsByAccredited)

        return res.status(200).send(successfullyResponse({
            microservice: 'Breeds service',
            extraDetail: `Raza por tipo: ${breedType} y acreditado: ${breedAccredited}`,
            data: breedsByAccredited
        }));
    }
}