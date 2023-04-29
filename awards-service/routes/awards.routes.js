const { Router } = require('express');

const sqlite3 = require('sqlite3').verbose();

const router = Router();

const { findAll } = require('../models/awards.model');
const { successfullyResponse, unsuccessfulResponse } = require('../helpers/data.helpers');

const db = new sqlite3.Database('database/awards.db');

const awards = [];

db.all("SELECT * FROM campeonatos", (err, rows) => {
    if (!err) {
        rows.forEach((row) => awards.push(row));
    }
});    

console.log(awards)

router.get('/', (req, res) => {
    const allRecords = findAll(awards);

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
});

module.exports = router;