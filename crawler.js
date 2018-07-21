var Crawler = require("crawler");
// var cheerio = require('cheerio');
 
// var c = new Crawler({
//     maxConnections : 10,
//     // This will be called for each crawled page
//     callback : function (error, res, done) {
//         if(error){
//             console.log(error);
//         }else{
//             // console.log(res.body);
//             // var $ = res.$;
//             // // console.log($(".review-rating").body());
//             // var resp = $("#is_script").text();
//             // resp = resp.replace(/window.__INITIAL_STATE__ =/gi, '');
//             // resp = resp.replace(/;/g, '');
//             // resp = resp.trim();
//             // // console.log(resp.abExperiments);
//             // r = JSON.parse(resp);
//             // console.log(r['ratingsAndReviews']['ratingsData']);
//             // // console.log(r.productPage.productDetails.product_seller_detail_1.data[0].value.metadata.price);
//             // console.log(r.productPage.productDetails);
//             // console.log(resp.abExperiments);
//             // $("").each(function(i, obj) {
//             //     console.log("here");
//             //     console.log(obj);
//             // });

//             // var $ = cheerio.load(res.body);
//             // // console.log($('i.review-rating').text());
//             // $('.review-rating').each(function(i, obj) {
//             //     console.log("here");
//             //     console.log(obj);
//             // });
//         }
//         done();
//     }
// });

var c = new Crawler();

// c.queue('https://www.flipkart.com/mi-travel-18-l-laptop-backpack/p/itmf4upfw6gsaryy?pid=BKPF4UPFUJKWNEJB&lid=LSTBKPF4UPFUJKWNEJB8ZO5L6&marketplace=FLIPKART&srno=b_1_2&otracker=hp_omu_Fashion%20Accessories_2_Only%20on%20Flipkart_FRUY012J2JIS_0&fm=neo/merchandising&iid=ff3a903f-3eb1-4a80-ad9f-67d2a33473db.BKPF4UPFUJKWNEJB.SEARCH&ppt=Homepage&ppn=Homepage&ssid=dtu771l5680000001532164309746');

var crawl = function(url, callback) {
    c.queue([{
        uri: url,
        // jQuery: false,
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