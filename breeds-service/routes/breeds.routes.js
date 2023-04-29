const { Router } = require('express');

const BreedsController = require('../controllers/breeds.controller');
const breedsController = new BreedsController();

const router = Router();

router.get('/', breedsController.getBreeds);
router.get('/average/:searchFilter', breedsController.getAverageLifeExpectancyByCountryOrigin);
router.get('/breedTypeAndBreedAccredited/:breedType/:breedAccredited', breedsController.getBreedByBreedTypeAndBreedAccredited);

module.exports = router;