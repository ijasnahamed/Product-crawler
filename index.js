var ProductCrawler = require('./ProductCrawler');
var InstagramCrawler = require('./InstagramCrawler');

// var url = 'https://www.flipkart.com/honor-9-lite-glacier-grey-64-gb/p/itmff5zgdeckztpk?pid=MOBFF5ZGFJB78ZDB&srno=b_1_1&otracker=hp_omu_High%20RAM%20Phones_1_4%20GB%20RAM%20%7C%2064%20GB%20ROM_C8VFVTF713_1&lid=LSTMOBFF5ZGFJB78ZDBNRNHII&fm=neo/merchandising&iid=34171d83-e4d8-4075-8adc-057bcb15b6b9.MOBFF5ZGFJB78ZDB.SEARCH&ppt=Homepage&ppn=Homepage&ssid=qnjwtggbgg0000001532520791968';
var url = 'https://www.flipkart.com/mi-casual-19-l-laptop-backpack/p/itmf4upfnnghex79?pid=BKPF4UPFYMDUNHTG&lid=LSTBKPF4UPFYMDUNHTGYC0RE8&marketplace=FLIPKART&srno=b_1_1&otracker=hp_omu_Fashion%20Accessories_2_Only%20on%20Flipkart_FRUY012J2JIS_0&fm=neo/merchandising&iid=62d31f77-640b-471d-814a-3c1c0d08fa0c.BKPF4UPFYMDUNHTG.SEARCH&ppt=Homepage&ppn=Homepage&ssid=dtu771l5680000001532164309746';
// var url = 'https://www.flipkart.com/mi-travel-18-l-laptop-backpack/p/itmf4upfw6gsaryy?pid=BKPF4UPFUJKWNEJB&lid=LSTBKPF4UPFUJKWNEJB8ZO5L6&marketplace=FLIPKART&srno=b_1_2&otracker=hp_omu_Fashion%20Accessories_2_Only%20on%20Flipkart_FRUY012J2JIS_0&fm=neo/merchandising&iid=ff3a903f-3eb1-4a80-ad9f-67d2a33473db.BKPF4UPFUJKWNEJB.SEARCH&ppt=Homepage&ppn=Homepage&ssid=dtu771l5680000001532164309746';

function main() {
	var productCrawler = new ProductCrawler(url);

	productCrawler.crawl()
	.then(() => {
		var name = productCrawler.getName();
		console.log('\nproduct name: '+name);

		PopulateProductImages(name);
	})
	.catch((err) => {
		console.log("\nError: "+err.message);
	});
}

function PopulateProductImages(product_name) {
	var instagram = new InstagramCrawler();

	instagram.getHashTagUrl(product_name.split(/[\s]+/))
	.then((result) => {
		console.log('\nHash Tag list found for '+result.query_arr.join(' '));
		console.log('Hashtag is #'+result.hash_tag);

		instagram.getImagesFromHashTag(result.hash_tag)
		.then((images) => {
			if(images.length > 0) {
				console.log('\nImages for '+ result.hash_tag);
				console.log(images);
			} else {
				console.log("\nNo images found from instagram for product specified")
			}
		})
		.catch((err) => {
			console.log("Error: "+err.message);
		});

	})
	.catch((err) => {
		console.log("Error: "+err.message);
	});
}

main();