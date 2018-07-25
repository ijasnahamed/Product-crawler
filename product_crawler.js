var Crawler = require("crawler");
var c = new Crawler();

var get_product_name = function(url, callback) {
    console.log("Crawling "+url);
    c.queue([{
        uri: url,
        callback: function (error, res, done) {
            var $ = res.$;
            var title = $("title").text();
            title = title.split(/[^a-zA-Z0-9\s']+/);
            if(title.length > 0) {
                console.log("page crawling successful. Product name: "+title[0]);
                callback(null, title[0]);
            } else {
                callback('Failed to fetch product name', null);
            }            
            done();
        }
    }]);
};

module.exports = {
    get_product_name: get_product_name
};