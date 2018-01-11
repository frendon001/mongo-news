var express = require('express');
var router  = express.Router();

var application_controller = require('../controllers/application_controller');

router.get('/', application_controller.index);

router.get('/saved', application_controller.saved);

router.get('/scrape/techcrunch', application_controller.techcrunch);
router.get('/scrape/hackernews', application_controller.hackernews);
router.get('/scrape/hackernoon', application_controller.hackernoon);

module.exports = router;