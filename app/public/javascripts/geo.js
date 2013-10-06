var request = require('request');
var cheerio = require('cheerio');


var url = 'http://itouchmap.com/latlong.html';
request(url, function(err, resp, body) {
    if (err)
        throw err;
    $ = cheerio.load(body);
    // TODO: scraping goes here!
    $("input[name='address']").val("Buenos Aires");
    //$("input[name='address']")[1].onclick;
    $("input").submit;
    var lat = $("#latbox").text();
    console.log(lat);
});