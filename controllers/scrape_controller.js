var request = require("request");
var cheerio = require("cheerio");


exports.techcrunch = function(req, res) {
	// Make a request call to grab the HTML body from the site
	request("https://techcrunch.com/", function(error, response, html) {

		console.log("scraping techcrunch");
		// Load the HTML into cheerio and save it to a variable
		var $ = cheerio.load(html);

		// An empty array to save the data
		var newsItems = [];

		// Select each element with an h2 tag and a post-title class
		$("h2.post-title").each(function(i, element) {

			var link = $(element).children().attr("href");
			var title = $(element).children().text();

			// If this found element had both a title and a link
			if (title && link) {
				// Save these results in newsItems
				newsItems.push({
					title: title,
					link: link
				});
			}

		});
		res.json({newsItems});
	});
};

exports.hackernews = function(req, res) {
	request("https://news.ycombinator.com/", function(error, response, html) {
		// Make a request call to grab the HTML body from the site
		var $ = cheerio.load(html);

		// An empty array to save the data
		var newsItems = [];

		// For each element with a "title" class
		$(".title").each(function(i, element) {
			// Save the text and href of each link enclosed in the current element
			var title = $(element).children("a").text();
			var link = $(element).children("a").attr("href");

			// If this found element had both a title and a link
			if (title && link) {
				// Save these results in newsItems
				newsItems.push({
					title: title,
					link: link
				});
			}

		});

		res.json({newsItems});
	});
};

exports.hackernoon = function(req, res) {
	// Make a request call to grab the HTML body from the site
	request("https://hackernoon.com/latest", function(error, response, html) {

		// Load the HTML into cheerio and save it to a variable
		var $ = cheerio.load(html);

		// An empty array to save the data
		var newsItems = [];

		// Select each element with an h2 tag and a post-title class
		$("div.postArticle-content").each(function(i, element) {

			var link = $(element).children().attr("href");
			var title = $(element).find("h3.graf--title").text();

			// If this found element had both a title and a link
			if (title && link) {
				// Save these results in newsItems
				newsItems.push({
					title: title,
					link: link
				});
			}

		});

		res.json({newsItems});

	});
};