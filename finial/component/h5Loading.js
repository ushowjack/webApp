var H5Loading = function (image) {
	var count = 0;
	for(var i = 0; i < image.length; i++){
		var img = new Image();
		img.onload = function () {
			count ++;
			$(".loading-per").html(parseInt(count/image.length *100)+"%");
			console.log(parseInt(count/image.length *100)+"%");
		};
		img.src = image[i];
	}
}