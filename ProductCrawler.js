var Crawler = require("crawler");
var c = new Crawler();

/*
*   Constructer;
*   params: flipkart url of product
*/
var ProductCrawler = function(url) {
    this.url = url;
    this.name = "";
};

/*
*   Method will crawl class variable url and return page title
*/
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
                title = title.split(/[^a-zA-Z0-9\s']+/); // splits title string based on non-alphanumeric and non-space
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

/*
*   Return the product name.
*   Will be returning null if crawl is not called before this method invokation
*/
ProductCrawler.prototype.getName = function() {
    return this.name;
}

module.exports = ProductCrawler;