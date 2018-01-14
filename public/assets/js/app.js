// Wait for DOM to load.
$(function() {

  //**********************
  //Home page
  //**********************
  if ($(".card").find("#techCrunchCollapse").length) {
    scrapeAllSites();
  }

  $(".scrape-new").on("click", function(event) {

    scrapeAllSites();
  });

  $(document).on("click", ".save", saveNewsItem);

  //**********************
  //Saved page
  //**********************
  if ($(".card").find("#savedNews").length) {
    getNews();
  }

  $(document).on("click", ".remove-article", removeItem);
  $(document).on("click", ".add-note", showArticleNotes);
  $(document).on("click", "#save-note", addArticleNote);
  $(document).on("click", ".note-delete", removeArticleNote);



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
      notes: []
    };

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
        "<button class='btn btn-success add-note' data-id='" + newsItem._id +
        "'  data-toggle='modal' data-target='#articleNotes'>Notes</button></div></div></div>");
    });
  }

  function removeItem() {

    var removedItemId = $(this).data("id");

    // Send the PUT request.
    $.ajax("/removeSaved", {
      type: "PUT",
      data: { id: removedItemId }
    }).then(
      function() {
        // Reload the page to get the updated list
        getNews();

      });

  }

  function showArticleNotes() {

    $("#save-note").data("id", $(this).data("id"));

    // This function handles opending the notes modal and displaying our notes
    // We grab the id of the article to get notes for from the panel element the delete button sits inside
    var currentArticle_id = $(this).data("id");
    // Grab any notes with this headline/article id
    $.ajax("NewsItem/viewNotes/" + currentArticle_id, {
      type: "GET",
    }).then(
      function(notesArr) {
        var notesContainer = $(".article-notes-container");

        notesContainer.empty()

        notesArr.forEach(function(newsItem) {
          notesContainer.append("<li class='list-group-item note'>" +
            "<div class='note-text'>" + newsItem + "</div>" +
            "<button class='btn btn-danger note-delete float-right' data-dismiss='modal'>x</button>" +
            "</li>");
        });

      });
  }
});


function addArticleNote() {

  var newNote = $(".modal-body textarea").val().trim();
  $(".modal-body textarea").val("");

  //if text was included then add note to saved news item
  if (newNote) {

    $.ajax("/NewsItem/addNote", {
      type: "PUT",
      data: {
        note: newNote,
        id: $("#save-note").data("id")
      }
    }).fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
      });;
  }

}

function removeArticleNote() {

  $(".modal-body textarea").val("");

  var removeNoteText = $(this).prev().text();

  if (removeNoteText) {

    $.ajax("/NewsItem/removeNote", {
      type: "PUT",
      data: {
        note: removeNoteText,
        id: $("#save-note").data("id")
      }
    }).fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
      });
  }

}