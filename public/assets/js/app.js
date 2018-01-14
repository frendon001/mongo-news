// Wait for DOM to load.
$(function() {


  //only run on home page
  if ($(".card").find("#techCrunchCollapse").length) {
    scrapeAllSites();
  }

    //only run on saved page
  if ($(".card").find("#savedNews").length) {
    getNews();
  }



  $(".scrape-new").on("click", function(event) {

    scrapeAllSites();
  });


  $(document).on("click", ".save", saveNewsItem);

  $(document).on("click", ".remove-article", removeItem);




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

    newsDataArr.forEach(function(newsItem) {
      newsSection.append("<div class='card-body news-item'>" +
        "<div class='row justify-content-center'>" +
        "<div class='col-6 col-sm-8 col-md-9 col-lg-10 align-self-center'>" +
        "<a target='_blank' href='" + newsItem.link + "'>" + newsItem.title +
        "</a></div>" +
        "<div class='col-6 col-sm-4 col-md-3 col-lg-2 align-self-center text-right btn-save'>" +
        "<a class='btn btn-success save' data-title='" + newsItem.title + "' data-link='" + newsItem.link +
        "' >Save Article</a></div></div></div>");
    });
  }

  function saveNewsItem() {
    var title = $(this).data("title");
    var link = $(this).data("link");

    var newsItemData = {
      title: title,
      link: link,
      comments: []
    };
    console.log(newsItemData);

    $.post("/NewsItem", newsItemData)
      .done(function(data) {
        console.log("Data Loaded: " + data);
      })
      .fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
      });

  }

  function getNews() {
    // retrieve saved items from database
    $.ajax("/News", {
        type: "GET"
      }).done(function(response) {
        //add scraped data to webpage
        addSavedNewsData(response, "#savedNews");
      })
      .fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
      });

  }

  function addSavedNewsData(newsDataArr, sectionID) {
    var savedNews = $(sectionID);
    //empty the news data from section
    savedNews.empty();

    newsDataArr.forEach(function(newsItem) {
      savedNews.append("<div class='card-body news-item'>" +
        "<div class='row justify-content-center'>" +
        "<div class='col-4 col-sm-6 col-lg-8 align-self-center'>" +
        "<a target='_blank' href='" + newsItem.link + "'>" + newsItem.title +
        "</a></div>" +
        "<div class='col-3 col-sm-3 col-lg-2 align-self-center text-right btn-save'>" +
        "<a class='btn btn-danger remove-article' data-id='" + newsItem._id +
        "' >Remove</a></div>" +
        "<div class='col-3 col-sm-3 col-lg-2 align-self-center text-right btn-save'>" +
        "<button class='btn btn-success add-comment' data-id='" + newsItem._id +
        "'  data-toggle='modal' data-target='#articleComments'>Comment</button></div></div></div>");
    });
  }

  function removeItem() {
    
    var removedItemId = $(this).data("id");

    // Send the PUT request.
    $.ajax("/removeSaved", {
      type: "PUT",
      data: {id: removedItemId}
    }).then(
      function() {
        console.log("Removed Article: ", removedItemId);
        // Reload the page to get the updated list
        getNews();

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