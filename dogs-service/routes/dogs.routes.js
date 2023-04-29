const { Router } = require('express');

const DogsController = require('../controllers/dogs.controller');
const dogsController = new DogsController();

const router = Router();

router.get('/', dogsController.getDogs);
router.get('/:searchFilter', dogsController.getDogById);

module.exports = router;