
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
    "https://api.twitter.com/1.1/search/tweets.json?q=" + query,
    "343035791-6b8GEQKMnu5byFbVvUPX8d6K6KmqM8BqKwEawK7W",
    "gIbEV2yVhbtk7pLHxpDyzLTBZTx1vrU2aqJVIPiMk",
    function (e, data, res){
      if (e) console.error(e);
      console.log(require('util').inspect(data));
      // jQuery.get('/Users/grub/Desktop/mithackathon/testScript.py', test() {
      // };
    function sortTweets(prop, asc) {
    tweets = tweets.sort(function(a, b) {
        if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
        else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
    });
    showResults();
}

sortTweets('created_at', true);
    });
  res.render('display', {
    title: 'Display'
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
