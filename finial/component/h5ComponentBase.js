/* 图文组件对象*/

// 以下其实就是一个模块化的过程，将所有的变量封装在一个函数中，通过传递参数，在模块内部实现
// 创建好一个jQuery对象，然后将对象返回到全局词法作用域里。


// 这是基本的图文组件，具有接受参数cfg，创建对应的div块，然后根据cfg添加各种属性和类名。
var H5ComponentBase = function (Name,cfg) {

	// 判断是否传入参数cfg
	var cfg = cfg || {};
	// 创建对应类型的类名，并创建component的div
	var cls ='h5_component_' + cfg.type;
	var component = $("<div class='h5_component_" + Name + " h5_component "+cls+" '></div>");


	// 对component设置样式的属性，在这里对所有的长宽都缩小一半
	cfg.width && component.width(cfg.width/2);
	cfg.height && component.height(cfg.height/2);
	cfg.text  && component.text(cfg.text);
	cfg.css && component.css(cfg.css); 
	cfg.bg && component.css("backgroundImage"," url("+cfg.bg+")");
	cfg.onclick && component.on('click', cfg.onclick);
	if (cfg.center === true) {
		component.css({
			left: "50%",
			marginLeft: (-1 * cfg.width/4) + "px",
		});
	}

	// 对component绑定时间，给组件添加类
	component.on("onLeave",function () {
		setTimeout(function () {
			component.addClass(cls + '_leave').removeClass(cls + '_load');
			cfg.animateOut && component.animate(cfg.animateOut);
		}, cfg.delay || 0);
		
		return false;
	});
	component.on("onLoad",function () {
		setTimeout(function () {
			component.addClass(cls + '_load').removeClass(cls + '_leave');
			cfg.animateIn && component.animate(cfg.animateIn);
		}, cfg.delay || 0);
		return false;
	}); 

	// 返回组件
	return component;

}