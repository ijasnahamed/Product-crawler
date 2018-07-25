var rp = require('request-promise');

const BASE_URL = 'https://www.instagram.com';
const HASH_TAG_LIST_PATH = '/web/search/topsearch/';
const HASH_TAG_DETAILS_PATH = '/explore/tags/';

var getHashTagList = function(query_arr, resolve, reject) {
	var query = query_arr.join('').trim().toLowerCase();;
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

	console.log('Getting hash tag list for \''+query+'\'');

	rp(options)
    .then(function (result) {

    	if(result.status != undefined && result.hashtags != undefined && result.status == 'ok' && result.hashtags.length > 0) {

            var res = {
                query_arr: query_arr,
                hash_tag: result.hashtags[0].hashtag.name
            };

            for(var index = 0; index < result.hashtags.length; index++) {
                if(result.hashtags[index].hashtag.name == query) {
                    res.hash_tag = result.hashtags[index].hashtag.name;
                    break;
                }
            }

    		resolve(res);

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
};

var getImagesFromHashTag = function(hashtag, resolve, reject) {
    var options = {
        uri: BASE_URL + HASH_TAG_DETAILS_PATH + hashtag + '/',
        qs: {
            __a: 1
        },
        headers: {
            'User-Agent': 'Request-Promise',
        },
        json: true
    };

    console.log('Getting images for hash tag #'+hashtag);

    rp(options)
    .then(function (result) {

        if(result.graphql != undefined && result.graphql.hashtag != undefined
         && result.graphql.hashtag.edge_hashtag_to_top_posts != undefined && result.graphql.hashtag.edge_hashtag_to_top_posts.edges != undefined
          && result.graphql.hashtag.edge_hashtag_to_top_posts.edges.length > 0) {

            var images = [];

            for (var index = 0; index < result.graphql.hashtag.edge_hashtag_to_top_posts.edges.length; index++) {

                if(result.graphql.hashtag.edge_hashtag_to_top_posts.edges[index].node != undefined
                    && result.graphql.hashtag.edge_hashtag_to_top_posts.edges[index].node.display_url != undefined)
                    images.push(result.graphql.hashtag.edge_hashtag_to_top_posts.edges[index].node.display_url);

            }

            resolve(images);

        } else {
            reject(new Error('Unable to find any images'));
        }
    })
    .catch(function (err) {
        reject(err);
    });
};

var InstagramCrawler = function() {};

InstagramCrawler.prototype.getHashTagUrl = async function(query_arr) {
	return new Promise((resolve, reject) => {
		getHashTagList(query_arr, resolve, reject);
	});
};

InstagramCrawler.prototype.getImagesFromHashTag = async function(hashtag) {
    return new Promise((resolve, reject) => {
        getImagesFromHashTag(hashtag, resolve, reject);
    });
}

module.exports = InstagramCrawler;