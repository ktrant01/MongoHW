// // Using this template, the cheerio documentation,
// // and what you've learned in class so far, scrape a website
// // of your choice, save information from the page in a result array, and log it to the console.

// var cheerio = require("cheerio");
// var request = require("request");

// // Make a request call to grab the HTML body from the site of your choice
// request("https://slashdot.org/", function(error, response, html) {

//   // Load the HTML into cheerio and save it to a variable
//   // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
//   var $ = cheerio.load(html);

//   // console.log($("h2.story"))

//   // An empty array to save the data that we'll scrape
//   var results = [];

//   // Select each element in the HTML body from which you want information.
//   // NOTE: Cheerio selectors function similarly to jQuery's selectors,
//   // but be sure to visit the package's npm page to see how it works
//   $("h2.story").each(function(i, element) {

//     var link = $(element).children().attr("href");
//     var title = $(element).children().text();

//     // Save these results in an object that we'll push into the results array we defined earlier
//     results.push({
//       title: title,
//       link: link
//     });
//   });

//   // Log the results once you've looped through each of the elements found with cheerio
//   console.log(results);
// });








// ------------


// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

//you need this to be able to process information sent to a POST route
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// Serve static content for the app from the "public" directory in the application directory.
// you need this line here so you don't have to create a route for every single file in the public folder (css, js, image, etc)
//index.html in the public folder will over ride the root route
app.use(express.static("public"));

// Main route (simple Hello World Message)
// app.get("/", function(req, res) {
//   res.send("Hello world");
// });

// Retrieve data from the db
app.get("/all", function(req, res) {


  // Find all results from the scrapedData collection in the db
  db.scrapedData.find({}, function(error, found) {
    // Throw any errors to the console
    if (error) {
      console.log(error);
    }
    // If there are no errors, send the data to the browser as json
    else {
      res.json(found);
    }
  });
});



/*
  cheerio takes the html from the request and let's you use jQuery like syntax to access particular text inside of it
*/

      // if there were two links inside, there aren't but if there were, and you want the second link then you would do this
      // var title = $(element).children("a").eq(1).text();

      
// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function(req, res) {
  // Make a request for the news section of `ycombinator`
  request("https://slashdot.org", function(error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // For each element with a "title" class
    $("article.fhitem-story").each(function(i, element) {

      // var link = $(element).children().attr("href");
      var title = $(element).find('.story-title').text().replace(/\//g," ")
      var content= $(element).find('div.p').text().trim().replace(/\//g," ")

      // If this found element had both a title and a link
      if (title && content) {
        // Insert the data in the scrapedData db
        db.scrapedData.insert({
          title: title,
          content: content
        },
        function(err, inserted) {
          if (err) {
            // Log the error if one is encountered during the query
            console.log(err);
          }
          else {
            // Otherwise, log the inserted data
            console.log(inserted);
          }
        });
      }
    });
  });

  // Send a "Scrape Complete" message to the browser
  res.send("Scrape Complete");
});


// Delete data from the db
// app.post("/delete", function(req, res) {  
// var id = ObjectID(req.body.id);
// var collection = db.scrapedData;

// collection.deleteOne({ "_id" : ObjectId("5baac35970684407326592a7")}, function (err, results) {

//   if (err){console.log(err)}
// } );

//   res.redirect('/'); 
//   // Find all results from the scrapedData collection in the db

// });

// Delete One from the DB
app.post("/delete", function(req, res) {
  // Remove a note using the objectID
  db.scrapedData.remove(
    {
      _id: mongojs.ObjectID(req.body.id)
    },
    function(error, removed) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(removed);
        res.redirect('/'); 
      }
    }
  );
});

app.post("/addComment", function(req, res) {
  // var ObjectId = require('mongodb').ObjectID;

  // Remove a note using the objectID
  db.scrapedData.updateOne(
    { "_id" : mongojs.ObjectId(req.body.id) },{ $set: { "comments" : req.body.comment } },


    function(error, removed) {
      // Log any errors from mongojs
      if (error) {
        console.log(error);
        res.send(error);
      }
      else {
        // Otherwise, send the mongojs response to the browser
        // This will fire off the success function of the ajax request
        console.log(removed);
        res.redirect('/'); 
      }
    }
  );
});


// router.delete('/api/menu/delete/:id', function (req, res) {
//   var id = req.params.id;
//   var collection = db.get().collection('menu');

//   collection.deleteOne({ _id: new mongo.ObjectId(id) }, function (err, results) {
//   });

//   res.json({ success: id })
// });




// Listen on port 3000
app.listen(3000, function() {
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
  console.log("App running on port 3000!");
});
