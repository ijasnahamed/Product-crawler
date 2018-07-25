var Crawler = require("crawler");
var c = new Crawler();

var ProductCrawler = function(url) {
    this.url = url;
    this.name = "";
};

ProductCrawler.prototype.crawl = async function() {
    var _parent = this;
    console.log("crawling "+_parent.url);

    return new Promise((resolve, reject) => {
        c.queue([{
            uri: _parent.url,
            callback: function (error, res, done) {
                done();

                if(error) {
                    reject(error);
                    return;
                }

                var $ = res.$;
                var title = $("title").text();
                title = title.split(/[^a-zA-Z0-9\s']+/);
                if(title.length > 0) {
                    console.log("page crawling successful. Product name: "+title[0]);
                    _parent.name = title[0];
                    resolve(title[0]);
                } else {
                    reject(new Error('Failed to fetch product name'));
                }
            }
        }]);
    });
};

ProductCrawler.prototype.getName = function() {
    return this.name;
}

module.exports = ProductCrawler;