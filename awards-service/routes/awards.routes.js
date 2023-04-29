const { Router } = require('express');

const AwardsController = require('../controllers/awards.controller');
const awards = new AwardsController();

const router = Router();

router.get('/', awards.getAwards);

module.exports = router;