/* 雷达图组件对象*/

// 基于H5ComponentBase组件，传入参数，获得一个类名为h5_component_polyline的
// jQuery对象。最后通过设置Radar组件独有的动画和数据显示，然后再把jQuery对象
// 返回到全局作用域中。

var H5ComponentRadar = function (Name,cfg) {

	//创建一个基本图文组件对象，通过cfg对其进行配置
	var component = new H5ComponentBase(Name,cfg);

	//绘制网格线

	var num = cfg.data.length;
	var w = cfg.width;
	var h = cfg.height;


	var step = num + 1;

	//	新建一个图层否则在清理ctx时会将网格也清除
	var cns = $("<canvas id='canvas'></canvas>").get(0);
	cns.width = cfg.width;
	cns.height = cfg.height;
	var ctx = cns.getContext("2d");
	$(cns).appendTo(component);
	
	
	
	

	//返回H5ComponentPolyline对象到全局变量中
	return component;

}