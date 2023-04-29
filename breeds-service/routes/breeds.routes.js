const { Router } = require('express');

const BreedsController = require('../controllers/breeds.controller');
const breedsController = new BreedsController();

const router = Router();

router.get('/', breedsController.getBreeds);
router.get('/:searchFilter', breedsController.getBreedById);

module.exports = router;