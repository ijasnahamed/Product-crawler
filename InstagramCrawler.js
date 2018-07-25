var rp = require('request-promise');

const BASE_URL = 'https://www.instagram.com';
const HASH_TAG_LIST_PATH = '/web/search/topsearch/';
const HASH_TAG_DETAILS_PATH = '/explore/tags/';
const HASH_TAG_VIDEO_PATH = '/p/';

/*
*   Returns the nearest possible instagram hashtag
*   Param: array of each word
*/
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

	console.log('Checking for  #'+query);

	rp(options)
    .then(function (result) {

    	if(result.status != undefined && result.hashtags != undefined && result.status == 'ok' && result.hashtags.length > 0) { // checking if hashtag exists

            var res = {
                query_arr: query_arr,
                hash_tag: result.hashtags[0].hashtag.name
            };

            /*
            *   Instagram return hashtag list with descreasing followers. We need to get the appropriate hashtag.
            *   If not found. First hashtag will be taken.
            */
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

/*
*   Get Images and video shortcodes for hashtags
*/
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

    console.log('Getting images for #'+hashtag);

    rp(options)
    .then(function (result) {

        if(result.graphql != undefined && result.graphql.hashtag != undefined
         && result.graphql.hashtag.edge_hashtag_to_top_posts != undefined && result.graphql.hashtag.edge_hashtag_to_top_posts.edges != undefined
          && result.graphql.hashtag.edge_hashtag_to_top_posts.edges.length > 0) { // checking if images exists

            var images = [];
            var video_shortcodes = [];

            for (var index = 0; index < result.graphql.hashtag.edge_hashtag_to_top_posts.edges.length; index++) {

                if(result.graphql.hashtag.edge_hashtag_to_top_posts.edges[index].node != undefined) {
                    if(result.graphql.hashtag.edge_hashtag_to_top_posts.edges[index].node.is_video != undefined
                        && result.graphql.hashtag.edge_hashtag_to_top_posts.edges[index].node.is_video) { // this node has video. We will store video shortcode for grabing video url later

                        video_shortcodes.push(result.graphql.hashtag.edge_hashtag_to_top_posts.edges[index].node.shortcode);

                    } else if(result.graphql.hashtag.edge_hashtag_to_top_posts.edges[index].node.display_url != undefined) {

                        images.push(result.graphql.hashtag.edge_hashtag_to_top_posts.edges[index].node.display_url);

                    }
                }                    

            }

            if(video_shortcodes.length <= 0)
                resolve({
                    hashtag: hashtag,
                    images: images,
                    videos:[]
                 });
            else{
                // getting video url for fetched video shortcodes.
                getVideoFromShortCode(video_shortcodes, {
                    hashtag: hashtag,
                    images: images,
                    videos:[]
                 }, resolve);
            }

        } else {
            reject(new Error('Unable to find any images'));
        }
    })
    .catch(function (err) {
        reject(err);
    });
};

/*
*   Fetch video url for video shortcodes
*/
var getVideoFromShortCode = function(video_shortcodes, result, resolve) {
    var shortcode = video_shortcodes.pop();
    var options = {
        uri: BASE_URL + HASH_TAG_VIDEO_PATH + shortcode + '/',
        qs: {
            __a: 1
        },
        headers: {
            'User-Agent': 'Request-Promise',
        },
        json: true
    };

    rp(options)
    .then(function (video_result) {

        if(video_result.graphql != undefined && video_result.graphql.shortcode_media != undefined
         && video_result.graphql.shortcode_media.video_url != undefined) { // check for video url

            result.videos.push(video_result.graphql.shortcode_media.video_url);

        }

        if(video_shortcodes.length > 0) {
            getVideoFromShortCode(video_shortcodes, result, resolve);
        } else {
            resolve(result);
        }
    })
    .catch(function (err) {
        if(video_shortcodes.length > 0) {
            getVideoFromShortCode(video_shortcodes, result, resolve);
        } else {
            resolve(result);
        }
    });
};

var InstagramCrawler = function() {};

/*
*   Get nearest possible hashtag
*/
InstagramCrawler.prototype.getHashTagUrl = async function(query_arr) {
	return new Promise((resolve, reject) => {
		getHashTagList(query_arr, resolve, reject);
	});
};

/*
*   Get images and videos for hashtag
*/
InstagramCrawler.prototype.getImagesAndVideosFromHashTag = async function(hashtag) {
    return new Promise((resolve, reject) => {
        getImagesFromHashTag(hashtag, resolve, reject);
    });
}

module.exports = InstagramCrawler;