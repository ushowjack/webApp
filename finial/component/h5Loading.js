var H5Loading = function (image) {
	var count = 0;
	for(var i = 0; i < image.length; i++){
		var img = new Image();
		img.onload = function () {
			count ++;
			$(".loading-per").html(parseInt(count/image.length *100)+"%");
			// console.log(parseInt(count/image.length *100)+"%");
			if (count === image.length) {

				this.elem.fullpage({

					onLeave:function (index,nextIndex,direction) {
						$(this).find(".h5_component").trigger('onLeave');
					},
					afterLoad:function (anchorLink,index) {
						$(this).find(".h5_component").trigger('onLoad');
					}
				});	

				// this.elem指的是h5的DOM本身
				this.elem.show();

			}
		};
		img.src = image[i];
	}
}