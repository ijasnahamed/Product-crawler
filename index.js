var product_crawler = require('./product_crawler');

var url = 'https://www.flipkart.com/mi-casual-19-l-laptop-backpack/p/itmf4upfnnghex79?pid=BKPF4UPFYMDUNHTG&lid=LSTBKPF4UPFYMDUNHTGYC0RE8&marketplace=FLIPKART&srno=b_1_1&otracker=hp_omu_Fashion%20Accessories_2_Only%20on%20Flipkart_FRUY012J2JIS_0&fm=neo/merchandising&iid=62d31f77-640b-471d-814a-3c1c0d08fa0c.BKPF4UPFYMDUNHTG.SEARCH&ppt=Homepage&ppn=Homepage&ssid=dtu771l5680000001532164309746';
// var url = 'https://www.flipkart.com/mi-travel-18-l-laptop-backpack/p/itmf4upfw6gsaryy?pid=BKPF4UPFUJKWNEJB&lid=LSTBKPF4UPFUJKWNEJB8ZO5L6&marketplace=FLIPKART&srno=b_1_2&otracker=hp_omu_Fashion%20Accessories_2_Only%20on%20Flipkart_FRUY012J2JIS_0&fm=neo/merchandising&iid=ff3a903f-3eb1-4a80-ad9f-67d2a33473db.BKPF4UPFUJKWNEJB.SEARCH&ppt=Homepage&ppn=Homepage&ssid=dtu771l5680000001532164309746';

product_crawler.get_product_name(url, function(err, res) {
	if(err) {
		console.log('Error: '+err);
	} else {

		console.log('product name is '+res);
	}
});