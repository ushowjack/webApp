/* 散点图组件对象*/

// 基于H5ComponentBase组件，传入参数，获得一个类名为h5_component_point的
// jQuery对象。最后通过设置Point组件独有的动画和数据显示，然后再把jQuery对象
// 返回到全局作用域中。

var H5ComponentPoint = function (Name,cfg) {

	//创建一个基本图文组件对象，通过cfg对其进行配置
	var component = new H5ComponentBase(Name,cfg);

	// 设置A项为基本参照对象的大小
	var base = cfg.data[0][1];

	// 遍历项目信息，创建圆点
	$.each(cfg.data,function(index, el) {

		// 添加项目名和数据到每个圆点
		var point = $("<div class='point point_"+index+"'></div>");
		var name = $("<div class='point_name'>"+el[0]+"</div>");
		var per = $("<div class='point_per'>"+el[1]*100+"%</div>");
		name.css({
			fontSize: cfg.width*el[1]/5,
			fontWeight: 'bold'
		});
		per.css({
			fontSize: cfg.width*el[1]/10
		});
		name.appendTo(point);
		per.appendTo(point);

		// 设置圆点的样式，这里的样式都是直接添加到行内样式，
		// 不利于之后通过css文件进行修改，添加样式一定要非常注意
		point.css({
			height: (el[1]/base*100) + "%",
			width: (el[1]/base*100) + "%",
			backgroundColor: el[2],
			position: "absolute",

		});

		// 如果存在位置信息，进行对位置信息的储存
		if(el[3] !== undefined && el[4]!== undefined ){
            point.css('left',0).css('top',0);

            //  任务一：暂存left、top到元素上，
            // 将位置信息用属性的方式添加到各个point对象上
            // 这个方法很棒，之后只需要直接对每个point调用就可以了。
            point.data('left',el[3]).data('top',el[4]);
            
        }

        // 设置渐变效果
        point.css('transition','all 1s '+index*.5+'s');
		point.appendTo(component);

	});


	// 下面是对圆点点击事件的绑定，点击会有一个闪烁的效果。特效是通过添加class。
	// 具体看css文件

	// 这里有一个注意点，这里不能直接使用$('.point')
	// 原因是因为这个时候component还没有被创建，也就是说还有被添加到页面中，
	// 而$('.point')是对document的调用，会导致调用不了。
	// 所以这个时候应该对component向下寻找point。
	// 这里我也尝试过用debugger发现，确实调用的point是空的数组。
	component.find('.point').click(function (event) {
		component.find('.point').removeClass("point_focus");
		$(this).addClass('point_focus');

		// 防止事件冒泡行为
		return false;
	}).eq(0).addClass('point_focus');



	// 以下为component添加载入载出的动画效果。
	component.on("onLeave",function () {
		component.find('.point').each(function(index, el) {
			$(el).css({"top":0,"left":0})
		});

		// 防止事件冒泡行为
		return false;
	});
	component.on("onLoad",function () {
		component.find('.point').each(function(index,el){
			// 直接调用自己的data属性获取位置数据。
	        $(el).css('left',$(el).data('left')).css('top',$(el).data('top'));
	      })
		return false;
	}); 

	return component;

}