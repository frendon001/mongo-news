var express = require('express');
var router  = express.Router();

var application_controller = require('../controllers/application_controller');
var news_controller = require('../controllers/news_controller');

router.get('/', application_controller.index);

router.get('/saved', application_controller.saved);

router.post('/NewsItem', news_controller.saveNews);
router.get('/News', news_controller.getSavedNews);
router.put('/removeSaved', news_controller.removeSavedItem);
router.get('/NewsItem/viewNotes/:id?', news_controller.viewNotes);
router.put('/NewsItem/removeNote', news_controller.removeNote);
router.put('/NewsItem/addNote', news_controller.addNote);


module.exports = router;