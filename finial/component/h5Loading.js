var H5Loading = function (image) {
	var loaded = 0;
	// console.log(image);

	for(var i = 0; i < image.length; i++){
		var img = new Image();
		// debugger;
		img.onload = function () {
			loaded ++;
			$(".loading-per").html(parseInt(loaded/image.length *100)+"%");
			// console.log(parseInt(count/image.length *100)+"%");
			// debugger;
			if (loaded === image.length) {
				setTimeout(function () {
					$(".h5").fullpage({

						onLeave:function (index,nextIndex,direction) {
							$(this).find(".h5_component").trigger('onLeave');
						},
						afterLoad:function (anchorLink,index) {
							$(this).find(".h5_component").trigger('onLoad');
						}
					});	
					$(".h5").show();

				}, 2000);			
			}

		};
		img.src = image[i];
	}
}