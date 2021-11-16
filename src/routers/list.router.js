const express = require('express');
const router = express.Router();
const listController = require('../controllers/list.controller');
const Cache = require('./routeCache');


/* to get all the coountries and its corresponding values */
router.get('/getAllCountries', Cache(300), listController.getAllCountries);

/* api created to import data to the database */
router.post('/upload-data-to-db', listController.uploadDataToDB);

/* parameter api*/
router.post('/get-inventory-data', Cache(300), listController.getGasInventoryData);

/* api to get status of the cache */
router.get('/stats', Cache.stats)
module.exports = router;