/* 柱状图组件对象*/

// 基于H5ComponentBase组件，传入参数，获得一个类名为h5_component_bar的
// jQuery对象。最后通过设置H5ComponentBar组件独有的动画和数据显示，然后再把jQuery对象
// 返回到全局作用域中。

var H5ComponentBar = function (Name,cfg) {

	//创建一个基本图文组件对象，通过cfg对其进行配置
	var component = new H5ComponentBase(Name,cfg);


	return component;

}