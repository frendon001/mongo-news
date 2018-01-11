var express = require('express');
var router  = express.Router();

var application_controller = require('../controllers/scrape_controller');


router.get('/techcrunch', application_controller.techcrunch);
router.get('/hackernews', application_controller.hackernews);
router.get('/hackernoon', application_controller.hackernoon);

module.exports = router;