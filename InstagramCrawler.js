var rp = require('request-promise');

const BASE_URL = 'https://www.instagram.com';
const HASH_TAG_LIST_PATH = '/web/search/topsearch/';
// const HASH_TAG_DETAILS_PATH = '/explore/tags/oneplus3t/?__a=1';
const HASH_TAG_DETAILS_PATH = '/explore/tags/';

var getHashTagList = function(query_arr, resolve, reject) {
	var query = query_arr.join('').trim();
	var options = {
	    uri: BASE_URL + HASH_TAG_LIST_PATH,
	    qs: {
	        query: query
	    },
	    headers: {
	        'User-Agent': 'Request-Promise',
	    },
	    json: true
	};

	console.log('Getting hash tag list for //'+query+'//');

	rp(options)
    .then(function (result) {
    	if(result.status != undefined && result.hashtags != undefined && result.status == 'ok' && result.hashtags.length > 0) {
    		resolve({
    			query_arr: query_arr,
    			url: BASE_URL + HASH_TAG_DETAILS_PATH + result.hashtags[0].hashtag.name + '/'
    		});
    	} else {
    		query_arr.pop();
    		if(query_arr.length > 0)
    			getHashTagList(query_arr, resolve, reject);
    		else
    			reject(new Error('Unable to find hash tag urls'));
    	}
    })
    .catch(function (err) {
        reject(err);
    });
}

var InstagramCrawler = function() {};

InstagramCrawler.prototype.getHashTagUrl = async function(query_arr) {
	return new Promise((resolve, reject) => {
		getHashTagList(query_arr, resolve, reject);
	});
};

module.exports = InstagramCrawler;