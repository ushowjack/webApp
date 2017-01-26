/* 柱状图组件对象*/

// 基于H5ComponentBase组件，传入参数，获得一个类名为h5_component_bar的
// jQuery对象。最后通过设置H5ComponentBar组件独有的动画和数据显示，然后再把jQuery对象
// 返回到全局作用域中。

var H5ComponentBar = function (Name,cfg) {

	//创建一个基本图文组件对象，通过cfg对其进行配置
	var component = new H5ComponentBase(Name,cfg);
	var base = 60;
	var color = "#84B0FF";

	$.each(cfg.data,function(index, el) {


		// 创建jquery DOM元素对象
		var line = $("<div class='line'></div>");
		var name = $("<div class='name'></div>");
		name.text(el[0] + ":");
		var rate = $("<div class='rate'></div>");
		rate.css({
			width: el[1]/cfg.data[0][1]*base+"px",
		});
		var bg = $("<div class='bg'></div>");
		bg.css("backgroundColor", el[2] || color);
		var per = $("<div class='per'></div>");
		per.text(el[1]*100 + "%");
		per.css("color",el[2] || '#84B0FF' );







		line.append(name).append(rate).append(per);
		rate.append(bg);
		component.append(line);
	});

	return component;

}