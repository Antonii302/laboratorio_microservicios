const { successfullyResponse, unsuccessfulResponse } = require('../helpers/data.helpers');

const { connectToDatabase, findAll, findOne, findSome } = require('../models/awards.model');

module.exports = class AwardsController {
    async getAwards(req, res) {
        const allRecords = findAll(connectToDatabase);

        if (typeof allRecords === 'undefined' || allRecords === null) {
            return res.status(404).json(unsuccessfulResponse({
                message: 'Lo sentimos. No hemos encontrado registro alguno',
                microservice: 'Awards service'
            }));
        }

        return res.status(200).send(successfullyResponse({
            microservice: 'Awards',
            data: allRecords
        }));
    }
}