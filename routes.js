module.exports = function(app){

		// Our model controllers (rather than routes)
		var application = require('./routes/application');
		var scrape = require('./routes/scrape');


		app.use('/', application);
		app.use('/scrape', scrape);

		//other routes..
}