var ProductCrawler = require('./ProductCrawler');
var InstagramCrawler = require('./InstagramCrawler');

var url = 'https://www.flipkart.com/honor-9-lite-glacier-grey-64-gb/p/itmff5zgdeckztpk?pid=MOBFF5ZGFJB78ZDB&srno=b_1_1&otracker=hp_omu_High%20RAM%20Phones_1_4%20GB%20RAM%20%7C%2064%20GB%20ROM_C8VFVTF713_1&lid=LSTMOBFF5ZGFJB78ZDBNRNHII&fm=neo/merchandising&iid=34171d83-e4d8-4075-8adc-057bcb15b6b9.MOBFF5ZGFJB78ZDB.SEARCH&ppt=Homepage&ppn=Homepage&ssid=qnjwtggbgg0000001532520791968';
// var url = 'https://www.flipkart.com/mi-casual-19-l-laptop-backpack/p/itmf4upfnnghex79?pid=BKPF4UPFYMDUNHTG&lid=LSTBKPF4UPFYMDUNHTGYC0RE8&marketplace=FLIPKART&srno=b_1_1&otracker=hp_omu_Fashion%20Accessories_2_Only%20on%20Flipkart_FRUY012J2JIS_0&fm=neo/merchandising&iid=62d31f77-640b-471d-814a-3c1c0d08fa0c.BKPF4UPFYMDUNHTG.SEARCH&ppt=Homepage&ppn=Homepage&ssid=dtu771l5680000001532164309746';

function main() {
	var productCrawler = new ProductCrawler(url);
	var instagram = new InstagramCrawler();

	productCrawler.crawl() // crawls the product page
	.then(() => {
		// gets product name and initiate to get nearest hashtag in instagram
		return instagram.getHashTagUrl(productCrawler.getName().split(/[\s]+/));
	})
	.then((hash_tag_result) => {
		// gets nearest hashtag. started to fetch images and videos
		console.log('\nHash Tag list found for '+hash_tag_result.query_arr.join(' '));
		console.log('Hashtag is #'+hash_tag_result.hash_tag);

		return instagram.getImagesAndVideosFromHashTag(hash_tag_result.hash_tag);
	})
	.then((images_and_video_list) => {
		// gets images and videos for hashtag from instagram
		if(images_and_video_list.images != undefined && images_and_video_list.images.length > 0) {
			console.log('\nImages for '+ images_and_video_list.hashtag);
			console.log(images_and_video_list.images);

			console.log('\nVideos for '+ images_and_video_list.hashtag);
			console.log(images_and_video_list.videos);
		} else {
			console.log("\nNo images found from instagram for product specified")
		}
	})
	.catch((err) => {
		console.log("\nError: "+err.message);
	});
}

main();