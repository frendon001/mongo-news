module.exports = function(app){

		// Our model controllers (rather than routes)
		var application = require('./routes/application');


		app.use('/', application);

		//other routes..
}