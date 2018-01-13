// Wait for DOM to load.
$(function() {

  scrapeAllSites();

  $(".scrape-new").on("click", function(event) {

    scrapeAllSites();
  });

  function scrapeAllSites() {
    // scrape from techcrunch
    $.ajax("/scrape/techcrunch", {
        type: "GET"
      }).done(function(response) {
        //add scraped data to webpage
        addNewsData(response.newsItems, "#techCrunchCollapse");
      })
      .fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
      });


    // scrape from harkernews (YCombinator)
    $.ajax("/scrape/hackernews", {
        type: "GET"
      }).done(function(response) {
        //add scraped data to webpage
        addNewsData(response.newsItems, "#hackerNewsCollapse");
      })
      .fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
      });


    // scrape from hackernoon
    $.ajax("/scrape/hackernoon", {
        type: "GET"
      }).done(function(response) {
        //add scraped data to webpage
        addNewsData(response.newsItems, "#hackernoonCollapse");
      })
      .fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
      });
  }


  function addNewsData(newsDataArr, sectionID) {

    var newsSection = $(sectionID);

    //empty the news data from section
    newsSection.empty();

    var newsArticle;
    var newsTitle;
    var newsSaveBtn;
    newsDataArr.forEach(function(newsItem) {
      newsSection.append("<div class='card-body news-item'>" +
        "<div class='row justify-content-center'>" +
        "<div class='col-6 col-sm-8 col-md-9 col-lg-10 align-self-center'>" +
        "<a target='_blank' href='" + newsItem.link + "'>" + newsItem.title +
        "</a></div>" +
        "<div class='col-6 col-sm-4 col-md-3 col-lg-2 align-self-center text-right btn-save'><a class='btn btn-success'>Save Article</a></div></div></div>");
    });
  }

  // $("#add-burger").on("click", function(event) {
  //   // Make sure to preventDefault on a submit event.
  //   event.preventDefault();
  //   var burgerDate = moment().format("YYYY-MM-DD HH:mm:ss");;

  //   var newBurger = {
  //     name: $("#new-burger").val().trim(),
  //     devoured: false,
  //     date: burgerDate
  //   };

  //   // Send the POST request.
  //   $.ajax("/api/burgers", {
  //     type: "POST",
  //     data: newBurger
  //   }).then(
  //     function() {
  //       console.log("added new burger");
  //       // Reload the page to get the updated list
  //       location.reload();
  //     }
  //   );
  // });
});