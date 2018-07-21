var crawl = require('./crawler');

crawl('https://www.flipkart.com/mi-travel-18-l-laptop-backpack/p/itmf4upfw6gsaryy?pid=BKPF4UPFUJKWNEJB&lid=LSTBKPF4UPFUJKWNEJB8ZO5L6&marketplace=FLIPKART&srno=b_1_2&otracker=hp_omu_Fashion%20Accessories_2_Only%20on%20Flipkart_FRUY012J2JIS_0&fm=neo/merchandising&iid=ff3a903f-3eb1-4a80-ad9f-67d2a33473db.BKPF4UPFUJKWNEJB.SEARCH&ppt=Homepage&ppn=Homepage&ssid=dtu771l5680000001532164309746', function(err, res) {
	if(err) {
		console.log('Error: '+err);
	} else {
		console.log(res);
	}
});