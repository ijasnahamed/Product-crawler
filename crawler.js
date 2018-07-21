var Crawler = require("crawler");
var c = new Crawler();

var crawl = function(url, callback) {
    c.queue([{
        uri: url,
        callback: function (error, res, done) {
            if(error){
                callback(error, null);
            }else{
                var $ = res.$;

                var resp = $("#is_script").text();
                resp = resp.replace(/window.__INITIAL_STATE__ =/gi, '');
                resp = resp.replace(/;/g, '');
                resp = resp.trim();

                r = JSON.parse(resp);

                callback(null, r['ratingsAndReviews']['ratingsData']);
            }
            done();
        }
    }]);
};

module.exports = crawl;