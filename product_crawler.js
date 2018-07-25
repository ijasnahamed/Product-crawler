var Crawler = require("crawler");
var c = new Crawler();

var ProductCrawler = function(url) {
    this.url = url;
    this.name = "";
};

ProductCrawler.prototype.crawl = function() {
    return new Promise(function(resolve, reject) {
        c.queue([{
            uri: his.url,
            callback: function (error, res, done) {
                if(error) {

                }
                var $ = res.$;
                var title = $("title").text();
                title = title.split(/[^a-zA-Z0-9\s']+/);
                if(title.length > 0) {
                    console.log("page crawling successful. Product name: "+title[0]);
                    callback(null, title[0]);
                } else {
                    callback(new Error('Failed to fetch product name'), null);
                }            
                done();
            }
        }]);
    });
};

var get_name = function(url, callback) {
    console.log("Crawling "+url);
        c.queue([{
            uri: url,
            callback: function (error, res, done) {
                var $ = res.$;
                var title = $("title").text();
                title = title.split(/[^a-zA-Z0-9\s']+/);  
                console.log("success");     
                done();
                if(title.length > 0) {
                    console.log("page crawling successful. Product name: "+title[0]);
                    callback(null, title[0]);
                } else {
                    callback(new Error('Failed to fetch product name'), null);
                }     
            }
        }]);
};

module.exports = {
    get_name: get_name
};