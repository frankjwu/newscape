
/**
 * Module dependencies.
 */

var OAuth = require('OAuth');

var oauth = new OAuth.OAuth(
  "https://api.twitter.com/oauth/request_token",
  "https://api.twitter.com/oauth/access_token",
  "pLidie6BYfVSE9u8B6Dzg",
  "76eTJNAP9pBZu2UgEWH1ykyItIgKYJZAfjOFu9JNCY",
  "1.0",
  null,
  "HMAC-SHA1"
);

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});

app.get('/about', function(req, res){
  res.render('about', {
    title: 'About'
  });
});

app.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact'
  });
});

app.post('/display', function(req, res){
  var query = req.body.keywords.toString();
  console.log(query);
  data = oauth.get(
    "https://api.twitter.com/1.1/search/tweets.json?q=" + query + "&count=100&result_type=mixed",
    "343035791-6b8GEQKMnu5byFbVvUPX8d6K6KmqM8BqKwEawK7W",
    "gIbEV2yVhbtk7pLHxpDyzLTBZTx1vrU2aqJVIPiMk",
    function (e, data, ref){
      if (e) console.error(e);
      else {
        // var asyncCounter = 1;
        // var complete = function(tweets) {
        //   if (--asyncCounter > 0) {
        //     return;
        //   }
        //   console.log(tweets);
        //   res.render('display', {title: 'Display', data: tweets});
        // }

        // tweets = processData(JSON.parse(data).statuses);
        // function processData(tweets) {
        //   tweets = tweets.sort(function(a, b) {
        //     datea = new Date(a.created_at);
        //     dateb = new Date(b.created_at);
        //     return datea>dateb ? a : b;
        //   });
        //   complete(tweets);
        // }
        // //console.log(tweets);
        res.render('display', {
          title: 'Display',
          json: JSON.stringify(JSON.parse(data).statuses.sort(function(a, b) {
            datea = new Date(a.created_at);
            dateb = new Date(b.created_at);
            return datea > dateb ? a : b;

          var listOfLocations = [];        
          for (i=0;i<tweets.length;i++) {
            loc = tweets[i]['user']['location']; 
            zone = tweets[i]['user']['time_zone'];
          
            function isInArray(value, array) {
              return array.indexOf(value) > -1 ? true: false;
            }

            if (isInArray(loc, listOfLocations) == true) {
              ;
            } 
            else {
              listofLocations.push(loc);
            }
          }  
          console.log(listOfDates);
          }))
        });

      }
    });
});


// app.get('/display', function(req, res){
//   res.render('display', {
//     title: 'Display'
//   });
// });

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
