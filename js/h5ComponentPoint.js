/* 散点图组件对象*/
var H5ComponentPoint = function (Name,cfg) {
	var component = new H5ComponentBase(Name,cfg);

	var base = cfg.data[0][1];

	$.each(cfg.data,function(index, el) {
		var point = $("<div class='point point_"+index+"'></div>");
		var name = $("<div class='point_name'>"+el[0]+"</div>")
		var per = $("<div class='point_per'>"+el[1]*100+"%</div>")
		name.appendTo(point);
		per.appendTo(point);
		point.css({
			height: (el[1]/base*100) + "%",
			width: (el[1]/base*100) + "%",
			backgroundColor: el[2],
			position: "absolute",

		});
		if(el[3] !== undefined && el[4]!== undefined ){
            point.css('left',0).css('top',0);
            //  任务一：暂存left、top到元素上
            point.data('left',el[3]).data('top',el[4]);
            
        }
        point.css('transition','all 1s '+index*.5+'s');
		point.appendTo(component);

	});
	component.find('.point').click(function (event) {
		component.find('.point').removeClass("point_focus");
		$(this).addClass('point_focus');




		return false;
	}).eq(0).addClass('point_focus');

	component.on("onLeave",function () {
		component.find('.point').each(function(index, el) {
			$(el).css({"top":0,"left":0})
		});
		return false;
	});

	component.on("onLoad",function () {
		component.find('.point').each(function(index,el){
	        $(el).css('left',$(el).data('left')).css('top',$(el).data('top'));
	      })
		return false;
	}); 



	return component;

}