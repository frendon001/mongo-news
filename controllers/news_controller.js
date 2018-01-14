var News = require('../models/News');

exports.getSavedNews = function(req, res) {
  News
    .find()
    .then(function(dbNews) {
      res.json(dbNews);
    });
};

exports.saveNews = function(req, res) {

  var newsItem = new News(req.body);

  newsItem.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.json({ status: "Success" });
    }
  });
};


exports.removeSavedItem = function(req, res) {

  News.find({ _id: req.body.id }).remove().exec(function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      res.json({ _id: req.body.id });
    }
  });
};

exports.viewNotes = function(req, res) {
  News
    .find({ _id: req.params.id })
    .then(function(dbNewsNotes) {
      if (dbNewsNotes[0]) {
        res.json(dbNewsNotes[0].notes);
      }

    });
};


exports.removeNote = function(req, res) {

  News.findOneAndUpdate({ _id: req.body.id }, { $pull: { notes: req.body.note } })
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.json({ _id: req.body.id });
      }
    });
};

exports.addNote = function(req, res) {


  News.findOneAndUpdate({ _id: req.body.id }, { $push: { notes: req.body.note } })
    .exec(function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        res.json({ _id: req.body.id });
      }
    });
};