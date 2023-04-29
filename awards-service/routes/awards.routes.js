const { Router } = require('express');

const router = Router();

const needle = require('needle');

const database = require('better-sqlite3')('database/awards.db');

const { successfullyResponse, unsuccessfulResponse } = require('../helpers/data.helpers');

router.get('/award/:id', async (req, res) => {
    const { id } = req.params;

    const temporaryArray = []
    const temporaryObject= {};

    const oneAward = database.prepare('SELECT * FROM campeonatos WHERE id = ?').get(id);
    temporaryObject['campeonato'] = oneAward;

    const id_campeon = oneAward['id_campeon'];

    const oneDog = await needle(`http://localhost:4000/api/v1/dogs/${id_campeon}`);
    temporaryObject['perro'] = oneDog.body.data;

    temporaryArray.push(temporaryObject);
    console.log(temporaryArray)

    return res.status(200).send(successfullyResponse({
        microservice: 'Breeds service',
        extraDetail: `Campeonato: ${oneAward['categoria_ganada']} y perro: ${oneDog['nombre_perro']}`,
        data: temporaryArray
    }));
});

router.get('/owner/:searchFilter', async (req, res) => {

});

module.exports = router;