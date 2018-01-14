var News  = require('../models/News');

exports.getSavedNews = function(req, res) {
	News
  .find()
  .then(function(dbNews) {
    res.json(dbNews);
  });
};

exports.saveNews = function(req, res) {

  console.log(req.body);

  var newsItem = new News(req.body);

  newsItem.save(function(err) {
    if (err) {
      console.log(err);
    }
    else {
      res.json({ status: "Success" });
    }
  });
};


exports.removeSavedItem = function(req, res) {

  News.find({ _id: req.body.id }).remove().exec(function(err, doc) {
    if (err) {
      console.log(err);
    }
    else {
      res.json({ _id: req.body.id });
    }
  });
};