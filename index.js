var crawl = require('./crawler');

var url = 'https://www.flipkart.com/mi-casual-19-l-laptop-backpack/p/itmf4upfnnghex79?pid=BKPF4UPFYMDUNHTG&lid=LSTBKPF4UPFYMDUNHTGYC0RE8&marketplace=FLIPKART&srno=b_1_1&otracker=hp_omu_Fashion%20Accessories_2_Only%20on%20Flipkart_FRUY012J2JIS_0&fm=neo/merchandising&iid=62d31f77-640b-471d-814a-3c1c0d08fa0c.BKPF4UPFYMDUNHTG.SEARCH&ppt=Homepage&ppn=Homepage&ssid=dtu771l5680000001532164309746';
// var url = 'https://www.flipkart.com/mi-travel-18-l-laptop-backpack/p/itmf4upfw6gsaryy?pid=BKPF4UPFUJKWNEJB&lid=LSTBKPF4UPFUJKWNEJB8ZO5L6&marketplace=FLIPKART&srno=b_1_2&otracker=hp_omu_Fashion%20Accessories_2_Only%20on%20Flipkart_FRUY012J2JIS_0&fm=neo/merchandising&iid=ff3a903f-3eb1-4a80-ad9f-67d2a33473db.BKPF4UPFUJKWNEJB.SEARCH&ppt=Homepage&ppn=Homepage&ssid=dtu771l5680000001532164309746';

crawl(url, function(err, res) {
	if(err) {
		console.log('Error: '+err);
	} else {

		if(res.totalRatingsCount != undefined && res.totalRatingsCount > 0) {
			var rate_1 = rate_2 = rate_3 = rate_4 = rate_5 = 0;
			var total_ratings = res.totalRatingsCount;
			if(res.breakup != undefined) {
				rate_5 = res.breakup[4] != undefined?res.breakup[4]:rate_5;
				rate_4 = res.breakup[3] != undefined?res.breakup[3]:rate_4;
				rate_3 = res.breakup[2] != undefined?res.breakup[2]:rate_3;
				rate_2 = res.breakup[1] != undefined?res.breakup[1]:rate_2;
				rate_1 = res.breakup[0] != undefined?res.breakup[0]:rate_1;
			}

			var positive_rating = ((rate_5 + rate_4)/total_ratings) * 100;
			var negative_rating = ((rate_2 + rate_1)/total_ratings) * 100;
			var avg_rating = (rate_3/total_ratings) * 100;

			if(positive_rating > 50 && total_ratings > 5)
				console.log('Chance to buy product is high because of high positive rating');

			// like above, we can add more conditions here
		}
	}
});